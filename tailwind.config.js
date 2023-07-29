/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '766px',
      lg: '976px',
      xl: '1440px',
    },

    fontFamily: {
      'sans': ['Helvetica','Arial', 'sans-seirf'],
    },

    extend: {
      screens: {
        'cel': { 'raw': '(max-height: 766px)' },
        
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

