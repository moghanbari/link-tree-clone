module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': '#404E67',
      },
      screens: {
        '2xs': '320px',
        'xs': '425px',
        // 'sm-between': { 'min': '425px', 'max': '900px' },
      },
    },
  },
  plugins: []
}
