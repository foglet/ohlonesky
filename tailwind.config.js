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
        brandDark: '#1d2834', //big stone 900
        // see >> uicolors.app/generate/1d2834
        brand900: '#2c3e4e', //big stone 900
        brandSky: '#0f172a',
        brandIndigo: '#362F78',
        stormSky: '#374151',
        warmRed: '#F54029',
        highlight: '#FF5500',
        neutralText: '#525252', // neutral-600
      },
      fontFamily: {
        vista: ['vista-slab', 'serif'], //  font-slab font-bold italic not-italic: 500;
        ardoise: ['ardoise-std', 'sans-serif'], // font-bold 600 700 normal italic
        // ardoise-narrow-std: font-ardo font-medium not-italic font-semibold -bold 600, 700
        meta: ['"ff-meta-web-pro"', 'sans-serif'], // font-black: 900; normal, italic
        // class="font-meta font-extrabold not-italic">
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('tailwind-hamburgers'),
    require('@tailwindcss/aspect-ratio'),
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
