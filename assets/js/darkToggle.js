// darkToggle.js
export function initDarkToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('darkToggle');

  if (!toggle) {
    console.warn('❌ Dark toggle button not found in DOM.');
    return;
  }

  console.log('✅ #darkToggle found. Initializing...');

  try {
    // Apply persisted theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      root.classList.add('dark');
      console.log('🌙 Dark mode enabled from localStorage');
    } else {
      root.classList.remove('dark');
      console.log('☀️ Light mode enforced from localStorage');
    }

    // Toggle handler
    toggle.addEventListener('click', () => {
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      console.log(`🔁 Theme toggled: ${isDark ? 'dark' : 'light'}`);
      console.log('📄 <html> classList now:', root.classList.value);
    });

  } catch (err) {
    console.warn('⚠️ localStorage error; dark mode will not persist.', err);
  }
}
