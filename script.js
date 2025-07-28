/*
 * JavaScript for interactivity on Kiran's portfolio
 *
 * Handles the responsive navigation toggle and animates skill progress bars
 * when they come into view. Uses the AOS (Animate On Scroll) library for
 * scroll-based animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation menu toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('nav ul');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  // Close navigation when clicking a link on mobile
  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Animate skill progress bars when visible
  const progressBars = document.querySelectorAll('.progress-bar span');
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      const target = bar.getAttribute('data-width');
      bar.style.width = target;
    });
  };

  // Use IntersectionObserver to trigger progress animation
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(skillsSection);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(skillsSection);
  }

  // Initialise AOS animations
  if (window.AOS) {
    AOS.init({
      duration: 800,
      once: true
    });
  }
});