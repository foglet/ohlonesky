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

  await injectPartials('[include-html]', version);

  waitForElement('#menuToggle', () => {
    console.log('✅ #menuToggle found — initializing menu');
    initMenu();
  });

  initMain();
})();

// 🧭 Determines path depth (for prefixing asset URLs)
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

// 🎨 Injects CSS <link> tags into <head>
function injectStyles(files, prefix, version) {
  for (const file of files) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  }
}

// 🧩 Loads HTML partials into matching elements
async function injectPartials(selector, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Missing include-html attribute:', node);
      return;
    }

    const url = `${file}${version}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.insertAdjacentHTML('afterend', html);
      node.remove();
      console.log(`✅ Injected: ${file}`);
    } catch (err) {
      node.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Failed to inject: ${file}`, err);
    }
  }));
}

// ⏳ Waits for an element to appear before running a callback
function waitForElement(selector, callback, timeout = 3000) {
  const existing = document.querySelector(selector);
  if (existing) {
    callback(existing);
    return;
  }

  const observer = new MutationObserver(() => {
    const found = document.querySelector(selector);
    if (found) {
      observer.disconnect();
      callback(found);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), timeout);
}
