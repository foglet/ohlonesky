import { initMain } from '/assets/js/mainInit.js';

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

// 🔹 Inject CSS files with versioning
function injectStyles(files, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${file}${version}`;
    document.head.appendChild(link);
  });
}

// 🔹 Replace include-html nodes with partials
async function injectPartials(selector, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) return console.warn('⚠️ Missing include-html attribute:', node);

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

// 🔹 Mobile menu toggle + gondola fade
async function waitForAndInitMenu(maxTries = 20, interval = 200) {
  for (let i = 0; i < maxTries; i++) {
    const btn = document.getElementById('menuToggle');
    const menu = document.getElementById('mobile-menu');
    const gondola = document.getElementById('gondola');

    if (btn && menu) {
      console.log('✅ Found mobile menu toggle and panel');

      // Setup initial gondola state
      if (gondola) {
        gondola.style.transition = 'opacity 500ms ease';
        gondola.style.opacity = '1';
      }

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const willOpen = !expanded;

        btn.setAttribute('aria-expanded', willOpen);
        btn.classList.toggle('open');
        menu.classList.toggle('hidden');
        menu.style.opacity = '1';

        // Fade gondola
        if (gondola) {
          gondola.style.opacity = willOpen ? '0' : '1';
        }

        // Prevent background scroll
        document.body.classList.toggle('overflow-hidden', willOpen);
      });

      return;
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }

  console.warn('⚠️ Menu toggle not found after retrying');
}

// 🔹 Show/hide header on scroll
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

  console.log('🎯 Sticky header scroll tracking enabled');
}
