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

  console.groupCollapsed('🔧 initMenu Debug');
  console.log('menuToggle:', toggle);
  console.log('mobileMenu:', menu);
  console.log('menuBackdrop:', backdrop);
  console.groupEnd();

  if (!toggle || !menu || !backdrop) {
    console.warn('⚠️ initMenu: Missing required elements');
    return;
  }

  const openMenu = () => {
    console.log('📂 Opening menu');
    toggle.classList.add('tham-active');
    toggle.setAttribute('aria-expanded', 'true');

    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');
  };

  const closeMenu = () => {
    console.log('📁 Closing menu');
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
    console.log(`📲 menuToggle clicked → isOpen: ${isOpen}`);
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
}
