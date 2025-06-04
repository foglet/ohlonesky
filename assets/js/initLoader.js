import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

// 👇 Expose globally for debugging and timing guarantees
window.initMenu = initMenu;

(async function initApp() {
  const version = `?v=${Date.now()}`;

  // 🔹 Inject CSS (non-relative, hardcoded absolute)
  injectStyles([
    '/assets/css/output.css',
    '/assets/css/hero.css'
  ], version);

  // 🔹 Inject all include-html partials
  await injectPartials('[include-html]', version);

  // 🔹 Wait until ALL menu elements are guaranteed in DOM
  await waitForAndInitMenu();

  // 🔹 Run remaining initialization
  initMain();

  // 🔹 Scroll-aware header behavior
  setupScrollAwareHeader();
})();

// 🧠 Injects <link> tags
function injectStyles(files, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${file}${version}`;
    document.head.appendChild(link);
  });
}

// 🧩 Replaces all include-html nodes
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
      console.log(`✅ Injected partial: ${url}`);
    } catch (err) {
      node.innerHTML = `<!-- Failed to load ${url} -->`;
      console.error(`❌ Could not inject ${url}`, err);
    }
  }));
}

// ⏳ Waits for all mobile menu elements, then runs initMenu
async function waitForAndInitMenu(maxTries = 20, interval = 250) {
  for (let i = 0; i < maxTries; i++) {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    const backdrop = document.getElementById('menuBackdrop');
    const close = document.getElementById('closeMenu');

    if (toggle && menu && backdrop && close) {
      console.log('✅ All mobile menu elements loaded');
      initMenu();
      return;
    }

    await new Promise(res => setTimeout(res, interval));
  }

  console.warn('⚠️ Mobile menu elements not found after timeout');
}

// ⬇️ Hide header on scroll down, show on scroll up or pause
function setupScrollAwareHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  let isScrolling;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }

    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      header.style.transform = 'translateY(0)';
    }, 150); // Delay before reappearing
  });

  console.log('🎯 Scroll-aware header initialized');
}
