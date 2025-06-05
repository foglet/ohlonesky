import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

// 🔍 Utility: Wait until a DOM element is present or timeout
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

  // ✅ Load HTML partials
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
        console.log('📦 Partial preview:', html.slice(0, 400));
      }
    } catch (err) {
      el.innerHTML = `
        <div style="color:red; font-weight:bold; padding:1rem;">
          ⚠️ Failed to load: ${file}
        </div>`;
      console.error('🚫 Error loading partial:', err);
    }
  }));

  // ✅ Wait for all critical menu elements before initializing
  try {
    console.log('⏳ Waiting for #menuToggle, #mobile-menu, #menuBackdrop...');
    await Promise.all([
      waitForElement('#menuToggle'),
      waitForElement('#mobile-menu'),
      waitForElement('#menuBackdrop')
    ]);

    console.log('✅ All elements found. Initializing...');
    initMain();
    initMenu();
  } catch (err) {
    console.error('❌ Initialization failed:', err.message);
  }
});
