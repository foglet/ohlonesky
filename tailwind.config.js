const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',

  content: [
    './404.html',
    './*.html',
    './**/*.html',
    './assets/**/*.js',
    './assets/css/hero.css',
    './assets/partials/**/*.html',
    '!./node_modules/**/*', // Explicitly exclude
  ],

  safelist: [
    'hidden', 'opacity-0', 'opacity-100',
    'translate-x-full', 'translate-x-0',
    'translate-y-full', 'translate-y-0',
    'transition-all', 'duration-300', 'ease-in-out',
    'z-30', 'z-40'
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
        ardo: ['ardoise-std', 'sans-serif'], // font-bold 700 normal
        ardons: ['ardoise-narrow-std', 'sans-serif'], // font-semibold -bold 600, 700 normal
        meta: ['ff-meta-web-pro, sans-serif'], // font-black: 900; normal, italic
        vista: ['vista-slab', 'serif'], //   font-black: 900;


      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('tailwind-hamburgers'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.text-fluid-sm': { fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' },
        '.text-fluid-base': { fontSize: 'clamp(1rem, 3vw, 1.25rem)' },
        '.text-fluid-md': { fontSize: 'clamp(1.25rem, 4vw, 2rem)' },
        '.text-fluid-lg': { fontSize: 'clamp(1.75rem, 6vw, 3rem)' },
        '.text-fluid-xl': { fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' },
      }, { variants: ['responsive'] });
    }),
  ],
};
