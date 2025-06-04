import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  injectStyles(['assets/css/output.css', 'assets/css/hero.css'], prefix, version);

  await injectPartials('[include-html]', prefix, version);

  // Now that partials are injected, guarantee initMenu runs when ready
  waitForElement('#menuToggle', () => {
    console.log('✅ #menuToggle found — initializing menu');
    initMenu();
  }, 3000);

  initMain(); // Optional: rest of your app init
})();

// Inject CSS dynamically
function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

// Inject HTML partials by include-html attribute
async function injectPartials(selector, prefix, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Injecting ${nodes.length} partial(s)`);

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
      console.log(`✅ Injected ${url}`);
    } catch (err) {
      node.innerHTML = `<!-- Failed to load ${url} -->`;
      console.error(`❌ Error loading ${url}:`, err);
    }
  }));
}

// Wait for element to appear
function waitForElement(selector, callback, timeout = 3000) {
  const existing = document.querySelector(selector);
  if (existing) return callback(existing);

  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect();
      callback(el);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), timeout);
}
