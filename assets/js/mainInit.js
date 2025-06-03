// assets/js/mainInit.js

export function initMain() {
  const promises = [];

  // 🔹 Lazy-load accordion if present
  if (document.querySelector('[data-accordion-target]')) {
    const accordionPromise = import('/assets/js/initAccordion.js')
      .then((mod) => {
        mod.initAccordion();
        console.log('🪗 Accordion initialized');
      });
    promises.push(accordionPromise);
  }

  // 🔹 Load mobile menu if toggle is present
  if (document.getElementById('menuToggle')) {
    const menuPromise = import('/assets/js/menuBlitzloader.js')
      .then((mod) => {
        mod.initMenu();
        console.log('📱 Mobile menu initialized');
      });
    promises.push(menuPromise);
  }

  // 🔹 Redirect form logic
  if (document.querySelector('input[name="redirect"]')) {
    const redirectPromise = import('/assets/js/formLogic.js')
      .then((mod) => mod.setFormRedirect());
    promises.push(redirectPromise);
  }

  // 🔹 Thank-you page message
  if (document.body.id === 'thanks') {
    const thanksPromise = import('/assets/js/formLogic.js')
      .then((mod) => mod.setThanksMessage());
    promises.push(thanksPromise);
  }

  // 🔹 Wait for all dynamic modules, even if some fail
  Promise.allSettled(promises).then((results) => {
    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        console.warn(`⚠️ Module ${i} failed:`, result.reason);
      }
    });
    console.log('✅ All dynamic modules settled');
  });

  // 🔹 Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 🔹 Page fade-in
  const pageContent = document.getElementById('pageContent');
  const skipFade = sessionStorage.getItem('skipFadeIn');

  if (pageContent) {
    if (skipFade || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pageContent.classList.remove('opacity-0');
      sessionStorage.removeItem('skipFadeIn');
    } else {
      requestAnimationFrame(() => {
        pageContent.classList.remove('opacity-0');
        pageContent.classList.add('opacity-100');
      });
    }
  }

  console.log('✅ initMain complete');
}
