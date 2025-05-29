// assets/js/mainInit.js

export function initMain() {
  // 🔹 Lazy-load accordion only if present
  if (document.querySelector('[data-accordion-target]')) {
    import('/assets/js/modules/initAccordion.js')
      .then((mod) => {
        mod.initAccordion();
        console.log('🪗 Accordion initialized');
      })
      .catch((err) => console.error('⚠️ Accordion failed to load:', err));
  }

  // 🔹 Redirect form logic
  if (document.querySelector('input[name="redirect"]')) {
    import('/assets/js/formLogic.js')
      .then((mod) => mod.setFormRedirect())
      .catch((err) => console.error('⚠️ setFormRedirect failed:', err));
  }

  // 🔹 Thank-you page message
  if (document.body.id === 'thanks') {
    import('/assets/js/formLogic.js')
      .then((mod) => mod.setThanksMessage())
      .catch((err) => console.error('⚠️ setThanksMessage failed:', err));
  }

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
