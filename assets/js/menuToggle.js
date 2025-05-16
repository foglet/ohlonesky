export function initMenuToggle() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');

  function trapFocus(element) {
    const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select';
    const focusable = element.querySelectorAll(focusableSelectors);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    first?.focus();
  }

  function openMenu() {
    menuButton.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    // Animate in
    requestAnimationFrame(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
    });

    trapFocus(menu);
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');

    // Delay hiding the elements until animation completes
    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      menuButton.focus();
    }, 300); // Match transition duration
  }

  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}
