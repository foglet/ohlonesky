import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const IS_DEV =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';

  const version = IS_DEV
    ? '?v=dev'
    : `?v=${typeof BUILD_VERSION !== 'undefined' ? BUILD_VERSION : '1.0.0'}`;

  // Auto-detect nesting depth
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  // ✅ Inject CSS
  ['assets/css/output.css', 'assets/css/hero.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });

  // ✅ Load HTML partials
  const partials = document.querySelectorAll('[include-html]');
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}${version}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error('🚫 Error loading partial:', err);
    }
  }));

  // ✅ Ensure DOM is updated after innerHTML replacements
  await new Promise(requestAnimationFrame);

  // ✅ Initialize your scripts
  console.log('🧩 All partials loaded. Initializing scripts...');
  initMain();
  initMenu();
});
