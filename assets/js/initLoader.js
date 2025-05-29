// assets/js/initLoader.js

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

  await Promise.all([...partials].map(async (el) => {
    const file = el.getAttribute('include-html');
    try {
      // ⭐ Cache busting query param to force fresh fetch
      const res = await fetch(`${file}?v=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.innerHTML = await res.text();
      console.log(`✅ Loaded: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to load ${file}:`, err);
      el.innerHTML = `<!-- Failed to load ${file} -->`;
    }
  }));

  // ✅ Initialize accordion logic (requires DOM updated)
  // try {
  //  initAccordion();
  //  console.log("✅ Accordion initialized");
  //} catch (err) {
  //  console.error("❌ initAccordion failed", err);
  // }

  // ✅ Initialize mobile menu (requires menu DOM to exist)
  try {
    initMenu();
    console.log("✅ initMenu initialized");
  } catch (err) {
    console.error("❌ initMenu() failed:", err);
  }

  // ✅ Initialize all remaining app logic
  try {
    initMain();
    console.log("✅ initMain initialized");
  } catch (err) {
    console.error("❌ initMain() failed:", err);
  }

  console.log('🎉 initLoader complete');
});
