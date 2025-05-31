const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './404.html',               // ✅ explicitly needed!
    './*.html',                 // covers root-level files
    './**/*.html',              // catches all nested pages
    './assets/**/*.js',         // for class names in JS
    './assets/css/hero.css',    // for @apply to work
    './assets/partials/**/*.html', //trigger rebuild again and again.

  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#1d2834',
        brandSky: '#0f172a',
        stormSky: '#374151',
        warmRed: '#F54029',
        highlight: '#FFF',
        neutralText: '#636363',
      },
      fontFamily: {
        adobe: ['freight-sans-pro', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fluid-sm': {
          fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', // 14–18px
        },
        '.text-fluid-base': {
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',      // 16–20px
        },
        '.text-fluid-md': {
          fontSize: 'clamp(1.25rem, 4vw, 2rem)',       // 20–32px
        },
        '.text-fluid-lg': {
          fontSize: 'clamp(1.75rem, 6vw, 3rem)',       // 28–48px
        },
        '.text-fluid-xl': {
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',      // 40–72px
        },
      });
    }),
  ],
};
