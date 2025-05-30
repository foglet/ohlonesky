export function initMenu({
  menuId = 'mobileMenu',
  toggleId = 'menuToggle',
  closeId = 'closeMenu',
  backdropId = 'menuBackdrop',
  linkSelector = '.menu-link',
  transitionDuration = 300
} = {}) {
  const toggle = document.getElementById(toggleId);
  const close = document.getElementById(closeId);
  const backdrop = document.getElementById(backdropId);
  const menu = document.getElementById(menuId);
  const links = document.querySelectorAll(`#${menuId} ${linkSelector}`);

  if (!toggle || !menu || !backdrop || !close) {
    console.warn(`⚠️ initMenu: Missing element(s):`, {
      toggle,
      menu,
      backdrop,
      close
    });
    return;
  }

  const openMenu = () => {
    console.log("🍔 Menu opened");
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');

    requestAnimationFrame(() => {
      menu.classList.add('opacity-100');
      menu.classList.remove('opacity-0');

      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');

      links.forEach((link, i) => {
        setTimeout(() => {
          link.classList.remove('opacity-0', 'translate-y-2');
          link.classList.add('opacity-100', 'translate-y-0');
        }, i * 75);
      });

      document.body.classList.add('overflow-hidden');
    });
  };

  const closeMenu = () => {
    console.log("❌ Menu closed");
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    links.forEach(link => {
      link.classList.remove('opacity-100', 'translate-y-0');
      link.classList.add('opacity-0', 'translate-y-2');
    });

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, transitionDuration);
  };

  toggle.addEventListener('click', () => {
    console.log("🖱️ toggle clicked");
    openMenu();
  });

  close.addEventListener('click', () => {
    console.log("🖱️ close clicked");
    closeMenu();
  });

  backdrop.addEventListener('click', () => {
    console.log("🖱️ backdrop clicked");
    closeMenu();
  });

  links.forEach(link =>
    link.addEventListener('click', () => {
      console.log("🖱️ nav link clicked");
      closeMenu();
    })
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      console.log("🔑 Escape key");
      closeMenu();
    }
  });

  console.log(`✅ initMenu complete for #${menuId}`);
}
