import React, { useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Text,
  Input,
  Image,
  Badge,
  Button,
  FormLabel,
  PseudoBox,
  InputGroup,
  FormControl,
  InputLeftAddon,
  RadioButtonGroup,
  FormErrorMessage,
  useColorMode,
} from '@chakra-ui/core';
import isEmpty from 'lodash.isempty';
import upperFirst from 'lodash.upperfirst';
import { nanoid } from 'nanoid';
import Notify from 'bnc-notify';
import { useFormik } from 'formik';
import capitalize from 'lodash.capitalize';
import { useLocalStorage } from 'react-use';
import makeBlockie from 'ethereum-blockies-base64';

// UI Components
import { SEO } from '../ui/components/Seo';
import { Coins } from '../ui/components/Coins';
import { Radio } from '../ui/components/Radio';

// Utils
import { validateAddress } from '../utils/validators';
import { getNetworkService } from '../utils/services';
import { NETWORKS, getNetworkId } from '../utils/constants';

// Hooks
import { useToast } from '../hooks/useToast';
import { useSounds } from '../hooks/useSounds';
import { useUserNetwork } from '../hooks/useUserNetwork';
import { useUserAddress } from '../hooks/useUserAddress';
import { useWeb3Provider } from '../hooks/useWeb3Provider';
import { useFaucetNetwork } from '../hooks/useFaucetNetwork';
import { useAnimatedCoins } from '../hooks/useAnimatedCoins';

const shortAddress = (address) => `0x${address.slice(0, 4)}...${address.slice(-4)}`;

const getVariant = (status) => {
  if (status === 'pending') return 'blue';
  if (status === 'rejected') return 'red';
  if (status === 'resolved') return 'green';
};

// Constants
const { GATSBY_BLOCKNATIVE_API_KEY } = process.env;

