// /assets/js/initLoader.js
import { initMain } from '/assets/js/mainInit.js';

document.addEventListener('DOMContentLoaded', async () => {
  const partials = document.querySelectorAll('[include-html]');

  await Promise.all([...partials].map(async (el) => {
    const file = el.getAttribute('include-html');
    const res = await fetch(file);
    el.innerHTML = res.ok ? await res.text() : `<!-- failed to load ${file} -->`;
  }));

  // Optional: update nav links
  const base = window.location.pathname.includes('/00/') ? './' : '00/';
  document.querySelectorAll('#dynamicNav a[data-path]').forEach((link) => {
    const target = link.getAttribute('data-path');
    link.setAttribute('href', `${base}${target}`);
  });
  document.querySelector('#homeLink')?.setAttribute('href', `${base}`);

  initMain();
});
