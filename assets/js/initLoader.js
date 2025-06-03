import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  await injectPartials('[include-html]', prefix, version);

  // 🔁 Retry menu init until elements are found
  waitForElement('#menuToggle', () => {
    console.log('✅ menuToggle found');
    initMenu(); // init after header has been inserted
  }, 3000);

  initMain();
})();

function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

async function injectPartials(selector, prefix, version) {
  const nodes = document.querySelectorAll(selector);
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
      node.innerHTML = `<!-- Failed to load ${url} -->`;
    }
  }));
}

// Waits for element and runs callback
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
