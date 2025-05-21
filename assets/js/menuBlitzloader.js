export function initMenu() {
  const backdrop = document.getElementById('menuBackdrop');
  const toggleButton = document.getElementById('menuToggle');

  // Load the mobile menu first
  fetch('/components/mobileMenu.html')
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById('mobileMenuContainer');
      if (container) {
        container.innerHTML = html;

        const menu = document.getElementById('mobileMenu');
        const links = menu.querySelectorAll('a');
        const closeMenu = () => {
          menu.classList.add('opacity-0');
          backdrop.classList.add('opacity-0');
          setTimeout(() => {
            menu.classList.add('hidden');
            backdrop.classList.add('hidden');
          }, 300);
        };

        // Handle toggle open
        toggleButton.addEventListener('click', () => {
          menu.classList.remove('hidden');
          backdrop.classList.remove('hidden');
          requestAnimationFrame(() => {
            menu.classList.remove('opacity-0');
            backdrop.classList.remove('opacity-0');
          });
        });

        // Handle backdrop click to close
        backdrop.addEventListener('click', closeMenu);

        // Optionally: close when a link is tapped
        links.forEach(link => link.addEventListener('click', closeMenu));
      }
    });
}
