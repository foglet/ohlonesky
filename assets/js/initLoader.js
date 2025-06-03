import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

(async function initApp() {
  const version = `?v=${Date.now()}`;
  const depth = getPathDepth();
  const prefix = '../'.repeat(depth);

  // ✅ Inject CSS styles with versioning
  injectStyles([
    'assets/css/output.css',
    'assets/css/hero.css'
  ], prefix, version);

  // ✅ Load all [include-html] partials first
  await loadPartials('[include-html]', version);

  // ✅ Once DOM is hydrated, initialize mobile menu if present
  waitForElement('#menuToggle', () => {
    console.log('✅ #menuToggle found — calling initMenu()');
    initMenu();
  });

  // ✅ Always run page-specific logic
  initMain();
})();

// 📏 How deep is the current path?
function getPathDepth() {
  return window.location.pathname.split('/').filter(Boolean).length;
}

// 🎨 Dynamically inject stylesheets into <head>
function injectStyles(files, prefix, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });
}

// 🧩 Replace <div include-html="..."> with fetched content
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
      el.insertAdjacentHTML('afterend', html);
      el.remove();
      console.log(`✅ Injected ${file}`);
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Could not load partial: ${file}`, err);
    }
  }));
}

// 👀 Wait for element to appear in DOM
function waitForElement(selector, callback, timeout = 3000) {
  const el = document.querySelector(selector);
  if (el) {
    callback(el);
    return;
  }

  const observer = new MutationObserver(() => {
    const target = document.querySelector(selector);
    if (target) {
      observer.disconnect();
      callback(target);
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Optional: kill observer after timeout
  setTimeout(() => observer.disconnect(), timeout);
}
