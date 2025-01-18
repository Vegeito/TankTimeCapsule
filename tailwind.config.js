/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0D1B2A',
          secondary: '#17BEBB',
          accent: '#FFD700',
          background: '#121212',
          text: '#E0E0E0',
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#ADD8E6',
          accent: '#DAA520',
          background: '#F5F5F5',
          text: '#333333',
        },
      },
      transitionProperty: {
        'margin': 'margin',
      },
    },
  },
  plugins: [],
};