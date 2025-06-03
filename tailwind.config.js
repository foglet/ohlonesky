const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',

  // 📦 Scan for class names in all HTML/JS/CSS partials
  content: [
    './404.html',
    './*.html',
    './**/*.html',
    './assets/**/*.js',
    './assets/css/hero.css',
    './assets/partials/**/*.html',
    '!./node_modules/**/*',
  ],

  // 🛡️ Safelist dynamic classes used in JS or external components (e.g. hamburger)
  safelist: [
    {
      pattern: /^tham(-[\w]+)*$/, // Preserve all Tham hamburger animation classes
    },
    {
      pattern: /^(translate-x|opacity)-\d+$/, // Keep Tailwind transforms and fades
    },
    {
      pattern: /^(transition|duration|ease)-?.*$/, // Transitions & animations
    },
    'hidden',
    'block',
    'z-50',
    'z-1000',
    'md:hidden',
    'opacity-0',
    'opacity-100',
    'translate-x-0',
    'translate-x-full',
    'tham-active'
  ],

  // 🎨 Extend default theme
  theme: {
    extend: {
      colors: {
        brandDark: '#1d2834',
        brandSky: '#0f172a',
        stormSky: '#374151',
        warmRed: '#F54029',
        highlight: '#FF5500',
        neutralText: '#636363',
      },
      fontFamily: {
        adobe: ['freight-sans-pro', 'sans-serif'],
      },
    },
  },

  // 🔌 Plugins: Typography, Forms, and Fluid Type Utilities
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fluid-sm': { fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' },
        '.text-fluid-base': { fontSize: 'clamp(1rem, 3vw, 1.25rem)' },
        '.text-fluid-md': { fontSize: 'clamp(1.25rem, 4vw, 2rem)' },
        '.text-fluid-lg': { fontSize: 'clamp(1.75rem, 6vw, 3rem)' },
        '.text-fluid-xl': { fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' },
      });
    }),
  ],
};
