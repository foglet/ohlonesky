/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Enables class-based dark mode
  content: [
    "./*.html",             // top-level pages
    "./**/*.html",          // nested pages and partials
    "./assets/**/*.js",     // JS files that include Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}
