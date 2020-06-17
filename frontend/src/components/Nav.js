import React, { useState, useEffect } from 'react';
import { FaGithub, FaComment, FaTelegramPlane } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  useColorMode,
} from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';

// components
import { Feedback } from './Feedback';
import { AnimatedBox } from './AnimatedBox';

// utils
import { getHealthStatus } from '../utils/services';

// hooks
import { useEnableProvider } from '../hooks/useEnableProvider';

export const Nav = ({ boxRef, animationRef, web3Provider, emitter }) => {
  // React hooks
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isProviderEnabled, setProviderEnabled] = useState(null);
  const [healthStatus, setHealthStatus] = useState({ message: 'Loading health status', color: 'gray.400' });

  // Chakra hooks
  const { colorMode, toggleColorMode } = useColorMode();

  // Custom hooks
  const enableProvider = useEnableProvider(web3Provider, (data) => {
    if (!data) return;
    setProviderEnabled(data);
    emitter.emit('updateAddress', data);
  });

  // Effects
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

      <Stack isInline>
        <Tooltip aria-label="Sync your network and address" label="Sync your network and address" placement="bottom">
          <Button fontSize="sm" fontWeight={400} mr={2} onClick={enableProvider}>
            {isProviderEnabled ? 'Connected to wallet' : 'Connect to wallet'}
          </Button>
        </Tooltip>
        <Menu>
          <MenuButton as={Button}>
            <Box as={BsThreeDots} fontSize={'lg'} />
          </MenuButton>
          <MenuList minWidth="114px">
            <MenuItem onClick={() => window.open('https://t.me/faucy')}>
              <Box as={FaTelegramPlane} fontSize={'lg'} mr={2} />
              Telegram
            </MenuItem>
            <MenuItem onClick={() => window.open('https://github.com/xivis/faucy')}>
              <Box as={FaGithub} fontSize={'lg'} mr={2} />
              GitHub
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>

      <Stack isInline bottom={4} position="absolute" right={4}>
        <Box position="relative">
          <Button
            _focus={{ boxShadow: 'none' }}
            fontSize="sm"
            fontWeight={400}
            variant="outline"
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

        <IconButton
          aria-label="Change color mode"
          fontSize="lg"
          icon={colorMode === 'light' ? 'moon' : 'sun'}
          variant="outline"
          onClick={toggleColorMode}
        />
      </Stack>
    </Box>
  );
};
