/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      fontFamily:{
        'Squada': ['Squada One', 'regular']
      },
      gridRowStart: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
      },
      gridRowEnd: {
        '8': '8',
        '9': '9',
        '10': '10',
        '11': '11',
        '12': '12',
        '13': '13',
      },
      keyframes:{
        wiggle : {
          '0%': { width: '4rem', height: '1rem'},
          '10%': { height: '6rem', height: '2rem' },
          '20%': { height: '8rem', height: '3rem' },
        },
        text: {
          '0%': {'font-size': '1px'}, 
          '10%': {'font-size': '2px'} 
        }
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-out',
        text: 'text 0.3s ease-out'
      }
    },
  },
  variants:{
    extend: {},
  },
  plugins: [
    function({ addVariant }) {
      addVariant('checked-label', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `input[type="radio"].checked ~ label${rule.selector.slice(1)}, input[type="checkbox"].checked ~ label${rule.selector.slice(1)}`;
        });
      });
    },
  ],
}