import React from 'react';
import { Box, Text, Link, IconButton, Grid, useColorMode } from '@chakra-ui/core';
import { FaGithub } from 'react-icons/fa';

// components
import { Feedback } from './Feedback';

export const Nav = () => {
  // Chakra hooks
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      alignItems="center"
      as="nav"
      borderBottomColor={colorMode === 'light' ? 'grey.600' : 'grey.200'}
      borderBottomStyle={'solid'}
      borderBottomWidth={'1px'}
      d="flex"
      justifyContent="space-between"
      px="37px"
      py="20px"
    >
      <Box alignItems="flex-end" d="flex">
        <Text as="h1" fontSize="2xl" fontWeight={500}>
          Faucy
        </Text>
        <Text fontSize="sm" fontWeight={400} ml={1} opacity={0.7} pb={1}>
          (alpha)
        </Text>
      </Box>

      <Grid gap={3} gridAutoFlow={'column'}>
        <Feedback />
        <Link isExternal alignItems="center" d="flex" href={'https://github.com/xivis/faucy'}>
          <IconButton aria-label="GitHub Repository" fontSize={'lg'} icon={FaGithub} variant="outline" />
        </Link>
        <IconButton
          aria-label="GitHub Repository"
          fontSize="lg"
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          variant="outline"
          onClick={toggleColorMode}
        />
      </Grid>
    </Box>
  );
};
