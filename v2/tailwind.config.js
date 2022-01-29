module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      display: ["group-hover"],
      colors: {
        gradient: {
          0: '#4739b1',
          30: '#4739b1',
          100: '#6b37b1',
        },
        highlight: {
          10: '#f4f7fe',
          20: '#eef1fe',
          30: '#e8ecfd',
          40: '#e2e6fd',
          50: '#dce1fd',
          60: '#d6dafc',
          70: '#d0d4f6',
          80: '#cacff0',
          90: '#c5c9eb',
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
          1100: '#1f244a',
          1200: '#24284f',
          1300: '#282c53',
          1400: '#2c3058',
          1500: '#31355e',
          1600: '#353963',
          1700: '#3a3e68',
          1800: '#3e426c',
          1900: '#434771',
        },
      }
    },
  },
  plugins: [],
}
