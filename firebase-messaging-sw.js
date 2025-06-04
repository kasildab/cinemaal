// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCjZv1YDGIb3DCXWQO231OfPMJTNKrjzKo",
  authDomain: "cinema-al.firebaseapp.com",
  projectId: "cinema-al",
  storageBucket: "cinema-al.appspot.com",
  messagingSenderId: "1032816680533",
  appId: "1:1032816680533:web:8276b33e95570691d93edc",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'Cinema AL';
  const notificationOptions = {
    body: payload.notification?.body || 'New content available!',
    icon: 'https://cdn1.iconfinder.com/data/icons/music-media-2/512/614731-cinema-512.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
