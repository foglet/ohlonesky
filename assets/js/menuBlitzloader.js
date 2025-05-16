export function initMenuBlitz() {
  const menu = document.getElementById('mobileMenu');
  const button = document.getElementById('menuButton');
  const close = document.getElementById('closeMenu');
  const backdrop = document.getElementById('menuBackdrop');

  function trapFocus(element) {
    const focusables = element.querySelectorAll('a[href], button:not([disabled])');
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

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
    button.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0');
    });

    trapFocus(menu);
  }

  function closeMenu() {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      button.focus();
    }, 300);
  }

  button.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });
}
