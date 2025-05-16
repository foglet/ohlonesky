document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const bars = toggle.querySelectorAll('span');

  function openMenu() {
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
    }, 10);

    // Animate bars
    bars[0].classList.add('rotate-45', 'translate-y-1.5');
    bars[1].classList.add('-rotate-45', '-translate-y-1');
    bars[1].classList.replace('w-5', 'w-8');
  }

  function closeMenu() {
    menu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    // Animate bars back
    bars[0].classList.remove('rotate-45', 'translate-y-1.5');
    bars[1].classList.remove('-rotate-45', '-translate-y-1');
    bars[1].classList.replace('w-8', 'w-5');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 300);
  }

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden') && !menu.classList.contains('translate-x-full');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
});
