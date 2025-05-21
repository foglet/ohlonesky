export function initMenu() {
  const toggleButton = document.getElementById('menuToggle');
  const closeButton = document.getElementById('closeMenu'); // Optional
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');

  function openMenu() {
    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    backdrop.classList.remove('hidden', 'opacity-0');
    requestAnimationFrame(() => {
      menu.classList.add('translate-x-0', 'opacity-100');
      backdrop.classList.add('opacity-100');
    });
    toggleButton.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menu.classList.remove('translate-x-0', 'opacity-100');
    backdrop.classList.remove('opacity-100');
    menu.addEventListener('transitionend', () => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, { once: true });
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggleButton?.addEventListener('click', () => {
    const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  backdrop?.addEventListener('click', closeMenu);
}
