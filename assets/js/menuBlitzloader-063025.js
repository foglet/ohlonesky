export function initMenu({
  menuId = 'mobile-menu',
  toggleId = 'menuToggle',
  backdropId = 'menuBackdrop',
  closeId = 'closeMenu',
  linkSelector = '.menu-link',
  transitionDuration = 300
} = {}) {
  // 🧩 Fetch elements from DOM
  const toggle = document.getElementById(toggleId);
  const menu = document.getElementById(menuId);
  const backdrop = document.getElementById(backdropId);
  const close = document.getElementById(closeId);
  const links = document.querySelectorAll(`#${menuId} ${linkSelector}`);

  // 🧪 Log what was found
  console.log('📦 initMenu — Elements found:', {
    toggle,
    menu,
    backdrop,
    close,
    linkCount: links.length
  });

  if (!toggle || !menu || !backdrop) {
    console.warn('⚠️ initMenu: Missing core elements', {
      toggle,
      menu,
      backdrop
    });

    // 🧰 Bonus: dump header if in dev
    if (location.hostname === 'localhost') {
      console.debug('🧱 Partial DOM snapshot:\n', document.body.innerHTML.slice(0, 800));
    }

    return;
  }

  if (!close) {
    console.info('ℹ️ initMenu: No #closeMenu found — relying on backdrop and nav links.');
  }

  // ✅ Open menu
  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.classList.add('open');

    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');
  };

  // ✅ Close menu
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

  // ✅ Event listeners
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (close) close.addEventListener('click', closeMenu);

  links.forEach(link => link.addEventListener('click', closeMenu));

  // ❌ Hamburger click is handled elsewhere, so skip it here
  // toggle.addEventListener('click', ...) is intentionally omitted

  console.log('✅ Mobile menu initialized (toggle logic external).');
}
