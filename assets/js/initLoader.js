import { initMain } from '/assets/js/mainInit.js';
import { initAccordion } from '/assets/js/initAccordion.js';

window.addEventListener("unhandledrejection", (event) => {
  console.error("🚨 Unhandled promise rejection:", event.reason);
});

document.addEventListener("DOMContentLoaded", async () => {
  console.log('📦 DOMContentLoaded');

  // Load HTML partials
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

  // Init accordion logic — must happen after DOM is updated with partials
  try {
    initAccordion();
    console.log("✅ Accordion initialized");
  } catch (err) {
    console.error("❌ initAccordion() failed:", err);
  }

  // Init main app logic
  try {
    initMain();
    console.log("✅ initMain initialized");
  } catch (err) {
    console.error("❌ initMain() failed:", err);
  }

  console.log('🎉 initLoader complete');
});
