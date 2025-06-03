export function initMenu({
  menuId = 'mobileMenu',
  toggleId = 'menuToggle',
  backdropId = 'menuBackdrop',
  linkSelector = '.menu-link'
} = {}) {
  const toggle = document.getElementById(toggleId);
  const menu = document.getElementById(menuId);
  const backdrop = document.getElementById(backdropId);
  const links = document.querySelectorAll(`${linkSelector}`);

  if (!toggle || !menu || !backdrop) return;

  const open = () => {
    toggle.classList.add('open');
    menu.classList.remove('hidden', 'translate-x-full', 'opacity-0');
    menu.classList.add('translate-x-0', 'opacity-100');
    backdrop.classList.remove('hidden', 'opacity-0');
    backdrop.classList.add('opacity-100');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    toggle.classList.remove('open');
    menu.classList.remove('translate-x-0', 'opacity-100');
    menu.classList.add('translate-x-full', 'opacity-0');
    backdrop.classList.add('opacity-0');
    toggle.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      menu.classList.add('hidden');
      backdrop.classList.add('hidden');
    }, 300);
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    isOpen ? close() : open();
  });

  backdrop.addEventListener('click', close);
  links.forEach(link => link.addEventListener('click', close));
}
