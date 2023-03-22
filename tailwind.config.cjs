/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkOpacityGray: 'rgba(46, 46, 46, 0.79)',
        lightOpacityGray: 'rgba(46, 46, 46, 0.5)',
      },
      fontFamily: {
        mainFont :["Gotham-Black"],
        secondaryFont: ["Gotham-Medium"],
      }
    },
  },
  plugins: [],
}