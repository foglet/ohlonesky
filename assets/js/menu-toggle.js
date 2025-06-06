document.addEventListener('DOMContentLoaded', () => {
  console.log("🧪 fallback menu script loaded");

  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('menuBackdrop');

  if (!btn || !menu || !backdrop) {
    console.warn('❌ One or more menu elements not found.');
    return;
  }

  const toggleMenu = () => {
    const isOpen = btn.classList.contains('open');
    btn.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(!isOpen));

    if (!isOpen) {
      menu.classList.remove('hidden', 'translate-y-full', 'opacity-0');
      menu.classList.add('translate-y-0', 'opacity-100');
      backdrop.classList.remove('hidden', 'opacity-0');
      backdrop.classList.add('opacity-100');
    } else {
      menu.classList.remove('translate-y-0', 'opacity-100');
      menu.classList.add('translate-y-full', 'opacity-0');
      backdrop.classList.add('opacity-0');

      setTimeout(() => {
        menu.classList.add('hidden');
        backdrop.classList.add('hidden');
      }, 300);
    }
  };

  btn.addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', toggleMenu);
});
