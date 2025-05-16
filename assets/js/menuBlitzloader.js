export function initMenuBlitz() {
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const links = mobileMenu.querySelectorAll('a');

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.remove('opacity-0');
      mobileMenu.classList.remove('translate-x-full');
    });
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 500); // Match your transition speed
  }

  // Bind open/close triggers
  menuButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  // Auto-close on any menu link click
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}
