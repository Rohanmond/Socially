const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  darkMode: 'class',
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
      'background-dim': 'rgb(0,0,0,0.5)',
      'dark-background': '#1c2440',
      'dark-nav-background': '#0B1829',
      'dark-txt-color': '#ffffff',
      'dark-txt-secondary-color': '#767B9F',
      'dark-secondary-background': '#1E293B',
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
