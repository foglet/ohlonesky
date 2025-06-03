const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',

  // 🔍 Scan these files for class names to include in the build
  content: [
    './404.html',
    './*.html',
    './**/*.html',
    './assets/**/*.js',
    './assets/css/hero.css',
    './assets/partials/**/*.html',
    '!./node_modules/**/*',
  ],

  // 🔐 Prevent purging of dynamically-used classes (like menu transitions)
  safelist: [
    'hidden',
    'translate-x-full',
    'translate-x-0',
    'opacity-0',
    'opacity-100',
    'tham-active',
    'transition-all',
    'duration-300',
    'ease-in-out'
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
