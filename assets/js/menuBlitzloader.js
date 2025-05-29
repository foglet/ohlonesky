// menuBlitzloader.js — unified mobile menu controller

export function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('menuBackdrop');
  const closeBtn = document.getElementById('closeMenu');

  if (!toggle || !menu || !backdrop || !closeBtn) {
    console.warn("⚠️ menuBlitz: Some elements not found, skipping init");
    return;
  }

  function trapFocus(container) {
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    container.addEventListener('keydown', (e) => {
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
    toggle.setAttribute('aria-expanded', 'true');
    menu.classList.remove('hidden');
    backdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    requestAnimationFrame(() => {
      menu.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
    });

    trapFocus(menu);
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    document.body.classList.remove('overflow-hidden');

    menu.addEventListener('transitionend', () => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
      toggle.focus();
    }, { once: true });
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);
  closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
      closeMenu();
    }
  });

  console.log("📱 menuBlitz initialized successfully");
}
