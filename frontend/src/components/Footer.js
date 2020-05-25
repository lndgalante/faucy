import React from 'react';
import { Box, Link, Text, useColorMode } from '@chakra-ui/core';
import { FaGripLinesVertical } from 'react-icons/fa';

export const Footer = () => {
  // Chakra hooks
  const { colorMode } = useColorMode();

  return (
    <Box
      alignItems="center"
      color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
      d="flex"
      justifyContent="center"
      maxWidth={['100%', '100%', '100%']}
      px={[4, 4, 0, 0]}
      py={6}
      width="100%"
    >
      <Text fontSize={'sm'}>Alpha Version</Text>
      <Box as={FaGripLinesVertical} d="inline" mx={2} size="14px" />
      <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://www.xivis.com'}>
        Made by Xivis
      </Link>
    </Box>
  );
};
