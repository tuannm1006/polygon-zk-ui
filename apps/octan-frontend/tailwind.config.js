/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{htm,html,js,jsx,ts,tsx,css,scss}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        black: '#23231E',
        'semi-black': '#111214',
        gray: '#8A939B'
      },
      backgroundImage: {
        gradient: 'linear-gradient(90deg, #00FE7E 0%, #00C4FE 100%)',
      },
    },
  },
  plugins: [],
};
