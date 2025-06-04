function scrollTrending(direction) {
  const row = document.getElementById('trendingRow');
  const scrollAmount = 300; // Adjust this value as needed
  
  if (direction === -1) {
      row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// Optional: Add touch event listeners for better mobile experience
document.addEventListener('DOMContentLoaded', function() {
  const trendingRow = document.getElementById('trendingRow');
  let touchStartX = 0;
  let touchEndX = 0;
  
  trendingRow.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  trendingRow.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  }, false);
  
  function handleSwipe() {
      if (touchEndX < touchStartX) {
          // Swiped left
          trendingRow.scrollBy({ left: 200, behavior: 'smooth' });
      }
      if (touchEndX > touchStartX) {
          // Swiped right
          trendingRow.scrollBy({ left: -200, behavior: 'smooth' });
      }
  }
});
  
// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  // Toggle between hamburger and close icon
  const icon = mobileMenuToggle.querySelector('i');
  if (mobileMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenu.classList.remove('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});