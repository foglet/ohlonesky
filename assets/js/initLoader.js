console.log('🚀 initLoader.js started');
console.log('🧪 INIT START', window.location.pathname, Date.now());

import { initMain } from '/assets/js/mainInit.js';

// Load menuOverlay for Alpine.js
(async () => {
  const module = await import('/assets/js/menuOverlay.js');
  window.menuOverlay = module.menuOverlay;
})();

(async function initApp() {
  try {
    const version = `?v=${Date.now()}`;

    injectStyles([
      '/assets/css/output.css',
      '/assets/css/hero.css'
    ], version);

    await injectPartials('[include-html]', version);

    // Wait for DOM to settle after injection
    setTimeout(() => {
      setupScrollAwareHeader();
      initMain();

      // Alpine.js will handle menu initialization

      if (typeof window.initFlowbite === 'function') {
        try {
          window.initFlowbite();
          console.log('💡 Flowbite initialized');
        } catch (err) {
          console.warn('⚠️ Flowbite init failed:', err);
        }
      }
    }, 0);

    
    await new Promise(r => setTimeout(r, 500)); // Optional delay
  } catch (err) {
    console.error('❌ initApp() failed:', err);
  }
})();

// ─────────────────────────────────────────────────────────
// 🎨 Inject Tailwind CSS dynamically
function injectStyles(files, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${file}${version}`;
    document.head.appendChild(link);
  });
}

// ─────────────────────────────────────────────────────────
// 🧩 Inject partials like header/footer
async function injectPartials(selector, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Missing include-html:', node);
      return;
    }

    const url = `${file}${version}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.insertAdjacentHTML('afterend', html);
      node.remove();
      console.log(`✅ Injected partial: ${url}`);
    } catch (err) {
      node.innerHTML = `<!-- Failed to load ${url} -->`;
      console.error(`❌ Error injecting ${url}`, err);
    }
  }));
}

// ─────────────────────────────────────────────────────────
// Menu initialization removed - handled by Alpine.js menuOverlay

// ─────────────────────────────────────────────────────────
// 🎯 Sticky header scroll behavior
function setupScrollAwareHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  let restoreTimeout;

  function updateHeader() {
    const currentY = window.scrollY;
    const goingDown = currentY > lastY && currentY > 50;

    header.style.transform = goingDown ? 'translateY(-100%)' : 'translateY(0)';
    header.style.pointerEvents = goingDown ? 'none' : 'auto';

    lastY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }

    clearTimeout(restoreTimeout);
    restoreTimeout = setTimeout(() => {
      header.style.transform = 'translateY(0)';
      header.style.pointerEvents = 'auto';
    }, 150);
  });

  console.log('🎯 Header scroll detection enabled');
}
