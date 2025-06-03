// Enhanced menuToggle.js for full-screen overlay (not slide-up)
export function initMenuToggle() {
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const menuToggle = document.getElementById('menuToggle');
  const closeButton = document.getElementById('closeMenu');

  const barTop = menuToggle.querySelector('.bar-top');
  const barMiddle = menuToggle.querySelector('.bar-middle');
  const barBottom = menuToggle.querySelector('.bar-bottom');

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
      barTop.classList.add('rotate-45', 'translate-y-[6px]');
      barMiddle.classList.add('opacity-0');
      barBottom.classList.add('-rotate-45', '-translate-y-[6px]');
    } else {
      barTop.classList.remove('rotate-45', 'translate-y-[6px]');
      barMiddle.classList.remove('opacity-0');
      barBottom.classList.remove('-rotate-45', '-translate-y-[6px]');
    }
  }

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      menu.classList.remove('opacity-0');
      menu.classList.add('opacity-100');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');

      // Animate in menu links
      document.querySelectorAll('.menu-link').forEach((link, i) => {
        link.style.transitionDelay = `${100 + i * 50}ms`;
        link.classList.remove('opacity-0', 'translate-y-2');
      });
    });

    animateHamburger(true);
    trapFocus(menu);
  }

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');

    animateHamburger(false);

    document.querySelectorAll('.menu-link').forEach(link => {
      link.classList.add('opacity-0', 'translate-y-2');
      link.style.transitionDelay = '';
    });

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      menuToggle.focus();
    }, 300);
  }

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
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
