import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Grid,
  Text,
  Input,
  Button,
  FormLabel,
  FormControl,
  RadioButtonGroup,
  FormErrorMessage,
  useColorMode,
} from '@chakra-ui/core'

import capitalize from 'lodash.capitalize'

// UI Components
import { SEO } from '../ui/components/Seo'
import { Radio } from '../ui/components/Radio'

// Components
import { Footer } from '../components/Footer'

// Hooks
import { useToast } from '../hooks/useToast'
import { useSounds } from '../hooks/useSounds'
import { useUpdateValue } from '../hooks/useUpdateValue'
import { useUserNetwork } from '../hooks/useUserNetwork'
import { useUserAddress } from '../hooks/useUserAddress'
import { useWeb3Provider } from '../hooks/useWeb3Provider'
import { useFaucetNetwork } from '../hooks/useFaucetNetwork'
import { useAnimatedCoins } from '../hooks/useAnimatedCoins'

// Utils
import { services } from '../utils/services'
import { NETWORKS } from '../utils/constants'
import { validateAddress } from '../utils/validators'

const HomePage = () => {
  // React hooks
  const [isLoading, setIsLoading] = useState(false)

  // Web3 hooks
  const web3Provider = useWeb3Provider()
  const userAddress = useUserAddress(web3Provider)
  const userNetwork = useUserNetwork(web3Provider)

  // Form hooks
  const { handleSubmit, register, errors, watch, setValue } = useForm()

  // Update values
  const { userNetwork: _userNetwork } = watch()
  useUpdateValue({ name: 'userNetwork', value: userNetwork, register, setValue })
  useUpdateValue({ name: 'userAddress', value: userAddress, register, setValue })

  // Faucet hooks
  const faucetNetwork = useFaucetNetwork(_userNetwork)

  // Sound hooks
  const { playErrorSound, playSuccessSound } = useSounds()

  // Chakra hooks
  const { colorMode, toggleColorMode } = useColorMode()
  const { displayInfoMessage, displaySuccessMessage, displayErrorMessage } = useToast()

  // Animation hooks
  const { buttonContainerRef, animationContainerRef } = useAnimatedCoins(colorMode, isLoading)

  // Handlers
  const onSubmit = async ({ userAddress, userNetwork }) => {
    console.log('onSubmit -> userAddress', userAddress)
    console.log('onSubmit -> userNetwork', userNetwork)

    try {
      setIsLoading(true)
      displayInfoMessage(`This may take about ${faucetNetwork.serviceDuration} so we'll trigger a sound notification.`)

      const networkService = services[userNetwork]
      const { body } = await networkService(userAddress)

      playSuccessSound({})
      displaySuccessMessage(body.message)
      console.info(`Etherscan link: ${faucetNetwork.createEtherscanLink(body.txHash)}`)
    } catch (error) {
      const { body } = JSON.parse(error.message)
      playErrorSound({})
      displayErrorMessage(body.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box w="100%" height="100vh" p={4} d="flex" justifyContent="center" alignItems="center">
      <SEO lang="en" title={`${userNetwork ? `Connected to ${capitalize(userNetwork)}` : ''}`} />

      <Box maxWidth="610px" width="100%">
        <Text as="h1" fontSize="4xl" fontWeight={800} pb={4} onClick={toggleColorMode}>
          Faucy
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box maxWidth={['auto', 'auto', '426px']}>
            <FormLabel mb={1}>Choose your network:</FormLabel>

            <RadioButtonGroup
              isInline
              d="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              name="userNetwork"
              value={_userNetwork}
              onChange={(value) => setValue('userNetwork', value)}
            >
              {NETWORKS.map(({ value, label, disabled }) => (
                <Radio
                  flex="1"
                  key={value}
                  value={value}
                  isDisabled={disabled}
                  _hover={{ boxShadow: 'sm' }}
                  _active={{ boxShadow: 'md' }}
                >
                  {label}
                </Radio>
              ))}
            </RadioButtonGroup>
          </Box>

          <Grid columnGap={6} mt={3} templateColumns={['auto', 'auto', 'minmax(auto, 426px) auto']}>
            <FormControl isDisabled={!faucetNetwork} isInvalid={errors.userAddress}>
              <FormLabel htmlFor="userAddress" mb={1}>
                Insert your address:
              </FormLabel>

              <Input
                ref={register({ validate: validateAddress })}
                maxLength={42}
                name="userAddress"
                isInvalid={Boolean(errors.userAddress)}
                _hover={{ boxShadow: 'sm' }}
                aria-label="Insert your address"
                placeholder="0x0000000000000000000000000000000000000000"
              />
              <Box height="26px" d="flex" alignItems="center">
                <FormErrorMessage>{errors.userAddress && errors.userAddress.message}</FormErrorMessage>
              </Box>
            </FormControl>

            <FormControl isDisabled={!faucetNetwork || !userAddress} mt={[3, 3, 0]}>
              <FormLabel mb={1}>Ready?</FormLabel>

              <Button
                width="100%"
                d="flex"
                size="md"
                variantColor="gray"
                loadingText="Getting ethers"
                isDisabled={!userNetwork}
                isLoading={isLoading}
                _hover={{ boxShadow: 'sm' }}
                _active={{ boxShadow: 'md' }}
                type="submit"
                disabled={!faucetNetwork || !userAddress}
                ref={buttonContainerRef}
              >
                {!isLoading && <Box d="inline" width="26px" ml={-2} mr={2} ref={animationContainerRef} />}
                <Text>Send ethers</Text>
              </Button>
            </FormControl>
          </Grid>
        </form>
      </Box>

      <Footer faucetLink={faucetNetwork?.faucetLink} colorMode={colorMode} />
    </Box>
  )
}

export default HomePage
