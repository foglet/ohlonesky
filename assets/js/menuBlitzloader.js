export function initMenu({
  menuId = 'mobile-menu',
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

  const dev = location.hostname === 'localhost';

  if (!toggle || !menu || !backdrop) {
    if (dev) {
      console.warn('⚠️ initMenu: Missing core elements', {
        toggle, menu, backdrop
      });
      console.debug('🧱 DOM snapshot:', document.body.innerHTML.slice(0, 600));
    }
    return;
  }

  if (!close && dev) {
    console.info('ℹ️ initMenu: No #closeMenu found — relying on backdrop and nav links.');
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

  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (close) close.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));

  if (dev) {
    console.log('✅ Mobile menu initialized (toggle handled externally).');
  }
}
