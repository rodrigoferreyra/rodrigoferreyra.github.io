// Navigation functionality to show/hide content sections
document.querySelectorAll('.nav-item').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Update active state on nav items
    document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    
    // Get the section to show
    const section = link.getAttribute('data-section');
    
    // Hide all content sections
    document.querySelectorAll('.hero').forEach((hero) => hero.classList.remove('active'));
    document.querySelectorAll('.section-panel').forEach((panel) => panel.classList.remove('active'));
    
    // Show the appropriate content
    if (section === 'overview') {
      document.querySelector('.hero').classList.add('active');
    } else {
      const targetPanel = document.querySelector(`[data-content="${section}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    }
  });
});

// Handle the "See my work" link in hero
document.querySelector('.primary-link[data-section="work"]').addEventListener('click', (e) => {
  e.preventDefault();
  
  // Find and click the work nav item
  const workNav = document.querySelector('.nav-item[data-section="work"]');
  if (workNav) {
    workNav.click();
  }
});

// Initialize: show overview by default
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero').classList.add('active');
});
