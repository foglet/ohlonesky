// darkToggle.js
export function initDarkToggle() {
  const toggle = document.getElementById('darkToggle');
  const root = document.documentElement;

  if (localStorage.getItem('theme') === 'dark') {
    root.classList.add('dark');
  }

  toggle?.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}
