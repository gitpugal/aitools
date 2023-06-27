import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  html: {
    // Set the [lang] attribute to "en"
    lang: 'en',
  },
});

export default theme;
