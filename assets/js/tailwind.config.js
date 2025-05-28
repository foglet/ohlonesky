/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 Enable class-based dark mode
  content: ["./*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}
