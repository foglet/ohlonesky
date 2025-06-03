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
  const links = document.querySelectorAll(linkSelector);

  if (!toggle || !menu || !backdrop) {
    console.warn('❌ initMenu: Missing elements', { toggle, menu, backdrop });
    return;
  }

  console.log('✅ initMenu initialized');

  function openMenu() {
    toggle.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');

    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');
  }

  function closeMenu() {
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');

    menu.classList.remove('translate-x-0', 'opacity-100');
    menu.classList.add('translate-x-full', 'opacity-0');

    backdrop.classList.add('opacity-0');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, transitionDuration);
  }

  function toggleMenu() {
    const isOpen = toggle.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  }

  // 🔗 Event Bindings
  toggle.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
}
