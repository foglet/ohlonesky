import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

function waitForElement(selector, timeout = 4000) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver((_, obs) => {
      const el = document.querySelector(selector);
      if (el) {
        obs.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout: ${selector} not found`));
    }, timeout);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const IS_DEV = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  const version = IS_DEV
    ? '?v=dev'
    : `?v=${typeof BUILD_VERSION !== 'undefined' ? BUILD_VERSION : '1.0.0'}`;

  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  // ✅ Inject CSS
  //  ['assets/css/output.css', 'assets/css/hero.css'].forEach(file => {
  ['/assets/css/output.css', '/assets/css/hero.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });

  // ✅ Load HTML partials and log header content
  const partials = document.querySelectorAll('[include-html]');
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}${version}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();

      el.innerHTML = html;

      if (file.includes('header')) {
        console.log(`🧩 Loaded header partial: ${file}`);
        console.log('📦 Partial content preview:\n', html.slice(0, 800));
      }
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error('🚫 Error loading partial:', err);
    }
  }));

  // ✅ Confirm injection result
  const testEl = document.getElementById('mobile-menu');
  console.log('🔎 Post-injection check: mobile-menu =', testEl);

  // ✅ Wait for critical menu elements
  try {
    console.log('⏳ Waiting for core menu elements...');
    await Promise.all([
      waitForElement('#menuToggle'),
      waitForElement('#mobile-menu'),
      waitForElement('#menuBackdrop')
    ]);
    console.log('✅ All core menu elements found.');

    // 🟢 Proceed with script initialization
    initMain();
    initMenu();
  } catch (err) {
    console.error('❌ Menu setup failed:', err.message);
  }
});
