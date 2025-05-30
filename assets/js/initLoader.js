import { initMain } from '/assets/js/mainInit.js';
import { initAccordion } from '/assets/js/initAccordion.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

window.addEventListener("unhandledrejection", (event) => {
  console.error("🚨 Unhandled promise rejection:", event.reason);
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log('📦 DOMContentLoaded');

  // 🔍 Load HTML partials
  const partials = document.querySelectorAll('[include-html]');
  console.log(`🔍 Found ${partials.length} partial(s) to load`);

  const promises = [...partials].map(async (el) => {
    const file = el.getAttribute('include-html');
    try {
      const res = await fetch(`${file}?v=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
      console.log(`✅ Loaded: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to load ${file}:`, err);
      el.innerHTML = `<!-- Failed to load ${file} -->`;

      if (file.includes('mobile-menu.html')) {
        console.warn('🚫 Mobile menu partial failed to load or was omitted.');
      }
    }
  });

  await Promise.allSettled(promises);
  await new Promise(requestAnimationFrame); // let DOM update

  // ✅ Initialize mobile menu if it exists
  const menuEl = document.getElementById('mobileMenu');
  if (menuEl) {
    console.log("🔎 Found #mobileMenu");
    initMenu(); // use default config
  } else {
    console.log("ℹ️ No mobile menu found on this page.");
  }

  try {
    initMain();
    console.log("✅ initMain initialized");
  } catch (err) {
    console.error("❌ initMain() failed:", err);
  }

  console.log('🎉 initLoader complete');
});
