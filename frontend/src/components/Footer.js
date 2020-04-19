import React from 'react';
import { Box, Link } from '@chakra-ui/core';
import { FaGithub, FaHeart, FaExternalLinkSquareAlt } from 'react-icons/fa';

export const Footer = ({ faucetLink, colorMode }) => (
  <Box
    alignItems="center"
    bottom={2}
    color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
    d="flex"
    justifyContent="space-between"
    maxWidth={['367.25px', '367.25px', '610px']}
    position="absolute"
    px={[4, 4, 0, 0]}
    width="100%"
  >
    <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://www.xivis.com'}>
      Made by Xivis <Box as={FaHeart} d="inline" ml={2} size="14px" />
    </Link>
    <Link isExternal alignItems="center" d="flex" fontSize={'sm'} href={'https://github.com/lndgalante/faucy'}>
      GitHub <Box as={FaGithub} d="inline" ml={2} size="14px" />
    </Link>
    <Link isExternal alignItems="center" d="flex" fontSize={'sm'} onClick={faucetLink}>
      Faucet <Box as={FaExternalLinkSquareAlt} d="inline" ml={2} size="14px" />
    </Link>
  </Box>
);
