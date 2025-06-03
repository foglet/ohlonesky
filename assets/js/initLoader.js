// initLoader.js
import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = getPathDepth();
  const prefix = '../'.repeat(depth);

  // ✅ Inject global styles
  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  // ✅ Inject HTML partials (header, footer, etc)
  await injectPartials('[include-html]', prefix, version);

  // ✅ Wait for all necessary menu elements to exist
  waitForAllElements(['#menuToggle', '#mobileMenu', '#menuBackdrop'], ([toggle, menu, backdrop]) => {
    console.log('✅ All menu elements found — initializing menu');
    initMenu();
  }, 5000);

  // ✅ Run remaining scripts (non-critical)
  initMain();
})();

// 📏 Determine page depth for relative asset prefixing
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

// 🎨 Inject CSS <link> tags into <head>
function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

// 🧩 Replace [include-html] elements with fetched HTML
async function injectPartials(selector, prefix, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Skipping node with missing include-html:', node);
      return;
    }

    const url = file.startsWith('/')
      ? `${file}${version}`
      : `${prefix}${file}${version}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.insertAdjacentHTML('afterend', html);
      node.remove();
      console.log(`✅ Injected: ${url}`);
    } catch (err) {
      node.innerHTML = `<!-- Failed to load ${url} -->`;
      console.error(`❌ Failed to inject: ${url}`, err);
    }
  }));
}

// ⏳ Wait until ALL specified elements appear in DOM
function waitForAllElements(selectors, callback, timeout = 3000) {
  const found = selectors.map(sel => document.querySelector(sel));
  if (found.every(Boolean)) {
    callback(found);
    return;
  }

  const observer = new MutationObserver(() => {
    const updated = selectors.map(sel => document.querySelector(sel));
    if (updated.every(Boolean)) {
      observer.disconnect();
      callback(updated);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), timeout);
}
