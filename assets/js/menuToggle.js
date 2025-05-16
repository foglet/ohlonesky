// assets/js/menuToggle.js

export function initMenuToggle() {
  const menu = document.getElementById('mobileMenu');
  const menuButton = document.getElementById('menuButton');
  const closeButton = document.getElementById('closeMenu');
  const backdrop = document.getElementById('menuBackdrop');

  function trapFocus(element) {
    const focusable = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
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

    setTimeout(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0');
    }, 10);

    trapFocus(menu);
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      menuButton.focus();
    }, 300);
  }

  function closeMenuAndNavigate(href) {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');

    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      window.location.href = href;
    }, 300);
  }

  menuButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });

  // Intercept mobile nav links and delay navigation
  menu.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      closeMenuAndNavigate(href);
    });
  });
}
