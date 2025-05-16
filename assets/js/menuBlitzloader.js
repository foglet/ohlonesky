document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const barTop = toggle.querySelector('.bar-top');
  const barBottom = toggle.querySelector('.bar-bottom');
  const closeBtn = document.getElementById('closeMenu');

  function openMenu() {
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');

    // Start animation slightly after class removal for smooth transition
    setTimeout(() => {
      menu.classList.remove('-translate-x-full');
      backdrop.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
    }, 10);

    // Animate bars into an X
    barTop.classList.add('rotate-45', 'translate-y-2');
    barBottom.classList.add('-rotate-45', '-translate-y-2');
  }

  function closeMenu() {
    // Start hide animation
    menu.classList.add('-translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');

    // Reset bars
    barTop.classList.remove('rotate-45', 'translate-y-2');
    barBottom.classList.remove('-rotate-45', '-translate-y-2');

    // Fully hide after animation ends
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
  closeBtn?.addEventListener('click', closeMenu);
});
