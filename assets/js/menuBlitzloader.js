document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const barTop = toggle.querySelector('.bar-top');
  const barBottom = toggle.querySelector('.bar-bottom');

  function openMenu() {
    menu.classList.remove('hidden', 'opacity-0');
    menu.classList.add('opacity-100');

    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');

    barTop.classList.add('rotate-45', 'translate-y-1');
    barBottom.classList.add('-rotate-45', '-translate-y-1');
  }

  function closeMenu() {
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');

    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    barTop.classList.remove('rotate-45', 'translate-y-1');
    barBottom.classList.remove('-rotate-45', '-translate-y-1');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 500); // match duration-500 on transition
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('opacity-100') && !menu.classList.contains('hidden');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
});
