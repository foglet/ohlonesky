import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = getPathDepth();
  const prefix = '../'.repeat(depth);

  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  // 🔄 Load HTML partials and wait for them to finish
  await loadPartials('[include-html]', version);

  // ✅ Confirm menuToggle exists before initializing
  requestAnimationFrame(() => {
    const toggle = document.getElementById('menuToggle');
    if (!toggle) {
      console.warn('⛔ Skipping initMenu — #menuToggle not found in DOM');
    } else {
      console.log('✅ #menuToggle found — calling initMenu()');
      initMenu();
    }

    initMain(); // 💡 Still safe to run general logic
  });
})();

/**
 * Returns how deep the current page is in the directory structure.
 */
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

/**
 * Injects external CSS files with version cache-busting.
 */
function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

/**
 * Loads all HTML partials marked with [include-html].
 */
async function loadPartials(selector, version) {
  const elements = document.querySelectorAll(selector);

  await Promise.all([...elements].map(async el => {
    const file = el.getAttribute('include-html');
    if (!file) return;

    try {
      const res = await fetch(`${file}${version}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
      console.log(`✅ Loaded partial: ${file}`);
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Could not load partial: ${file}`, err);
    }
  }));
}
