// /assets/js/partialLoader.js

async function injectPartials(selector = '[include-html]') {
  const nodes = document.querySelectorAll(selector);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) {
      console.warn('⚠️ Missing include-html attribute on node:', node);
      return;
    }

    try {
      const response = await fetch(file);
      const html = await response.text();

      // Inject safely using a temporary container
      const temp = document.createElement('div');
      temp.innerHTML = html;

      // Replace original node with parsed content
      node.replaceWith(...temp.childNodes);
    } catch (err) {
      console.error(`❌ Failed to load partial: ${file}`, err);
    }
  }));

  // ✅ Re-initialize Alpine (after partials loaded)
  if (window.Alpine && typeof Alpine.initTree === 'function') {
    Alpine.initTree(document.body);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectPartials('[include-html]');
});
