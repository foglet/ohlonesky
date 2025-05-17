export function initMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const barTop = toggleBtn?.querySelector('.bar-top');
  const barBottom = toggleBtn?.querySelector('.bar-bottom');

  if (!toggleBtn || !mobileMenu || !backdrop || !barTop || !barBottom) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');

    // Show menu + backdrop
    mobileMenu.classList.remove('hidden');
    backdrop.classList.remove('hidden');

    // Trigger opacity transition
    requestAnimationFrame(() => {
      mobileMenu.classList.remove('opacity-0');
      mobileMenu.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
    });

    // Animate hamburger to X
    barTop.style.transform = 'rotate(45deg) translateY(4px)';
    barBottom.style.transform = 'rotate(-45deg) translateY(-4px)';
  }

  function closeMenu() {
    isOpen = false;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');

    // Fade out menu + backdrop
    mobileMenu.classList.add('opacity-0');
    mobileMenu.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');

    // Hide after fade completes
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 300);

    // Reset hamburger
    barTop.style.transform = '';
    barBottom.style.transform = '';
  }

  toggleBtn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  // Optional: ESC key closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });
}
