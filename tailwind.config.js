/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Figtree"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          50: '#F6F0FC',
          100: '#EADFF7',
          200: '#CAB2ED',
          300: '#A387E0',
          400: '#573DCC',
          500: '#0600B4',
          600: '#0500A3',
          700: '#050087',
          800: '#04006E',
          900: '#010052',
          950: '#010036',
        },
        green: {
          50: '#F9FEFB',
          100: '#E4FCF0',
          200: '#C6F9E0',
          300: '#A1F6CF',
          400: '#72F3BD',
          500: '#00F0A8',
          600: '#00D796',
          700: '#00BA82',
          800: '#00986A',
          900: '#006B4B',
          950: '#003626',
        },
        slate: {
          50: '#FAFAFA',
          100: '#F1F0F1',
          200: '#E0DFE0',
          300: '#CBCACC',
          400: '#A5A4A7',
          500: '#807F82',
          600: '#69686F',
          700: '#494751',
          800: '#31303B',
          900: '#1D1B26',
          950: '#0E0D16',
        },
      },
    },
  },
  plugins: [],
};
