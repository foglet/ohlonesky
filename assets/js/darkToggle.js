// darkToggle.js
export function initDarkToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('darkToggle');

  if (!toggle) {
    console.warn('Dark toggle button not found.');
    return;
  }

  try {
    if (localStorage.getItem('theme') === 'dark') {
      root.classList.add('dark');
    }

    toggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  } catch (err) {
    console.warn('localStorage error; dark mode will not persist.');
  }
}
