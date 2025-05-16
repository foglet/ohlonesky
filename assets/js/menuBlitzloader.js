document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const barTop = toggle.querySelector('.bar-top');
  const barBottom = toggle.querySelector('.bar-bottom');

  function openMenu() {
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
    }, 10);

    // Animate to "X"
    barTop.classList.add('rotate-45', 'translate-y-2');
    barBottom.classList.add('-rotate-45', '-translate-y-2');
  }

  function closeMenu() {
    menu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    // Animate back to bars
    barTop.classList.remove('rotate-45', 'translate-y-2');
    barBottom.classList.remove('-rotate-45', '-translate-y-2');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 500);
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden') && !menu.classList.contains('translate-x-full');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
  document.getElementById('closeMenu')?.addEventListener('click', closeMenu);
});
