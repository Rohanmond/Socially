const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      primary: '#51B5FF',
      secondary: '#39BDF8',
      'nav-background': '#FFFFFF',
      background: '#F8F9FA',
      'secondary-background': '#DCF0FF',
      'txt-color': '#000000',
      'txt-secondary-color': '#64748b',
      'txt-hover-color': '#94a3b8',
      ...colors,
    },

    screens: {
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '850px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
