import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Box, Text, Link, IconButton, Grid, Tooltip, useColorMode } from '@chakra-ui/core';

// components
import { Feedback } from './Feedback';

// utils
import { getHealthStatus } from '../utils/services';

export const Nav = () => {
  // React hooks
  const [healthStatus, setHealthStatus] = useState({ message: 'Loading health status', color: 'gray.400' });

  // Chakra hooks
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    getHealthStatus()
      .then(() => setHealthStatus({ message: 'Up and running', color: 'green.400' }))
      .catch(() => setHealthStatus({ message: 'Down and fixing', color: 'red.400' }));
  }, []);

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

        <Tooltip aria-label={healthStatus.message} label={healthStatus.message} placement="bottom">
          <Box backgroundColor={healthStatus.color} borderRadius="50%" height="12px" mb={2} mx={2} width="12px" />
        </Tooltip>
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
