// Navigation functionality to show/hide content sections
document.querySelectorAll('.nav-item').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    // Update active state on nav items
    document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
    link.classList.add('active');

    // Get the section to show
    const section = link.getAttribute('data-section');

    // Find all currently active sections
    const activeHero = document.querySelector('.hero.active');
    const activePanels = document.querySelectorAll('.section-panel.active');

    // Hide all active sections first
    if (activeHero) {
      activeHero.style.opacity = '0';
    //  activeHero.style.transform = 'translateY(10px)';

      setTimeout(() => {
        activeHero.classList.remove('active');
        activeHero.style.opacity = '';
        activeHero.style.transform = '';
      }, 300);
    }

    activePanels.forEach((panel) => {
      panel.style.opacity = '0';
    //  panel.style.transform = 'translateY(10px)';

      setTimeout(() => {
        panel.classList.remove('active');
        panel.style.opacity = '';
        panel.style.transform = '';
      }, 300);
    });

    // Show the appropriate content after the current content has faded out
    setTimeout(() => {
      if (section === 'overview') {
        const hero = document.querySelector('.hero');

        // Set the starting position BEFORE displaying the element
        hero.style.opacity = '0';
    //    hero.style.transform = 'translateY(10px)';
        hero.classList.add('active');

        // Force the browser to register the starting opacity
        void hero.offsetWidth;

        // Fade in
        hero.style.opacity = '1';

        // Restore normal position
        hero.style.transform = 'translateY(0)';
      } else {
        const targetPanel = document.querySelector(`[data-content="${section}"]`);

        if (targetPanel) {
          // Set the starting position BEFORE displaying the element
          targetPanel.style.opacity = '0';
          targetPanel.style.transform = 'translateY(10px)';
          targetPanel.classList.add('active');

          // Force the browser to register the starting opacity
          void targetPanel.offsetWidth;

          // Fade in
          targetPanel.style.opacity = '1';

          // Restore normal position
          targetPanel.style.transform = 'translateY(0)';
        }
      }
    }, 300);
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


// Case study navigation functionality
document.querySelectorAll('.case-nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    // Remove active class from all nav items
    document.querySelectorAll('.case-nav-item').forEach((i) => i.classList.remove('active'));
    
    // Add active class to clicked item
    item.classList.add('active');
    
    // Get the case content to show
    const caseId = item.getAttribute('data-case');
    
    // Hide all case content
    document.querySelectorAll('.case-display-content').forEach((content) => {
      content.classList.remove('active');
      content.style.opacity = '0';
    });
    
    // Show the selected case content with fade in
    const targetContent = document.querySelector(`.case-display-content[data-content="${caseId}"]`);
    if (targetContent) {
      targetContent.classList.add('active');
      // Force reflow
      void targetContent.offsetWidth;
      targetContent.style.opacity = '1';
    }
  });
});

// Initialize: show overview by default
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');

  // Set the starting state before displaying the hero
  hero.style.opacity = '0';
  //  hero.style.transform = 'translateY(10px)';
  hero.classList.add('active');

  // Force reflow so the browser registers opacity: 0
  void hero.offsetWidth;

  // Fade in
  hero.style.opacity = '1';

  // Restore normal position
  //hero.style.transform = 'translateY(0)';
});
