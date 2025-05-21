export function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const backdrop = document.getElementById('menuBackdrop');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMenu');

  function openMenu() {
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');

    requestAnimationFrame(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
    });

    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    menu.addEventListener('transitionend', () => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, { once: true });

    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  backdrop?.addEventListener('click', closeMenu);
  closeBtn?.addEventListener('click', closeMenu);
}
