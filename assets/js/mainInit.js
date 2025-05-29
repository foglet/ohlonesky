// assets/js/mainInit.js

import { initMenu } from '/assets/js/menuBlitzloader.js';
import { initMenuToggle } from '/assets/js/menuToggle.js';
import { setFormRedirect, setThanksMessage } from '/assets/js/formLogic.js';
import { initAccordion } from '/assets/js/modules/initAccordion.js'; // ← NEW

export function initMain() {
  // 🔹 Initialize mobile menu (hamburger slide-out)
  initMenu();

  // 🔹 Initialize legacy or supplemental menu toggling
  initMenuToggle();

  // 🔹 Accordion (if present)
  if (document.querySelector('[data-accordion-target]')) {
    initAccordion(); // ← CONDITIONAL
  }

  // 🔹 Get current page ID (for conditional logic)
  const pageId = document.body.id;

  // ✅ Set redirect logic if form is present
  if (document.querySelector('input[name="redirect"]')) {
    setFormRedirect();
  }

  // ✅ Show thank-you message on the thanks page
  if (pageId === 'thanks') {
    setThanksMessage();
  }

  // ✅ Update footer copyright year
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // ✅ Page fade-in logic, respects motion preferences
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
}
