console.log('🚀 partialLoader.js is running');

async function injectPartials(selector = '[include-html]') {
  const nodes = document.querySelectorAll(selector);
  console.log(`🧩 Found ${nodes.length} partial(s)`);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Missing include-html attribute:', node);
      return;
    }

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      node.replaceWith(...temp.childNodes);
      console.log(`✅ Injected: ${file}`);
    } catch (err) {
      console.error(`❌ Failed to inject ${file}:`, err);
    }
  }));
}

document.addEventListener('DOMContentLoaded', async () => {
  await injectPartials();

  // ✅ Reinitialize Alpine only after all partials are in the DOM
  if (window.Alpine && typeof Alpine.initTree === 'function') {
    console.log('🌿 Reinitializing Alpine...');
    Alpine.initTree(document.body);
  } else {
    console.warn('⚠️ Alpine not found or not ready');
  }
});
