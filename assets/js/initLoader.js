import { initMain } from '/assets/js/mainInit.js';
import { initAccordion } from '/assets/js/initAccordion.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

window.addEventListener("unhandledrejection", (event) => {
  console.error("🚨 Unhandled promise rejection:", event.reason);
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log('📦 DOMContentLoaded');

  const partials = document.querySelectorAll('[include-html]');
  console.log(`🔍 Found ${partials.length} partial(s)`);

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
        console.warn('🚫 mobile-menu.html failed to load or is missing from this page.');
      }
    }
  });

  await Promise.allSettled(promises);
  await new Promise(requestAnimationFrame); // Let DOM update

  const menuEl = document.getElementById('mobileMenu');
  console.log("🔎 After partials: mobileMenu exists?", !!menuEl);

  if (menuEl) {
    try {
      initMenu();
      console.log("✅ initMenu initialized");
    } catch (err) {
      console.error("❌ initMenu() threw an error:", err);
    }
  } else {
    console.log("ℹ️ No #mobileMenu found — skipping initMenu.");
  }

  try {
    initMain();
    console.log("✅ initMain initialized");
  } catch (err) {
    console.error("❌ initMain() failed:", err);
  }

  console.log('🎉 initLoader complete');
});
