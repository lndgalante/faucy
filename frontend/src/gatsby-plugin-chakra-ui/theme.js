import { theme as chakraTheme } from '@chakra-ui/core';

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
  },
};

export default theme;
