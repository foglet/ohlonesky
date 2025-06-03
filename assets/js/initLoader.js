import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = getPathDepth();
  const prefix = '../'.repeat(depth);

  // 🚀 Inject CSS files with cache-busting
  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  // 🔄 Load all HTML partials
  await loadPartials('[include-html]', version);

  // ✅ Run initializers after DOM is ready and partials are rendered
  requestAnimationFrame(() => {
    initMenu();
    initMain();
  });
})();

/**
 * Returns how deep the current page is in the directory structure.
 * Example: /00/contact/ = depth 2 → "../../"
 */
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

/**
 * Dynamically injects CSS files into <head> with version cache-busting.
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
 * Loads all elements with an `include-html` attribute.
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
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Could not load ${file}`, err);
    }
  }));
}
