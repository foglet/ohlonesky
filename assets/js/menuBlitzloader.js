export function initMenuBlitz() {
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const links = mobileMenu?.querySelectorAll('a') || [];

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      mobileMenu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0');
    });
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 500); // Match Tailwind transition duration
  }

  menuButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      sessionStorage.setItem('skipFadeIn', 'true');
      closeMenu();
    });
  });
}
