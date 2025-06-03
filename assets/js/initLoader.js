import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const prefix = '../'.repeat(getPathDepth());

  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  await injectPartials('[include-html]', prefix, version);

  // Wait for #menuToggle (in header.html) to exist before initializing menu
  waitForElement('#menuToggle', () => {
    console.log('✅ #menuToggle found — initializing menu');
    initMenu();
  });

  initMain();
})();

// Get current path depth (e.g. /00/contact/ → 2)
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

// Inject CSS <link> tags
function injectStyles(files, prefix, version) {
  for (const file of files) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  }
}

// Load HTML into elements with [include-html]
async function injectPartials(selector, prefix, version) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  console.log(`🧩 Found ${elements.length} partial(s)`);

  await Promise.all([...elements].map(async el => {
    const file = el.getAttribute('include-html');
    if (!file) return console.warn('⚠️ Missing include-html:', el);

    const url = file.startsWith('/') ? `${file}${version}` : `${prefix}${file}${version}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      el.insertAdjacentHTML('afterend', html);
      el.remove();
      console.log(`✅ Injected: ${url}`);
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${url} -->`;
      console.error(`❌ Error loading partial: ${url}`, err);
    }
  }));
}

// Observe DOM for element until found (then run callback)
function waitForElement(selector, callback, timeout = 5000) {
  const existing = document.querySelector(selector);
  if (existing) return callback(existing);

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
