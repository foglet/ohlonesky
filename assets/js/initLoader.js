import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const timestamp = `?v=${Date.now()}`;
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  injectCSS([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, timestamp);

  await loadPartials('[include-html]', timestamp);

  // Initialize app-specific JS after partials are fully loaded
  requestAnimationFrame(() => {
    initMenu();  // 🍔 mobile menu toggle logic
    initMain();  // 🔧 additional page logic
  });
})();

/**
 * Dynamically injects CSS <link> tags with cache busting.
 */
function injectCSS(files, prefix, timestamp) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${timestamp}`;
    document.head.appendChild(link);
  });
}

/**
 * Loads all HTML partials marked with a specific selector.
 */
async function loadPartials(selector, timestamp) {
  const partials = document.querySelectorAll(selector);
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    if (!file) return;

    try {
      const res = await fetch(`${file}${timestamp}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Error loading partial: ${file}`, err);
    }
  }));
}
