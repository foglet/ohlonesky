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
      // Fade in menu and backdrop
      menu.classList.add('opacity-100');
      menu.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');

      // Optionally: trigger bounce/fade on links
      const links = menuLinks.querySelectorAll('a');
      links.forEach(link => link.classList.add('opacity-100'));
    }, 10);

    // Animate hamburger bars into an X
    barTop.classList.add('rotate-45', 'translate-y-1');
    barBottom.classList.add('-rotate-45', '-translate-y-1');
  }

  function closeMenu() {
    // Fade out menu and backdrop
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    // Optionally: hide links again
    const links = menuLinks.querySelectorAll('a');
    links.forEach(link => link.classList.remove('opacity-100'));

    // Reset hamburger bars
    barTop.classList.remove('rotate-45', 'translate-y-1');
    barBottom.classList.remove('-rotate-45', '-translate-y-1');

    // Fully hide after animation
    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 500);
  }

  toggle.addEventListener('click', () => {
    const isOpen =
      !menu.classList.contains('hidden') &&
      menu.classList.contains('opacity-100');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
});
