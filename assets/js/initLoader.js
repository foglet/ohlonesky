import { initMain } from '/assets/js/mainInit.js';
import { initDarkToggle } from '/assets/js/darkToggle.js';

document.addEventListener("DOMContentLoaded", async () => {
  const partials = document.querySelectorAll('[include-html]');

  // Load all HTML partials
  await Promise.all([...partials].map(async (el) => {
    const file = el.getAttribute('include-html');
    const res = await fetch(file);
    el.innerHTML = res.ok ? await res.text() : `<!-- failed to load ${file} -->`;
  }));

  // Adjust nav links based on directory
  const base = window.location.pathname.includes('/00/') ? './' : '00/';
  document.querySelectorAll('#dynamicNav a[data-path]').forEach((link) => {
    const target = link.getAttribute('data-path');
    const href = target.endsWith('/') ? `${base}${target}index.html` : `${base}${target}.html`;
    link.setAttribute('href', href);
  });

  document.querySelector('#homeLink')?.setAttribute('href', `${base}`);

  // Initialize other scripts
  initMain();
  initDarkToggle(); // ✅ initialize dark mode toggle AFTER partials are loaded
});
