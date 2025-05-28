import { initMain } from '/assets/js/mainInit.js';

document.addEventListener("DOMContentLoaded", async () => {
  const partials = document.querySelectorAll('[include-html]');

  // Load partials in parallel
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

  // Set homepage link
  document.querySelector('#homeLink')?.setAttribute('href', `${base}`);

  // Final site init logic
  initMain();
});
