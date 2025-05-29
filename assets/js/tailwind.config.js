const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './**/*.html',
    './assets/**/*.js',
    './assets/css/hero.css', // ✅ Required for @apply to work in hero.css
  ],
  theme: {
    extend: {
      colors: {
        brandDark: '#1d2834',
        brandSky: '#0f172a',
        stormSky: '#374151',
        warmRed: '#F54029',
        highlight: '#ff5500',
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
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-fluid-sm': {
          fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', // ~14–18px
        },
        '.text-fluid-base': {
          fontSize: 'clamp(1rem, 3vw, 1.25rem)', // ~16–20px
        },
        '.text-fluid-md': {
          fontSize: 'clamp(1.25rem, 4vw, 2rem)', // ~20–32px
        },
        '.text-fluid-lg': {
          fontSize: 'clamp(1.75rem, 6vw, 3rem)', // ~28–48px
        },
        '.text-fluid-xl': {
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', // ~40–72px
        },
      });
    }),
  ],
};
