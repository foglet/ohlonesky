import { initMain } from '/assets/js/mainInit.js';
import { initMenu } from '/assets/js/menuBlitzloader.js';

window.initMenu = initMenu; // Expose for manual debugging if needed

(async function initApp() {
  const version = `?v=${Date.now()}`;

  injectStyles([
    '/assets/css/output.css',
    '/assets/css/hero.css'
  ], version);

  await injectPartials('[include-html]', version);

  await waitForMenuElementsAndInit();

  initMain();
  setupScrollAwareHeader();
})();

// 📦 Inject CSS link tags
function injectStyles(paths, version) {
  paths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${path}${version}`;
    document.head.appendChild(link);
  });
}

// 🧩 Replace [include-html] elements with fetched HTML
async function injectPartials(selector, version) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  console.log(`🧩 Found ${elements.length} partial(s)`);

  await Promise.all([...elements].map(async el => {
    const file = el.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Missing include-html attribute:', el);
      return;
    }

    try {
      const url = `${file}${version}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      el.insertAdjacentHTML('afterend', await res.text());
      el.remove();
      console.log(`✅ Injected partial: ${url}`);
    } catch (err) {
      el.innerHTML = `<!-- Failed to load ${file} -->`;
      console.error(`❌ Could not inject ${file}`, err);
    }
  }));
}

// 📱 Wait for all menu elements and initialize menu
async function waitForMenuElementsAndInit(maxTries = 20, interval = 250) {
  for (let i = 0; i < maxTries; i++) {
    const ready = ['menuToggle', 'mobileMenu', 'menuBackdrop', 'closeMenu']
      .map(id => document.getElementById(id))
      .every(Boolean);

    if (ready) {
      console.log('✅ Mobile menu elements loaded');
      initMenu();
      return;
    }

    await new Promise(res => setTimeout(res, interval));
  }

  console.warn('⚠️ Mobile menu elements not found after timeout');
}

// 🔽 Hide on scroll down, show on pause or scroll up
function setupScrollAwareHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;
  let pauseTimeout;

  const handleScroll = () => {
    const currentY = window.scrollY;

    if (currentY > lastScrollY && currentY > 50) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }

    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      header.style.transform = 'translateY(0)';
    }, 150);
  });

  console.log('🎯 Scroll-aware header initialized');
}