export const Form = () => {
  // React hooks
  const [isFormEnabled, setIsFormEnabled] = useState(true);

  // Storage hooks
  const [requests, setRequests] = useLocalStorage('requests', {});

  // Sound hooks
  const { playErrorSound, playSuccessSound } = useSounds();

  // Chakra hooks
  const { colorMode } = useColorMode();
  const { displayInfoMessage, displaySuccessMessage, displayErrorMessage } = useToast();

  // Animation hooks
  const { buttonContainerRef, animationContainerRef } = useAnimatedCoins(colorMode);

  // Get ethers from network
  const getEthers = async ({ userAddress, userNetwork }) => {
    const id = nanoid(10);
    const timestamp = +new Date();

    const notify = Notify({
      darkMode: colorMode === 'dark',
      dappId: GATSBY_BLOCKNATIVE_API_KEY,
      networkId: getNetworkId(userNetwork),
    });

    setRequests((prevRequests) => ({
      ...prevRequests,
      [id]: {
        timestamp,
        userAddress,
        userNetwork,
        amount: faucetNetwork.amount,
        message: 'Requesting ethers',
        status: 'pending',
      },
    }));

    const pendingRequests = Object.entries(requests)
      .map(([, request]) => request.status)
      .filter((status) => status === 'pending');
    if (pendingRequests.length + 1 >= 3) setIsFormEnabled(false);

    try {
      // displayInfoMessage(`This may take about ${faucetNetwork.serviceDuration} so we'll trigger a sound notification.`);

      const networkService = getNetworkService(userNetwork);
      const { body } = await networkService(`0x${userAddress}`);
      const { emitter } = notify.hash(body.txHash);

      const link = faucetNetwork.createEtherscanLink(body.txHash);
      setRequests((prevRequests) => ({
        ...prevRequests,
        [id]: { ...prevRequests[id], link, message: 'Mining transaction', status: 'pending' },
      }));

      emitter.on('txFailed', () => {
        playErrorSound({});
        setRequests((prevRequests) => ({
          ...prevRequests,
          [id]: { ...prevRequests[id], message: 'Transaction error', status: 'rejected' },
        }));
      });

      emitter.on('txConfirmed', (data) => {
        console.log('getEthers -> data', data);
        playSuccessSound({});
        displaySuccessMessage(`You have received ${faucetNetwork.amount} ethers.`);

        setRequests((prevRequests) => ({
          ...prevRequests,
          [id]: { ...prevRequests[id], message: 'Mined transaction', status: 'resolved' },
        }));
      });
    } catch (error) {
      const { body } = JSON.parse(error.message);

      playErrorSound({});
      // displayErrorMessage(body ? body.message : `Ups! Something went wrong, please try again later...`);
      const errorMessage = body ? body.message : `Ups! Something went wrong, please try again later...`;

      setRequests((prevRequests) => ({
        ...prevRequests,
        [id]: { ...prevRequests[id], message: 'Requesting error', status: 'rejected', errorMessage },
      }));
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

  const handleAddressPaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('Text');
    handleUserAddressChange(text.toLowerCase().startsWith('0x') ? text.slice(2) : text);
  };

  // Handlers - React - Form
  const handleClearLocalStorage = () => setRequests({});

  // Web3 hooks
  const web3Provider = useWeb3Provider();
  useUserAddress(web3Provider, handleUserAddressChange);
  useUserNetwork(web3Provider, handleUserNetworkChange);

  // Faucet hooks
  const faucetNetwork = useFaucetNetwork(values.userNetwork);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <SEO title={`${values.userNetwork ? capitalize(values.userNetwork) : ''}`} />

        <Box maxWidth={['auto', 'auto', '466px']} mb={6}>
          <FormLabel mb={1}>First, choose your network:</FormLabel>

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

        <Grid columnGap={6} mt={3} templateColumns={['auto', 'auto', 'minmax(auto, 466px) auto']}>
          <FormControl isDisabled={!faucetNetwork} isInvalid={errors.userAddress && touched.userAddress}>
            <FormLabel htmlFor="userAddress" mb={1}>
              Now, insert your address:
            </FormLabel>

            <InputGroup>
              <InputLeftAddon children="0x" />
              <Input
                _focus={{ borderColor: '#319795', boxShadow: '0 0 0 1px #319795' }}
                aria-label="Insert your address"
                isInvalid={Boolean(errors.userAddress && touched.userAddress)}
                maxLength={40}
                name="userAddress"
                placeholder="0000000000000000000000000000000000000000"
                roundedLeft="0"
                value={values.userAddress}
                onChange={handleChange}
                onPaste={handleAddressPaste}
              />
            </InputGroup>

            <Box alignItems="center" d="flex" height="26px">
              <FormErrorMessage>{touched.userAddress && errors.userAddress}</FormErrorMessage>
            </Box>
          </FormControl>

          <FormControl isDisabled={!faucetNetwork || !values.userAddress} mt={[2, 2, 0]}>
            <FormLabel mb={1}>Ready?</FormLabel>

            <Button
              ref={buttonContainerRef}
              d="flex"
              isDisabled={!values.userNetwork || !values.userAddress || !isFormEnabled}
              size="md"
              type="submit"
              variantColor="gray"
              width="100%"
            >
              <Box ref={animationContainerRef} className="lottie-container" d="inline" ml={-2} mr={2} width="26px" />
              <Text fontSize={'sm'} fontWeight={500} letterSpacing={0.4} textTransform="uppercase">
                Submit
              </Text>
            </Button>
          </FormControl>
        </Grid>
      </form>

      {/* Results */}
      <Box mb={32} mt={32}>
        <Box
          borderBottomColor={colorMode === 'light' ? 'grey.600' : 'grey.200'}
          borderBottomStyle={'solid'}
          borderBottomWidth={'1px'}
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
                Your last 3 requests
              </Text>
              <Button
                color={colorMode === 'light' ? 'gray.600' : 'gray.200'}
                fontWeight={400}
                variant="ghost"
                onClick={handleClearLocalStorage}
              >
                Clear
              </Button>
            </Box>

            <Box>
              {Object.entries(requests)
                .sort((a, b) => b[1]?.timestamp - a[1]?.timestamp)
                .slice(0, 3)
                .map(([id, values]) => {
                  return (
                    <PseudoBox
                      key={id}
                      _hover={{ boxShadow: 'lg', transform: 'translate3d(0, -1px, 0)' }}
                      bg={colorMode === 'light' ? 'white' : 'rgba(255, 255, 255, 0.1)'}
                      borderRadius={'md'}
                      boxShadow="md"
                      cursor="pointer"
                      d="flex"
                      justifyContent="space-between"
                      mb={4}
                      px={6}
                      py={4}
                      transition="all .2s ease"
                      onClick={() =>
                        values.link ? window.open(values.link) : displayErrorMessage(values.errorMessage)
                      }
                    >
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
                  );
                })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
