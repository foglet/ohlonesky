import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const IS_DEV =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';

  const version = IS_DEV
    ? '?v=dev'
    : `?v=${typeof BUILD_VERSION !== 'undefined' ? BUILD_VERSION : '1.0.0'}`;

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

  // ✅ Give DOM time to integrate partials
  await new Promise(resolve => setTimeout(resolve, 100));

  // 🔍 Debug: verify partials populated
  console.log('🧩 Verifying include-html elements...');
  [...document.querySelectorAll('[include-html]')].forEach(el => {
    console.log('→ innerHTML length:', el.innerHTML.length);
  });

  // ✅ Final DOM settle
  await new Promise(resolve => setTimeout(resolve, 100));

  // ✅ Now initialize scripts safely
  console.log('🧩 All partials + menu loaded. Initializing...');

  initMain();

  if (document.getElementById('mobile-menu')) {
    initMenu();
  } else {
    console.warn('⚠️ Skipping initMenu(): #mobile-menu not found in DOM');
  }
});
