const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',

  content: [
    './*.html',                  // All root-level HTML files
    './**/*.html',               // All nested HTML (includes /00/)
    './assets/**/*.js',          // All JS files using class names
    './assets/css/**/*.css',     // All custom CSS (hero.css, etc.)
    './assets/partials/**/*.html', // Partials like header.html
    '!./node_modules/**/*',      // Ignore node_modules
  ],

  safelist: [
    // Transition + Visibility
    'hidden',
    'block',
    'opacity-0',
    'opacity-100',
    'translate-x-full',
    'translate-x-0',
    'transition-all',
    'duration-300',
    'ease-in-out',

    // z-index levels for menu layers
    'z-40',
    'z-50',
    'z-1000',

    // Tham hamburger animation support
    'tham',
    'tham-inner',
    'tham-box',
    'tham-e-squeeze',
    'tham-active',

    // Optional: mobile nav text sizing
    'text-lg',
    'text-2xl',
  ],

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

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),

    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fluid-sm': {
          fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
        },
        '.text-fluid-base': {
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
        },
        '.text-fluid-md': {
          fontSize: 'clamp(1.25rem, 4vw, 2rem)',
        },
        '.text-fluid-lg': {
          fontSize: 'clamp(1.75rem, 6vw, 3rem)',
        },
        '.text-fluid-xl': {
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
        },
      });
    }),
  ],
};
