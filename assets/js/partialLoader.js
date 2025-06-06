async function injectPartials(selector = '[include-html]') {
  const nodes = document.querySelectorAll(selector);

  await Promise.all([...nodes].map(async node => {
    const file = node.getAttribute('include-html');
    if (!file) return;

    try {
      const response = await fetch(file);
      const html = await response.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      node.replaceWith(...temp.childNodes);
    } catch (err) {
      console.error(`❌ Failed to load partial: ${file}`, err);
    }
  }));

  console.log('✅ Partials injected');
  return Promise.resolve();
}
