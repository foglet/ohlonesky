import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const partials = document.querySelectorAll('[include-html]');
  const timestamp = `?v=${Date.now()}`;

  // === Load HTML partials ===
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}${timestamp}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.warn('⚠️ Could not load partial:', file, err);
    }
  }));

  // === Inject CSS after partials ===
  injectCSSAssets(timestamp);

  // === Initialize modules after layout is ready ===
  requestAnimationFrame(() => {
    initMain();
    if (document.getElementById('mobileMenu')) initMenu();
  });
});

// === Dynamically inject stylesheets ===
function injectCSSAssets(version) {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  ['assets/css/output.css', 'assets/css/hero.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });

  console.log('🎨 CSS injected after partials');
}
