export function initMenuToggle() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');

  const barTop = menuButton.querySelector('.bar-top');
  const barMiddle = menuButton.querySelector('.bar-middle');
  const barBottom = menuButton.querySelector('.bar-bottom');

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

  function animateHamburger(opening) {
    if (opening) {
      barTop.classList.add('rotate-45', 'translate-y-2');
      barMiddle.classList.add('opacity-0');
      barBottom.classList.add('-rotate-45', '-translate-y-2');
    } else {
      barTop.classList.remove('rotate-45', 'translate-y-2');
      barMiddle.classList.remove('opacity-0');
      barBottom.classList.remove('-rotate-45', '-translate-y-2');
    }
  }

  function openMenu() {
    menuButton.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      menu.classList.remove('translate-y-full');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');

      // Animate in menu links
      document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('opacity-0', 'translate-y-2');
      });
    });

    animateHamburger(true);
    trapFocus(menu);
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.add('translate-y-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');

    animateHamburger(false);

    // Reset menu link animation
    document.querySelectorAll('.menu-link').forEach(link => {
      link.classList.add('opacity-0', 'translate-y-2');
    });

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      menuButton.focus();
    }, 300); // match transition duration
  }

  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  closeButton.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}
