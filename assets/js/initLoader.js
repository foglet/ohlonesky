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

  if (!elements.length) {
    console.warn(`⚠️ No elements found for selector: ${selector}`);
    return;
  }

  console.log(`🧩 Found ${elements.length} element(s) with ${selector}`);

  await Promise.all([...elements].map(async el => {
    const file = el.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Element missing include-html attribute:', el);
      return;
    }

    const url = `${file}${version}`;
    console.log(`🔄 Fetching: ${url}`);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const html = await res.text();
      el.insertAdjacentHTML('afterend', html); // ✅ safer than outerHTML
      el.remove(); // ✅ clean up original
      console.log(`✅ Injected ${file}`);
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Could not load partial: ${file}`, err);
    }
  }));
}
