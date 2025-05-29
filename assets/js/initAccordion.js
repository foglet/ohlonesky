// assets/js/initAccordion.js
export function initAccordion() {
  const triggers = document.querySelectorAll('[data-accordion-target]');

  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-accordion-target');
      const target = document.querySelector(targetId);
      if (!target) return;

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      target.classList.toggle('hidden');

      const icon = btn.querySelector('svg[data-accordion-icon]');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
}
