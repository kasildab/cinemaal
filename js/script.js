function scrollTrending(direction) {
    const row = document.getElementById('trendingRow');
    const scrollAmount = row.clientWidth * 0.8 * direction;
    row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', () => {
    const trendingRow = document.getElementById('trending-row');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
  
    if (trendingRow && leftButton && rightButton) {
      trendingRow.addEventListener('scroll', () => {
        leftButton.style.display = trendingRow.scrollLeft > 0 ? 'flex' : 'none';
        rightButton.style.display = trendingRow.scrollLeft < (trendingRow.scrollWidth - trendingRow.clientWidth) ? 'flex' : 'none';
      });
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