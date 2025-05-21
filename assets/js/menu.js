document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');

  if (!toggle || !menu || !backdrop) return;

  toggle.addEventListener('click', () => {
    const isVisible = menu.classList.contains('opacity-100');

    menu.classList.toggle('hidden', isVisible);
    backdrop.classList.toggle('hidden', isVisible);

    requestAnimationFrame(() => {
      menu.classList.toggle('opacity-0', isVisible);
      menu.classList.toggle('opacity-100', !isVisible);

      backdrop.classList.toggle('opacity-0', isVisible);
      backdrop.classList.toggle('opacity-100', !isVisible);
    });

    toggle.setAttribute('aria-expanded', String(!isVisible));
  });

  backdrop.addEventListener('click', () => {
    menu.classList.add('opacity-0');
    menu.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 300);

    toggle.setAttribute('aria-expanded', 'false');
  });
});
