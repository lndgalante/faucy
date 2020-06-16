import React, { useState, useEffect } from 'react';
import { FaGithub, FaComment, FaTelegramPlane } from 'react-icons/fa';
import { Box, Button, Link, IconButton, Grid, Tooltip, useColorMode } from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';

// components
import { Feedback } from './Feedback';
import { AnimatedBox } from './AnimatedBox';

// utils
import { getHealthStatus } from '../utils/services';

export const Nav = ({ boxRef, animationRef }) => {
  // React hooks
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
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
      <Box alignItems="center" d="flex">
        <Box ref={boxRef} width="100px">
          <Box ref={animationRef} />
        </Box>

        <Tooltip aria-label={healthStatus.message} label={healthStatus.message} placement="bottom">
          <Box
            borderColor={healthStatus.color}
            borderRadius="50%"
            borderWidth={'2px'}
            height="12px"
            ml={2}
            mt={1}
            width="12px"
          />
        </Tooltip>
      </Box>

      <Grid gap={3} gridAutoFlow={'column'}>
        <Box position="relative">
          <Button
            _focus={{ boxShadow: 'none' }}
            fontSize="sm"
            fontWeight={400}
            variant="ghost"
            onClick={() => setIsFeedbackOpen(true)}
          >
            Feedback <Box as={FaComment} d="inline" ml={2} size="14px" />
          </Button>
          <AnimatePresence>
            {isFeedbackOpen && (
              <AnimatedBox>
                <Feedback setIsFeedbackOpen={setIsFeedbackOpen} />
              </AnimatedBox>
            )}
          </AnimatePresence>
        </Box>

        <Link isExternal alignItems="center" d="flex" href={'https://t.me/faucy'}>
          <IconButton aria-label="Telegram Channel" fontSize={'lg'} icon={FaTelegramPlane} variant="outline" />
        </Link>

        <Link isExternal alignItems="center" d="flex" href={'https://github.com/xivis/faucy'}>
          <IconButton aria-label="GitHub Repository" fontSize={'lg'} icon={FaGithub} variant="outline" />
        </Link>

        <IconButton
          aria-label="Change color mode"
          fontSize="lg"
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          variant="outline"
          onClick={toggleColorMode}
        />
      </Grid>
    </Box>
  );
};
