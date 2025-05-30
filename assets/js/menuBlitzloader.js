export function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const close = document.getElementById('closeMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const menu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('#mobileMenu .menu-link');

  if (!toggle || !menu || !backdrop || !close) {
    console.warn("⚠️ initMenu: Missing one or more required elements.");
    return;
  }

  const openMenu = () => {
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');

    // Let the DOM register visibility
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
    });
  };

  const closeMenu = () => {
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    links.forEach((link) => {
      link.classList.remove('opacity-100', 'translate-y-0');
      link.classList.add('opacity-0', 'translate-y-2');
    });

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 300); // match your Tailwind transition duration
  };

  toggle.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
}
