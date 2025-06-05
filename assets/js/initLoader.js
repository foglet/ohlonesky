import { initMain } from '/assets/js/mainInit.js';

// 👇 Expose for debugging
window.initMenu = waitForAndInitMenu;

(async function initApp() {
  const version = `?v=${Date.now()}`;

  injectStyles([
    '/assets/css/output.css',
    '/assets/css/hero.css'
  ], version);

  await injectPartials('[include-html]', version);
  await waitForAndInitMenu();
  setupScrollAwareHeader();
  initMain();
})();

// 🔹 Dynamically inject stylesheets
function injectStyles(files, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${file}${version}`;
    document.head.appendChild(link);
  });
}

// 🔹 Inject HTML partials
async function injectPartials(selector, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) return console.warn('⚠️ Missing include-html:', node);

    const url = `${file}${version}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      node.insertAdjacentHTML('afterend', html);
      node.remove();
      console.log(`✅ Injected: ${url}`);
    } catch (err) {
      node.innerHTML = `<!-- Failed to load ${url} -->`;
      console.error(`❌ Could not inject ${url}`, err);
    }
  }));
}

// 🔹 Attach event listener to mobile menu toggle
async function waitForAndInitMenu(maxTries = 20, interval = 200) {
  for (let i = 0; i < maxTries; i++) {
    const btn = document.getElementById('menuToggle');
    const menu = document.getElementById('mobile-menu');
    const gondola = document.getElementById('gondola');

    if (btn && menu) {
      console.log('✅ Mobile menu elements found');

      // Prepare gondola fade animation
      if (gondola) {
        gondola.style.transition = 'opacity 500ms ease';
        gondola.style.opacity = '1';
      }

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        menu.classList.toggle('hidden');

        // 🔹 Fade gondola
        if (gondola) {
          gondola.style.opacity = expanded ? '1' : '0';
        }

        // 🔹 Prevent scroll
        document.body.classList.toggle('overflow-hidden', !expanded);

        // 🔹 Ensure visibility
        menu.style.opacity = '1';
      });

      return;
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }

  console.warn('⚠️ Mobile menu elements not found after retries');
}

// 🔹 Scroll-aware header
function setupScrollAwareHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  let lastY = window.scrollY;
  let ticking = false;
  let scrollTimeout;

  function updateHeader() {
    const currentY = window.scrollY;

    if (currentY > lastY && currentY > 50) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      header.style.transform = 'translateY(0)';
    }, 150);
  });

  console.log('🎯 Scroll-aware header initialized');
}
