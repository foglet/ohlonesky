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
    }
  });

  // 🔹 Wait for all dynamic modules, even if some fail
  await Promise.allSettled(promises);
  console.log('✅ All partials settled');

  // 🔹 Wait one animation frame for DOM update
  await new Promise(requestAnimationFrame);

  // ✅ Initialize menu if element exists
  const menuEl = document.querySelector('#mobileMenu');
  if (menuEl) {
    console.log("🔎 mobileMenu found:", true);
    initMenu(); // ← YOUR BINDING HAPPENS HERE
    console.log("✅ initMenu initialized");
  } else {
    console.warn("⚠️ mobileMenu not found. Skipping initMenu.");
  }

  // ✅ Initialize other scripts
  try {
    initMain();
    console.log("✅ initMain initialized");
  } catch (err) {
    console.error("❌ initMain() failed:", err);
  }

  console.log('🎉 initLoader complete');
});
