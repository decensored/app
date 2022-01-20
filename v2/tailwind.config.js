module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        decensored: {
          50: '#e3e4f5',
          100: '#c7caeb',
          200: '#acb2e2',
          300: '#9298d8',
          400: '#7881cf',
          500: '#606ac6',
          600: '#4855bd',
          700: '#3140b5',
          800: '#2a389c',
          900: '#2d3294',
        },
      }
    },
  },
  plugins: [],
};
