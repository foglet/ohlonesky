export function initMenu({
  menuId = 'mobileMenu',
  toggleId = 'menuToggle',
  backdropId = 'menuBackdrop',
  closeId = 'closeMenu',
  linkSelector = '.menu-link',
  transitionDuration = 300
} = {}) {
  const toggle = document.getElementById(toggleId);
  const menu = document.getElementById(menuId);
  const backdrop = document.getElementById(backdropId);
  const close = document.getElementById(closeId);
  const links = document.querySelectorAll(`#${menuId} ${linkSelector}`);

  console.log('📦 initMenu — Elements found:', {
    toggle,
    menu,
    backdrop,
    close,
    links: links.length
  });

  if (!toggle || !menu || !backdrop || !close) {
    console.warn('⚠️ initMenu: Missing required elements', {
      toggle,
      menu,
      backdrop,
      close
    });
    return;
  }

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('open');

    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');
  };

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('open');

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
    const isOpen = toggle.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
  close.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  console.log('✅ Mobile menu initialized.');
}
