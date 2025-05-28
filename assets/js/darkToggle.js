// darkToggle.js

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkToggle');
  const root = document.documentElement;

  // Apply saved theme
  if (localStorage.getItem('theme') === 'dark') {
    root.classList.add('dark');
  }

  toggle?.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
