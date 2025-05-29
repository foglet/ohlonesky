// modules/initAccordion.js
export function initAccordion() {
  const triggers = document.querySelectorAll('[data-accordion-target]');
  triggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-accordion-target');
      const target = document.querySelector(targetId);

      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      target.classList.toggle('hidden');

      // Optionally rotate the icon
      const icon = btn.querySelector('svg[data-accordion-icon]');
      if (icon) {
        icon.classList.toggle('rotate-180');
      }
    });
  });
}
