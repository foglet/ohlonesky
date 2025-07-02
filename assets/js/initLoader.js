console.log('🚀 initLoader.js started');
console.log('🧪 INIT START', window.location.pathname, Date.now());

import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

let menuClickHandler = null;
let menuIsInitialized = false;
window.initMenu = waitForAndInitMenu;

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
      waitForAndInitMenu();
      setupScrollAwareHeader();
      initMain();

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
// 🍔 Toggle mobile menu visibility
function toggleMobileMenu({ btn, menu, gondola }) {
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  const nextState = !isOpen;

  btn.setAttribute('aria-expanded', nextState);
  btn.classList.toggle('open', nextState);
  document.body.classList.toggle('overflow-hidden', nextState);

  if (nextState) {
    menu.classList.remove('hidden');
    requestAnimationFrame(() => {
      menu.classList.remove('translate-y-full', 'opacity-0');
      menu.classList.add('translate-y-0', 'opacity-100');
    });
  } else {
    menu.classList.remove('translate-y-0', 'opacity-100');
    menu.classList.add('translate-y-full', 'opacity-0');
    setTimeout(() => menu.classList.add('hidden'), 300);
  }

  if (gondola) gondola.style.opacity = nextState ? '0' : '1';
}

// ─────────────────────────────────────────────────────────
// 🧠 Wait for menu elements and initialize logic
async function waitForAndInitMenu(maxTries = 30, interval = 200) {
  if (menuIsInitialized) return;

  for (let i = 0; i < maxTries; i++) {
    const btn = document.getElementById('menuToggle');
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('menuBackdrop');

    if (btn && menu && backdrop) {
      console.log('✅ Menu DOM ready — binding toggle & init');

      if (menuClickHandler) {
        btn.removeEventListener('click', menuClickHandler);
      }

      const gondola = document.getElementById('gondola');
      menuClickHandler = () => toggleMobileMenu({ btn, menu, gondola });
      btn.addEventListener('click', menuClickHandler);
      btn.__menuBound = true;

      if (gondola) {
        gondola.style.transition = 'opacity 500ms ease';
        gondola.style.opacity = '1';
      }

      // 🧩 Now run menu behavior init from separate module
      initMenu(); // ← handles backdrop clicks, link closing, etc

      menuIsInitialized = true;
      return;
    }

    await new Promise(res => setTimeout(res, interval));
  }

  console.warn('⚠️ Menu toggle not initialized — element(s) missing');
}

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

      const btn = document.getElementById('menuToggle');
      if (btn && !btn.__menuBound) {
        waitForAndInitMenu();
      }
    }, 150);
  });

  console.log('🎯 Header scroll detection enabled');
}
