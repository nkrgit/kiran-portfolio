/**
 * JavaScript for Kiran's interactive portfolio.
 *
 * This script handles:
 *  - Navigation menu toggle on mobile devices
 *  - Opening and closing modal overlays when section links or cards are clicked
 *  - Animating skill progress bars when the Skills modal opens
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Close nav when clicking a link (useful for mobile)
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Function to animate skill bars
  const animateSkills = () => {
    document.querySelectorAll('.progress-bar span').forEach(bar => {
      const target = bar.getAttribute('data-width');
      bar.style.width = target;
    });
  };

  // Function to reset skill bars to zero width
  const resetSkills = () => {
    document.querySelectorAll('.progress-bar span').forEach(bar => {
      bar.style.width = 0;
    });
  };

  // Open a given modal by section name
  const openModal = (section) => {
    const overlay = document.querySelector('.modal-overlay');
    const modal = document.getElementById(`${section}-modal`);
    if (!modal || !overlay) return;

    overlay.classList.add('active');
    modal.classList.add('active');

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // If opening skills modal, animate bars
    if (section === 'skills') {
      animateSkills();
    }
  };

  // Close all modals
  const closeModals = () => {
    const overlay = document.querySelector('.modal-overlay');
    overlay?.classList.remove('active');

    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });

    // Unlock body scroll
    document.body.style.overflow = '';

    // Reset skill bars when closing
    resetSkills();
  };

  // Attach click handlers to nav links and section cards
  document.querySelectorAll('[data-section]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const section = element.getAttribute('data-section');
      if (section) {
        openModal(section);
      }
    });
  });

  // Close buttons within modals
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModals();
    });
  });

  // Clicking on overlay closes modals
  const overlay = document.querySelector('.modal-overlay');
  overlay?.addEventListener('click', () => {
    closeModals();
  });
});