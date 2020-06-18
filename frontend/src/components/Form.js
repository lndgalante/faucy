import React, { useState, useCallback, useEffect, Fragment } from 'react';
import {
  Box,
  Icon,
  Grid,
  Text,
  Input,
  Image,
  Badge,
  Button,
  FormLabel,
  PseudoBox,
  FormControl,
  RadioButtonGroup,
  FormErrorMessage,
  FormHelperText,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/core';
import { AnimatePresence } from 'framer-motion';
import { useGoatCounter } from 'gatsby-plugin-goatcounter';

import isEmpty from 'lodash.isempty';
import upperFirst from 'lodash.upperfirst';
import capitalize from 'lodash.capitalize';

import { nanoid } from 'nanoid';
import { useFormik } from 'formik';
import makeBlockie from 'ethereum-blockies-base64';

// Components
import { AnimatedBox } from './AnimatedBox';

// UI Components
import { SEO } from '../ui/components/Seo';
import { Wink } from '../ui/components/Wink';
import { Coins } from '../ui/components/Coins';
import { Radio } from '../ui/components/Radio';
import { Modal } from '../ui/components/Modal';

// Utils
import { validateAddress } from '../utils/validators';
import { getNetworkService } from '../utils/services';

// Hooks
import { useToast } from '../hooks/useToast';
import { useSounds } from '../hooks/useSounds';
import { useNotify } from '../hooks/useNotify';
import { useUserNetwork } from '../hooks/useUserNetwork';
import { useUserAddress } from '../hooks/useUserAddress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFaucetNetwork } from '../hooks/useFaucetNetwork';
import { useAnimatedCoins } from '../hooks/useAnimatedCoins';

// Constants
import { NETWORKS } from '../utils/constants';

// Helpers
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shortAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

const getVariant = (status) => {
  if (status === 'pending') return 'blue';
  if (status === 'rejected') return 'red';
  if (status === 'resolved') return 'green';
};

export const Form = ({ logoAnimation, web3Provider, emitter }) => {
  // React hooks
  const [isFormEnabled, setIsFormEnabled] = useState(true);

  // Analytics hooks
  const count = useGoatCounter();

  // Storage hooks
  const [requests, setRequests] = useLocalStorage('requests', {});

  // Sound hooks
  const { playErrorSound, playSuccessSound } = useSounds();

  // Chakra hooks
  const { colorMode } = useColorMode();
  const { displaySuccessMessage } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Animation hooks
  const { buttonContainerRef, animationContainerRef } = useAnimatedCoins(colorMode);

  // Notify hooks
  const Notify = useNotify();

  // Methods
  const updateRequests = (data, id = '') => {
    return setRequests((prevRequests) => ({ ...prevRequests, [id]: { ...(prevRequests[id] || {}), ...data } }));
  };

  // Get ethers from network
  const getEthers = async ({ userAddress, userNetwork }) => {
    const id = nanoid(10);
    const timestamp = +new Date();
    const notify = Notify[userNetwork];

    updateRequests(
      {
        timestamp,
        userAddress,
        userNetwork,
        status: 'pending',
        icon: 'info-outline',
        amount: faucetNetwork.amount,
        message: 'Requesting ETH',
        extraMessage: `This will take less than ${faucetNetwork.serviceDuration}`,
      },
      id,
    );

    const pendingRequests = Object.entries(requests)
      .map(([, request]) => request.status)
      .filter((status) => status === 'pending');
    if (pendingRequests.length + 1 >= 3) setIsFormEnabled(false);

    try {
      const networkService = getNetworkService(userNetwork);
      const { body } = await networkService(userAddress);

      const link = faucetNetwork.createEtherscanLink(body.txHash);
      updateRequests(
        {
          link,
          status: 'pending',
          txHash: body.txHash,
          icon: 'external-link',
          message: 'Mining transaction',
          extraMessage: 'Display transaction status on Etherscan',
        },
        id,
      );

      // FIXME: Temporal fix for Kovan since it gets solved really quickly
      const solvedNetworks = ['kovan', 'rinkeby', 'goerli'];
      if (solvedNetworks.includes(userNetwork)) {
        await delay(1000);

        playSuccessSound({});
        if (logoAnimation) logoAnimation.goToAndPlay(0);

        count({ path: `request-${userNetwork}-success`, event: true });
        displaySuccessMessage(`You have received ${faucetNetwork.amount} ETH`);

        return updateRequests(
          {
            status: 'resolved',
            icon: 'external-link',
            message: 'Mined transaction',
            extraMessage: 'Display transaction status on Etherscan',
          },
          id,
        );
      }

      const { emitter } = notify.hash(body.txHash);

      emitter.on('txFailed', () => {
        playErrorSound({});
        updateRequests(
          {
            status: 'rejected',
            icon: 'external-link',
            message: 'Transaction error',
            extraMessage: 'Transaction has failed',
          },
          id,
        );
      });

      emitter.on('txConfirmed', () => {
        playSuccessSound({});
        if (logoAnimation) logoAnimation.goToAndPlay(0);

        count({ path: `request-${userNetwork}-success`, event: true });
        displaySuccessMessage(`You have received ${faucetNetwork.amount} ETH`);

        updateRequests(
          {
            status: 'resolved',
            icon: 'external-link',
            message: 'Mined transaction',
            extraMessage: 'Display transaction status on Etherscan',
          },
          id,
        );
      });
    } catch (error) {
      count({ path: `request-${userNetwork}-failed`, event: true });

      const { body } = JSON.parse(error.message);
      const extraMessage = body ? body.message : `Ups! Something went wrong, please try again later`;

      playErrorSound({});
      updateRequests({ message: 'Requesting error', status: 'rejected', extraMessage, icon: 'warning-2' }, id);
    } finally {
      setIsFormEnabled(true);
    }
  };

  // Formik hooks
  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } = useFormik({
    onSubmit: getEthers,
    validate: validateAddress,
    initialValues: { userNetwork: '', userAddress: '' },
  });

  // Handlers - React - Form
  const handleUserAddressChange = useCallback((value) => setFieldValue('userAddress', value), [setFieldValue]);
  const handleUserNetworkChange = useCallback((value) => setFieldValue('userNetwork', value), [setFieldValue]);

  // Handlers - React - Clear
  const handleClearLocalStorage = () => setRequests({}) || onClose();

  // Web3 hooks
  useUserAddress(web3Provider, handleUserAddressChange, emitter);
  useUserNetwork(web3Provider, handleUserNetworkChange);

  // Faucet hooks
  const faucetNetwork = useFaucetNetwork(values.userNetwork);

  // Get Latest 3 Requests
  const getLatestRequests = (requests) => {
    return Object.entries(requests)
      .sort((a, b) => b[1]?.timestamp - a[1]?.timestamp)
      .slice(0, 3);
  };

  // Trigger message if there are pending requests
  useEffect(() => {
    const pendingRequests = getLatestRequests(requests).some(([_, request]) => request.status === 'pending');
    if (!pendingRequests) return;

    const onBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [requests]);

  // Add notify events on mounted page for pending transactions with txHash
  useEffect(() => {
    const pendingRequests = getLatestRequests(requests).filter(
      ([_, request]) => request.status === 'pending' && typeof request.txHash !== 'undefined',
    );

    if (!pendingRequests.length) return;

    pendingRequests.forEach(([id, { userNetwork, txHash }]) => {
      const notify = Notify[userNetwork];
      const { emitter } = notify.hash(txHash);

      emitter.on('txFailed', () => {
        playErrorSound({});
        updateRequests(
          {
            status: 'rejected',
            icon: 'external-link',
            message: 'Transaction error',
            extraMessage: 'Transaction has failed',
          },
          id,
        );
      });

      emitter.on('txConfirmed', () => {
        playSuccessSound({});
        if (logoAnimation) logoAnimation.goToAndPlay(0);

        updateRequests(
          {
            status: 'resolved',
            icon: 'external-link',
            message: 'Mined transaction',
            extraMessage: 'Display transaction status on Etherscan',
          },
          id,
        );
      });
    });
  }, [logoAnimation]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <SEO title={`${values.userNetwork ? capitalize(values.userNetwork) : 'Choose your network'}`} />

      <form onSubmit={handleSubmit}>
        <Box maxWidth={['auto', 'auto', '448px']} mb={6}>
          <FormLabel mb={1}>Choose your network</FormLabel>

          <RadioButtonGroup
            isInline
            alignItems="center"
            d="flex"
            flexWrap="wrap"
            justifyContent="center"
            name="userNetwork"
            value={values.userNetwork}
            onChange={handleUserNetworkChange}
          >
            {NETWORKS.map(({ value, label, disabled }) => (
              <Radio
                key={value}
                _active={{ boxShadow: 'md' }}
                _focus={{ boxShadow: 'none' }}
                _hover={{ transform: 'translate3d(0, -1px, 0)' }}
                flex="1"
                fontSize={'sm'}
                fontWeight={500}
                isDisabled={disabled}
                letterSpacing={0.4}
                textTransform="uppercase"
                value={value}
                willChange="transform"
              >
                {label}
              </Radio>
            ))}
          </RadioButtonGroup>
        </Box>

        <Grid columnGap={6} mt={3} templateColumns={['auto', 'auto', 'minmax(auto, 466px) 140px']}>
          <FormControl isDisabled={!faucetNetwork} isInvalid={errors.userAddress && touched.userAddress}>
            <FormLabel htmlFor="userAddress" mb={1}>
              Insert your address
            </FormLabel>

            <Input
              _focus={{ borderColor: '#319795', boxShadow: '0 0 0 1px #319795' }}
              aria-label="Insert your address"
              isInvalid={Boolean(errors.userAddress && touched.userAddress)}
              maxLength={42}
              name="userAddress"
              placeholder={'0x...'}
              value={values.userAddress}
              onChange={handleChange}
            />

            <Box alignItems="center" d="flex" height="26px">
              {touched.userAddress && errors.userAddress ? (
                <FormErrorMessage>{touched.userAddress && errors.userAddress}</FormErrorMessage>
              ) : (
                <FormHelperText fontSize={12}>
                  You can do one request per address. Use another one if you need more <Wink />
                </FormHelperText>
              )}
            </Box>
          </FormControl>

          <FormControl isDisabled={!faucetNetwork || !values.userAddress} mt={[2, 2, 0]}>
            <FormLabel mb={1}>Claim</FormLabel>

            <Button
              ref={buttonContainerRef}
              d="flex"
              isDisabled={!values.userNetwork || !values.userAddress || !isFormEnabled}
              size="md"
              type="submit"
              variantColor="gray"
              width="100%"
            >
              <Box
                ref={animationContainerRef}
                className="lottie-container-coins"
                d="inline"
                ml={-2}
                mr={2}
                width="26px"
              />
              <Text fontSize={'sm'} fontWeight={500} letterSpacing={0.4} textTransform="uppercase">
                Submit
              </Text>
            </Button>

            <Box alignItems="center" d="flex" height="26px">
              {faucetNetwork && <FormHelperText fontSize={12}>Receive {faucetNetwork.amount} ETH</FormHelperText>}
            </Box>
          </FormControl>
        </Grid>
      </form>

      {/* Results */}
      <Box mb={24} mt={32}>
        <Box
          borderBottomColor={colorMode === 'light' ? 'grey.600' : 'grey.200'}
          borderBottomStyle={'solid'}
          borderBottomWidth={'1px'}
        />

        <Modal
          body={<Text>This action will remove all your requests history</Text>}
          footer={
            <Fragment>
              <Button variantColor="teal" onClick={handleClearLocalStorage}>
                Confirm
              </Button>
            </Fragment>
          }
          handleClose={onClose}
          isOpen={isOpen}
          title="Clear history"
        />

        {isEmpty(requests) && (
          <Box mt={10} textAlign="center">
            <Text as="span" color={colorMode === 'light' ? 'gray.500' : 'gray.300'}>
              You haven't any request yet.{' '}
            </Text>
            <Text as="span" color={colorMode === 'light' ? 'gray.600' : 'gray.200'} fontWeight={500}>
              Try it!
            </Text>
          </Box>
        )}

        {!isEmpty(requests) && (
          <Box>
            <Box alignItems="center" d="flex" justifyContent="space-between" mb={3} mt={2}>
              <Text as="span" color={colorMode === 'light' ? 'gray.600' : 'gray.200'} fontWeight={500}>
                Requests
              </Text>
              <Button
                color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
                fontWeight={400}
                variant="ghost"
                onClick={onOpen}
              >
                Clear
              </Button>
            </Box>

            <AnimatePresence>
              {getLatestRequests(requests).map(([id, values]) => {
                return (
                  <AnimatedBox key={id}>
                    <PseudoBox
                      bg={colorMode === 'light' ? 'white' : 'rgba(255, 255, 255, 0.1)'}
                      borderRadius={'md'}
                      boxShadow="md"
                      className="card"
                      cursor={values.link ? 'pointer' : 'auto'}
                      d="flex"
                      justifyContent="space-between"
                      mb={4}
                      position={'relative'}
                      px={6}
                      py={4}
                      transition="all .2s ease"
                      {...(values.link ? { onClick: () => window.open(values.link) } : {})}
                    >
                      <Box
                        alignItems="center"
                        bg={colorMode === 'light' ? 'white' : '#3d434c'}
                        borderRadius="md"
                        className="card-overlay"
                        display="flex"
                        height="100%"
                        justifyContent="center"
                        left="0"
                        position="absolute"
                        top="0"
                        width="100%"
                      >
                        <Text>{values.extraMessage}</Text>
                        <Icon ml={2} name={values.icon} />
                      </Box>
                      <Box
                        borderRightColor={colorMode === 'light' ? 'gray.200' : 'gray.400'}
                        borderRightStyle={'solid'}
                        borderRightWidth={'1px'}
                        pr={6}
                      >
                        <Text
                          color={colorMode === 'light' ? 'gray.500' : 'gray.200'}
                          fontSize="xs"
                          mb={1}
                          textTransform="uppercase"
                        >
                          Address
                        </Text>
                        <Box d="flex">
                          <Image
                            alt="Blockie"
                            mr={3}
                            rounded="full"
                            size="22px"
                            src={makeBlockie(values.userAddress)}
                          />
                          <Text>{shortAddress(values.userAddress)}</Text>
                        </Box>
                      </Box>

                      <Box>
                        <Text
                          color={colorMode === 'light' ? 'gray.500' : 'gray.200'}
                          fontSize="xs"
                          mb={1}
                          textTransform="uppercase"
                        >
                          Network
                        </Text>
                        <Box>
                          <Text>{upperFirst(values.userNetwork)}</Text>
                        </Box>
                      </Box>

                      <Box width={'166px'}>
                        <Text
                          color={colorMode === 'light' ? 'gray.500' : 'gray.200'}
                          fontSize="xs"
                          mb={1}
                          textTransform="uppercase"
                        >
                          Status
                        </Text>
                        <Box>
                          <Badge fontSize={'sm'} variantColor={getVariant(values.status)}>
                            {values.message}
                          </Badge>
                        </Box>
                      </Box>

                      <Box textAlign="right" width="80px">
                        <Text
                          color={colorMode === 'light' ? 'gray.500' : 'gray.200'}
                          fontSize="xs"
                          mb={1}
                          textTransform="uppercase"
                        >
                          Amount
                        </Text>
                        <Box alignItems="center" d="flex" justifyContent="flex-end">
                          <Text fontSize="lg" fontWeight={600}>
                            {values.amount}
                          </Text>
                          <Box
                            as={Coins}
                            color={colorMode === 'light' ? 'gray.700' : 'gray.200'}
                            d="inline"
                            ml={2}
                            size="18px"
                          />
                        </Box>
                      </Box>
                    </PseudoBox>
                  </AnimatedBox>
                );
              })}
            </AnimatePresence>
          </Box>
        )}
      </Box>
    </Box>
  );
};
