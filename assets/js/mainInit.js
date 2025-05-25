import { initMenu } from '/assets/js/menuBlitzloader.js';
import { initMenuToggle } from '/assets/js/menuToggle.js';
import { setFormRedirect, setThanksMessage } from '/assets/js/formLogic.js';

export function initMain() {
  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initMenuToggle();

    const pageId = document.body.id;

    // ✅ Only run form redirect logic if on a form page
    if (document.querySelector('input[name="redirect"]')) {
      setFormRedirect();
    }

    // ✅ Only run thank-you message logic if on thanks page
    if (pageId === 'thanks') {
      setThanksMessage();
    }

    // ✅ Set footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // ✅ Fade-in logic with motion preference
    const pageContent = document.getElementById('pageContent');
    const skipFade = sessionStorage.getItem('skipFadeIn');

    if (pageContent) {
      if (skipFade) {
        pageContent.classList.remove('opacity-0');
        sessionStorage.removeItem('skipFadeIn');
      } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        pageContent.classList.remove('opacity-0');
      } else {
        requestAnimationFrame(() => {
          pageContent.classList.remove('opacity-0');
          pageContent.classList.add('opacity-100');
        });
      }
    }
  });
}
