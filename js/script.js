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
  

