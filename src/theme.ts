import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors,
  breakpoints: {
    base: '0em',
    sm: '30em',
    md: '40em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
});
