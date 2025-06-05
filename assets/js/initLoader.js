import { initMain } from '/assets/js/mainInit.js';

window.initMenu = waitForAndInitMenu;

(async function initApp() {
  const version = `?v=${Date.now()}`;

  injectStyles([
    '/assets/css/output.css',
    '/assets/css/hero.css',
  ], version);

  await injectPartials('[include-html]', version);
  await waitForAndInitMenu();
  initMain();
})();

// Inject CSS files with version query to prevent caching
function injectStyles(files, version) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${file}${version}`;
    document.head.appendChild(link);
  });
}

// Inject HTML partials from include-html attributes
async function injectPartials(selector, version) {
  const nodes = document.querySelectorAll(selector);
  if (!nodes.length) return;

  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Missing include-html attribute:', node);
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

// Wait for menu elements to exist, then initialize toggling logic
async function waitForAndInitMenu(maxTries = 20, interval = 200) {
  for (let i = 0; i < maxTries; i++) {
    const btn = document.getElementById('menuToggle');
    const menu = document.getElementById('mobile-menu');
    const gondola = document.getElementById('gondola');

    if (btn && menu) {
      console.log('✅ Menu elements found');

      // Fade in gondola after load
      if (gondola) {
        gondola.style.transition = 'opacity 500ms ease';
        gondola.style.opacity = '1';
      }

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        const willOpen = !expanded;

        btn.setAttribute('aria-expanded', willOpen);
        btn.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden', willOpen);

        if (willOpen) {
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

        if (gondola) {
          gondola.style.opacity = willOpen ? '0' : '1';
        }
      });

      return;
    }

    await new Promise(resolve => setTimeout(resolve, interval));
  }

  console.warn('⚠️ Menu elements not found after retrying');
}
