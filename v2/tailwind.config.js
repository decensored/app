/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{js,ts,jsx,tsx}',
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
      display: ['group-hover'],
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
      },
      boxShadow: {
        'neg-sm': '0 -1px 2px 0 rgba(0,0,0,0.05)',
        'neg': '0 -1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
        'neg-md': '0 -4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        'neg-lg': '0 -10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        'neg-xl': '0 -20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        'neg-2xl': '0 -25px 50px -12px rgba(0,0,0,0.25)',
      }
    },
  },
  variants: {
    empty: ['before', 'after','children', 'default', 'children-first', 'children-last', 'children-odd', 'children-even', 'children-not-first', 'children-not-last', 'children-hover', 'hover', 'children-focus', 'focus', 'children-focus-within', 'focus-within', 'children-active', 'active', 'children-visited', 'visited', 'children-disabled', 'disabled', 'responsive'],
  },
  plugins: [
    require('tailwindcss-pseudo-elements'),
    require('tailwindcss-children'),
    plugin(({addUtilities}) => {
      const newUtilities = {
        '.empty-content': {
          content: '""',
        },
      }
      addUtilities(newUtilities, {
        variants: ['before', 'after'],
      })
    })
  ],
}
