module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gradient: {
          0: '#4739b1',
          30: '#4739b1',
          100: '#6b37b1',
        },
        highlight: {
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
        darkmode: {
          100: '#00032a',
          200: '#00042e',
          300: '#000432',
          400: '#020937',
          500: '#09103c',
          600: '#0f1340',
          700: '#131644',
          800: '#171a49',
          900: '#1b1d4e',
          1000: '#1f2152',
        },
      }
    },
  },
  plugins: [],
}
