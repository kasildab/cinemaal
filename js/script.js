function scrollTrending(direction) {
  const row = document.getElementById('trendingRow');
  const scrollAmount = 300; // Adjust this value as needed
  
  if (direction === -1) {
      row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
      row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
  const trendingRow = document.getElementById('trendingRow');
  let isDown = false;
  let startX;
  let scrollLeft;

  trendingRow.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - trendingRow.offsetLeft;
      scrollLeft = trendingRow.scrollLeft;
  });

  trendingRow.addEventListener('mouseleave', () => {
      isDown = false;
  });

  trendingRow.addEventListener('mouseup', () => {
      isDown = false;
  });

  trendingRow.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - trendingRow.offsetLeft;
      const walk = (x - startX) * 2; // Adjust multiplier for sensitivity
      trendingRow.scrollLeft = scrollLeft - walk;
  });

  // Touch events for mobile
  trendingRow.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - trendingRow.offsetLeft;
      scrollLeft = trendingRow.scrollLeft;
  });

  trendingRow.addEventListener('touchend', () => {
      isDown = false;
  });

  trendingRow.addEventListener('touchmove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - trendingRow.offsetLeft;
      const walk = (x - startX) * 2;
      trendingRow.scrollLeft = scrollLeft - walk;
  });
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