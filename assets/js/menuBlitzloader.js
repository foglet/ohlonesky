export function initMenu({
  menuId = 'mobileMenu',
  toggleId = 'menuToggle',
  backdropId = 'menuBackdrop',
  linkSelector = '.menu-link',
  transitionDuration = 300
} = {}) {
  const toggle = document.getElementById(toggleId);
  const menu = document.getElementById(menuId);
  const backdrop = document.getElementById(backdropId);
  const links = document.querySelectorAll(`#${menuId} ${linkSelector}`);

  if (!toggle || !menu || !backdrop) {
    console.warn('⚠️ initMenu: Missing elements', { toggle, menu, backdrop });
    return;
  }

  const openMenu = () => {
    toggle.classList.add('tham-active');
    toggle.setAttribute('aria-expanded', 'true');

    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');
  };

  const closeMenu = () => {
    toggle.classList.remove('tham-active');
    toggle.setAttribute('aria-expanded', 'false');

    menu.classList.remove('translate-x-0', 'opacity-100');
    menu.classList.add('translate-x-full', 'opacity-0');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, transitionDuration);
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('tham-active');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  links.forEach(link => link.addEventListener('click', closeMenu));
}
