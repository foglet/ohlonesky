import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  // Inject CSS
  ['assets/css/output.css', 'assets/css/hero.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });

  // Load HTML partials
  await injectPartials('[include-html]', prefix, version);

  // Now wait for ALL required elements
  waitForElements(['#menuToggle', '#mobileMenu', '#menuBackdrop'], () => {
    console.log('✅ All menu elements loaded');
    initMenu(); // Safe to init now
  });

  initMain(); // Other page logic
})();

// Inject HTML partials
async function injectPartials(selector, prefix, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    const url = file.startsWith('/') ? `${file}${version}` : `${prefix}${file}${version}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.insertAdjacentHTML('afterend', html);
      node.remove();
    } catch (err) {
      console.error(`❌ Failed to load ${url}`, err);
    }
  }));
}

// Wait for multiple elements to exist before firing callback
function waitForElements(selectors, callback, timeout = 3000) {
  const allExist = () => selectors.every(sel => document.querySelector(sel));

  if (allExist()) {
    callback();
    return;
  }

  const observer = new MutationObserver(() => {
    if (allExist()) {
      observer.disconnect();
      callback();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), timeout);
}
