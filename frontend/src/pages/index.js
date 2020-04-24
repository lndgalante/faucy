import React, { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import capitalize from 'lodash.capitalize';
import {
  Box,
  Grid,
  Text,
  Input,
  Button,
  FormLabel,
  InputGroup,
  FormControl,
  InputLeftAddon,
  RadioButtonGroup,
  FormErrorMessage,
  useColorMode,
} from '@chakra-ui/core';
import Notify from 'bnc-notify';

// UI Components
import { SEO } from '../ui/components/Seo';
import { Radio } from '../ui/components/Radio';

// Components
import { Footer } from '../components/Footer';

// Hooks
import { useToast } from '../hooks/useToast';
import { useSounds } from '../hooks/useSounds';
import { useUserNetwork } from '../hooks/useUserNetwork';
import { useUserAddress } from '../hooks/useUserAddress';
import { useWeb3Provider } from '../hooks/useWeb3Provider';
import { useFaucetNetwork } from '../hooks/useFaucetNetwork';
import { useAnimatedCoins } from '../hooks/useAnimatedCoins';

// Utils
import { getNetworkService } from '../utils/services';
import { validateAddress } from '../utils/validators';
import { NETWORKS, getNetworkId } from '../utils/constants';

// Constants
const { GATSBY_BLOCKNATIVE_API_KEY } = process.env;

const HomePage = () => {
  // React hooks
  const [isLoading, setIsLoading] = useState(false);

  // Sound hooks
  const { playErrorSound, playSuccessSound } = useSounds();

  // Chakra hooks
  const { colorMode, toggleColorMode } = useColorMode();
  const { displayInfoMessage, displaySuccessMessage, displayErrorMessage } = useToast();

  // Animation hooks
  const { buttonContainerRef, animationContainerRef } = useAnimatedCoins(colorMode, isLoading);

  // Get ethers from network
  const getEthers = async ({ userAddress, userNetwork }) => {
    try {
      setIsLoading(true);
      displayInfoMessage(`This may take about ${faucetNetwork.serviceDuration} so we'll trigger a sound notification.`);

      const notify = Notify({ dappId: GATSBY_BLOCKNATIVE_API_KEY, networkId: getNetworkId(userNetwork) });
      const networkService = getNetworkService(userNetwork);
      const { body } = await networkService(`0x${userAddress}`);

      playSuccessSound({});
      displaySuccessMessage(body.message);
      notify.hash(body.txHash);
      // console.info(`Etherscan link: ${faucetNetwork.createEtherscanLink(body.txHash)}`);
    } catch (error) {
      const { body } = JSON.parse(error.message);
      playErrorSound({});
      displayErrorMessage(body.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Formik hooks
  const { values, errors, touched, handleChange, setFieldValue, handleSubmit } = useFormik({
    onSubmit: getEthers,
    validate: validateAddress,
    initialValues: { userNetwork: '', userAddress: '' },
  });

  // Formik handlers
  const handleUserAddressChange = useCallback((value) => setFieldValue('userAddress', value), [setFieldValue]);
  const handleUserNetworkChange = useCallback((value) => setFieldValue('userNetwork', value), [setFieldValue]);

  // Web3 hooks
  const web3Provider = useWeb3Provider();
  useUserAddress(web3Provider, handleUserAddressChange);
  useUserNetwork(web3Provider, handleUserNetworkChange);

  // Faucet hooks
  const faucetNetwork = useFaucetNetwork(values.userNetwork);

  return (
    <Box alignItems="center" d="flex" height="100vh" justifyContent="center" p={4} w="100%">
      <SEO title={`${values.userNetwork ? `Connected to ${capitalize(values.userNetwork)}` : ''}`} />

      <Box maxWidth="606px" width="100%">
        <Text as="h1" fontSize="4xl" fontWeight={600} pb={4} onClick={toggleColorMode}>
          Faucy
        </Text>

        <form onSubmit={handleSubmit}>
          <Box maxWidth={['auto', 'auto', '460px']}>
            <FormLabel mb={1}>Choose your network:</FormLabel>

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
                  _hover={{ transform: 'translate3d(0, -1px, 0)' }}
                  flex="1"
                  fontSize={'sm'}
                  fontWeight={600}
                  isDisabled={disabled}
                  textTransform="uppercase"
                  value={value}
                  willChange="transform"
                >
                  {label}
                </Radio>
              ))}
            </RadioButtonGroup>
          </Box>

          <Grid columnGap={6} mt={3} templateColumns={['auto', 'auto', 'minmax(auto, 460px) auto']}>
            <FormControl isDisabled={!faucetNetwork} isInvalid={errors.userAddress && touched.userAddress}>
              <FormLabel htmlFor="userAddress" mb={1}>
                Insert your address:
              </FormLabel>

              <InputGroup>
                <InputLeftAddon children="0x" />
                <Input
                  aria-label="Insert your address"
                  isInvalid={Boolean(errors.userAddress && touched.userAddress)}
                  maxLength={40}
                  name="userAddress"
                  placeholder="0x0000000000000000000000000000000000000000"
                  roundedLeft="0"
                  value={values.userAddress}
                  onChange={handleChange}
                />
              </InputGroup>

              <Box alignItems="center" d="flex" height="26px">
                <FormErrorMessage>{touched.userAddress && errors.userAddress}</FormErrorMessage>
              </Box>
            </FormControl>

            <FormControl isDisabled={!faucetNetwork || !values.userAddress} mt={[3, 3, 0]}>
              <FormLabel mb={1}>Ready?</FormLabel>

              <Button
                ref={buttonContainerRef}
                d="flex"
                isDisabled={!values.userNetwork || !values.userAddress}
                isLoading={isLoading}
                loadingText="Getting ethers"
                size="md"
                type="submit"
                variantColor="gray"
                width="100%"
              >
                {!isLoading && (
                  <Box
                    ref={animationContainerRef}
                    className="lottie-container"
                    d="inline"
                    ml={-2}
                    mr={2}
                    width="26px"
                  />
                )}
                <Text fontSize={'sm'} fontWeight={600} letterSpacing={0.4} textTransform="uppercase">
                  Submit
                </Text>
              </Button>
            </FormControl>
          </Grid>
        </form>
      </Box>

      <Footer colorMode={colorMode} faucetLink={faucetNetwork?.faucetLink} />
    </Box>
  );
};

export default HomePage;
