import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

document.addEventListener('DOMContentLoaded', async () => {
  const partials = document.querySelectorAll('[include-html]');

  await Promise.all([...partials].map(async el => {
    try {
      const res = await fetch(`${el.getAttribute('include-html')}?v=${Date.now()}`);
      el.innerHTML = await res.text();
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${el.getAttribute('include-html')} -->`;
      console.warn('⚠️ Could not load partial:', err);
    }
  }));

  requestAnimationFrame(() => {
    initMain();
    if (document.getElementById('mobileMenu')) initMenu();
  });
});
