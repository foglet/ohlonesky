// initLoader.js
import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const timestamp = `?v=${Date.now()}`;
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);

  // ✅ Inject CSS into <head> dynamically
  ['assets/css/output.css', 'assets/css/hero.css'].forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}${timestamp}`;
    document.head.appendChild(link);
  });

  // ✅ Load HTML partials
  const partials = document.querySelectorAll('[include-html]');
  await Promise.all([...partials].map(async el => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}${timestamp}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.warn('⚠️ Could not load partial:', file, err);
    }
  }));

  // ✅ After layout is ready
  requestAnimationFrame(() => {
    initMain();

    const requiredMenuIds = ['menuToggle', 'mobileMenu', 'menuBackdrop', 'closeMenu'];
    const hasAllMenuElements = requiredMenuIds.every(id => document.getElementById(id));

    if (hasAllMenuElements) {
      initMenu();
      console.log('✅ initMenu loaded successfully');
    } else {
      console.warn('⚠️ initMenu skipped: missing element(s)', requiredMenuIds.filter(id => !document.getElementById(id)));
    }

    // ✅ Fade in main content
    document.getElementById('pageContent')?.classList.remove('opacity-0');
  });
});
