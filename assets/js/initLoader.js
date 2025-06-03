import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = getPathDepth();
  const prefix = '../'.repeat(depth);

  // Inject global styles
  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  // Inject HTML partials
  await injectPartials('[include-html]', prefix, version);

  // Wait for the menu toggle only after partials are injected
  waitForElement('#menuToggle', () => {
    console.log('✅ #menuToggle found — initializing menu');
    initMenu();
  }, 5000);

  // Run any remaining logic
  initMain();
})();

// 🧭 Determines page depth for relative asset calculation
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

// 🎨 Injects <link> tags into <head>
function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

// 🧩 Replaces elements with include-html attr with fetched partials
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
      ? `${file}${version}`         // absolute path — use as-is
      : `${prefix}${file}${version}`; // relative path — add prefix

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

// ⏳ Waits for an element to appear in the DOM
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
