// assets/js/initLoader.js

import { initMain } from '/assets/js/mainInit.js';
// import { initDarkToggle } from '/assets/js/darkToggle.js'; // removed if dark mode is no longer used

window.addEventListener("unhandledrejection", (event) => {
  console.error("🚨 Unhandled promise rejection:", event.reason);
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log('📦 DOMContentLoaded');

  const partials = document.querySelectorAll('[include-html]');
  console.log(`🔍 Found ${partials.length} partial(s) to load`);

  await Promise.all([...partials].map(async (el) => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
      console.log(`✅ Loaded: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to load ${file}:`, err);
      el.innerHTML = `<!-- Failed to load ${file} -->`;
    }
  }));

  // Update nav link paths
  try {
    const base = window.location.pathname.includes('/00/') ? './' : '00/';
    const navLinks = document.querySelectorAll('#dynamicNav a[data-path]');
    console.log(`🔗 Updating ${navLinks.length} nav link(s)`);

    navLinks.forEach((link) => {
      const target = link.getAttribute('data-path');
      const href = target.endsWith('/') ? `${base}${target}index.html` : `${base}${target}.html`;
      link.setAttribute('href', href);
    });

    const homeLink = document.querySelector('#homeLink');
    if (homeLink) {
      homeLink.setAttribute('href', `${base}`);
      console.log('🏠 Home link updated');
    } else {
      console.warn('⚠️ #homeLink not found');
    }
  } catch (navErr) {
    console.error('❌ Navigation path error:', navErr);
  }

  // ✅ Re-import Flowbite to activate accordions after dynamic partials
  try {
    await import('https://unpkg.com/flowbite@1.6.5/dist/flowbite.min.js');
    console.log('✅ Flowbite re-imported for dynamic content');
  } catch (flowErr) {
    console.error('❌ Failed to load Flowbite dynamically:', flowErr);
  }

  // ✅ Init custom app logic
  try {
    console.log('🧩 initMain()...');
    initMain();
  } catch (err) {
    console.error('❌ initMain() failed:', err);
  }

  console.log('🎉 initLoader complete');
});
