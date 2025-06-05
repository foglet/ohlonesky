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
  const IS_DEV =
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1';

  const version = IS_DEV
    ? '?v=dev'
    : `?v=${typeof BUILD_VERSION !== 'undefined' ? BUILD_VERSION : '1.0.0'}`;

  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  // ✅ Inject CSS
  ['assets/css/output.css', 'assets/css/hero.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${version}`;
    document.head.appendChild(link);
  });

  // ✅ Load HTML partials
  const partials = document.querySelectorAll('[include-html]');
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}${version}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error('🚫 Error loading partial:', err);
    }
  }));

  // 🧩 Optional: Confirm that HTML was injected
  console.log('🧩 Verifying include-html elements...');
  [...document.querySelectorAll('[include-html]')].forEach(el => {
    console.log('→ innerHTML length:', el.innerHTML.length);
  });

  // ✅ Wait for menu elements to appear
  try {
    console.log('⏳ Waiting for menu elements to exist...');
    await Promise.all([
      waitForElement('#menuToggle'),
      waitForElement('#mobile-menu'),
      waitForElement('#menuBackdrop')
    ]);
    console.log('✅ All menu elements found. Initializing...');
    initMain();
    initMenu();
  } catch (err) {
    console.error('❌ Menu elements not found in time:', err.message);
  }
});
