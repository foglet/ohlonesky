import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const timestamp = `?v=${Date.now()}`;
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  // ✅ Inject Tailwind CSS files with cache busting
  const cssFiles = ['assets/css/output.css', 'assets/css/hero.css'];
  cssFiles.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${timestamp}`;
    document.head.appendChild(link);
  });

  // ✅ Load HTML partials dynamically
  const partials = document.querySelectorAll('[include-html]');
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}${timestamp}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Failed to load ${file}`, err);
    }
  }));

  // ✅ Initialize JS modules AFTER partials are rendered
  requestAnimationFrame(() => {
    initMenu();  // 🍔 Initialize mobile menu
    initMain();  // 🔧 App-specific logic
  });
});
