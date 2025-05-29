import { initDarkToggle } from '/assets/js/darkToggle.js';

window.addEventListener("load", async () => {
  const partials = document.querySelectorAll('[include-html]');

  await Promise.all([...partials].map(async (el) => {
    const file = el.getAttribute('include-html');
    const res = await fetch(file);
    el.innerHTML = res.ok ? await res.text() : `<!-- failed to load ${file} -->`;
  }));

  // Adjust base hrefs
  const base = window.location.pathname.includes('/00/') ? './' : '00/';
  document.querySelectorAll('#dynamicNav a[data-path]').forEach((link) => {
    const target = link.getAttribute('data-path');
    const href = target.endsWith('/') ? `${base}${target}index.html` : `${base}${target}.html`;
    link.setAttribute('href', href);
  });

  document.querySelector('#homeLink')?.setAttribute('href', `${base}`);

  initMain();
  initDarkToggle(); // ✅ ensures dark toggle works after button loads
});
