const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
});

exports.onNotificationSettingsChange = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    
    if (newData.notifications?.email && 
        (!previousData.notifications?.email || 
         newData.notifications.email !== previousData.notifications.email)) {
      
      const mailOptions = {
        from: 'CinemaAL <noreply@cinemaal.com>',
        to: newData.email || context.params.userId,
        subject: 'Email Notifications Enabled',
        text: `You've successfully enabled email notifications for your CinemaAL account.`,
        html: `<p>You've successfully enabled email notifications for your CinemaAL account.</p>`
      };

      await transporter.sendMail(mailOptions);
    }
    
    return null;
  });

exports.sendNotificationEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Not authenticated');
  }

  const userId = context.auth.uid;
  const userDoc = await admin.firestore().doc(`users/${userId}`).get();
  const userData = userDoc.data();

  if (!userData.notifications?.email) {
    return { success: false, message: 'Email notifications not enabled' };
  }

  const mailOptions = {
    from: 'CinemaAL <noreply@cinemaal.com>',
    to: userData.email,
    subject: data.subject || 'Notification from CinemaAL',
    text: data.text || '',
    html: data.html || ''
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send email');
  }
});


exports.notifyUsersOnNewMovie = functions.firestore
  .document('movies/{movieId}')
  .onCreate(async (snap, context) => {
    const movie = snap.data();

    // Get all users who have enabled email notifications
    const usersSnapshot = await admin.firestore().collection('users').get();
    const notifyUsers = usersSnapshot.docs.filter(doc => {
      const data = doc.data();
      return data.notifications?.email && data.email;
    });

    const emailPromises = notifyUsers.map(userDoc => {
      const user = userDoc.data();

      const mailOptions = {
        from: 'CinemaAL <noreply@cinemaal.com>',
        to: user.email,
        subject: `🎬 New Movie on CinemaAL: ${movie.title}`,
        html: `
          <h3>Hello ${user.username || ''} 👋</h3>
          <p>A new movie <strong>${movie.title}</strong> has just been added to <strong>Cinema AL</strong>!</p>
          <p><a href="https://cinemaal.web.app/movies.html" style="color: #f43f5e;">Watch it now 🍿</a></p>
        `
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    return null;
  });
