import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = getPathDepth();
  const prefix = '../'.repeat(depth);

  // Inject styles immediately
  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  // Inject all partials before continuing
  await injectPartials('[include-html]', prefix, version);

  console.log('✅ All partials injected. Checking for menuToggle...');

  // Ensure #menuToggle is in the DOM before calling initMenu
  waitForElement('#menuToggle', () => {
    console.log('✅ #menuToggle found — initializing menu...');
    initMenu(); // safely call it now
  }, 5000);

  // Run any remaining page logic
  initMain();
})();

// Determine URL depth for prefix
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

// Inject styles
function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

// Inject HTML partials
async function injectPartials(selector, prefix, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) return;

    const url = file.startsWith('/')
      ? `${file}${version}`
      : `${prefix}${file}${version}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.insertAdjacentHTML('afterend', html);
      node.remove();
      console.log(`✅ Injected partial: ${url}`);
    } catch (err) {
      console.error(`❌ Failed to inject ${url}`, err);
      node.innerHTML = `<!-- Failed to load ${url} -->`;
    }
  }));
}

// Wait for a specific element to appear in the DOM
function waitForElement(selector, callback, timeout = 3000) {
  const found = document.querySelector(selector);
  if (found) {
    callback(found);
    return;
  }

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => {
    observer.disconnect();
    console.warn(`⏱️ Timeout waiting for ${selector}`);
  }, timeout);
}
