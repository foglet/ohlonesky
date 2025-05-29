// /assets/js/mainInit.js

export function initMain() {
  console.log("🚀 initMain: Starting UI initialization");

  // 🔹 Mobile Menu Initialization
  import('/assets/js/menuBlitzloader.js')
    .then(mod => mod.initMenu())
    .catch(err => console.error('⚠️ Failed to load menuBlitzloader.js:', err));

  // import('/assets/js/menuToggle.js')
  //   .then(mod => mod.initMenuToggle())
//    .catch(err => console.error('⚠️ Failed to load menuToggle.js:', err));

  // 🔹 Accordion (lazy load only if present)
  if (document.querySelector('[data-accordion-target]')) {
    import('/assets/js/modules/initAccordion.js')
      .then(mod => {
        mod.initAccordion();
        console.log('🪗 Accordion initialized');
      })
      .catch(err => console.error('⚠️ Failed to load initAccordion.js:', err));
  }

  // 🔹 Form Redirect Logic
  if (document.querySelector('input[name="redirect"]')) {
    import('/assets/js/formLogic.js')
      .then(mod => mod.setFormRedirect())
      .catch(err => console.error('⚠️ Failed to load setFormRedirect:', err));
  }

  // 🔹 Thank-You Page Handling
  if (document.body.id === 'thanks') {
    import('/assets/js/formLogic.js')
      .then(mod => mod.setThanksMessage())
      .catch(err => console.error('⚠️ Failed to load setThanksMessage:', err));
  }

  // 🔹 Footer Year Auto-Update
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
    console.log('📆 Footer year updated');
  }

  // 🔹 Page Fade-In Animation
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
    console.log('🌅 Page fade-in applied');
  }
}
