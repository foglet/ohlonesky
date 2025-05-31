(function loadCSSAssets() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  const prefix = '../'.repeat(depth);
  const stylesheets = [
    'assets/css/output.css',
    'assets/css/hero.css'
  ];

  stylesheets.forEach((file) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${prefix}${file}`;
    document.head.appendChild(link);
  });
})();
