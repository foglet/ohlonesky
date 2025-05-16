document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const menuLinks = document.getElementById('menuLinks');
  const barTop = toggle.querySelector('.bar-top');
  const barBottom = toggle.querySelector('.bar-bottom');

  function openMenu() {
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');

    setTimeout(() => {
      // Slide in the overlay
      menu.classList.remove('-translate-x-full');
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');

      // Animate menu link container (fade + lift)
      menuLinks.classList.remove('opacity-0', 'translate-y-4');
      menuLinks.classList.add('opacity-100', 'translate-y-0');

      // Fade in each link
      const links = menuLinks.querySelectorAll('a');
      links.forEach(link => {
        link.classList.add('opacity-100');
      });
    }, 10);

    // Animate hamburger into X
    barTop.classList.add('rotate-45', 'translate-y-1');
    barBottom.classList.add('-rotate-45', '-translate-y-1');
  }

  function closeMenu() {
    // Reset menu links
    menuLinks.classList.add('opacity-0', 'translate-y-4');
    menuLinks.classList.remove('opacity-100', 'translate-y-0');

    const links = menuLinks.querySelectorAll('a');
    links.forEach(link => {
      link.classList.remove('opacity-100');
    });

    // Slide out the menu
    menu.classList.add('-translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    // Reset hamburger bars
    barTop.classList.remove('rotate-45', 'translate-y-1');
    barBottom.classList.remove('-rotate-45', '-translate-y-1');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 500);
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden') && !menu.classList.contains('-translate-x-full');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
});
