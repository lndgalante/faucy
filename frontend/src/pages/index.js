import React, { useState } from 'react'

import {
  Box,
  Grid,
  Text,
  Input,
  Button,
  FormLabel,
  SimpleGrid,
  FormControl,
  RadioButtonGroup,
  useColorMode,
} from '@chakra-ui/core'
import capitalize from 'lodash.capitalize'
import { isAddress } from 'ethereum-address'

// UI Components
import { SEO } from '../ui/components/Seo'
import { Radio } from '../ui/components/Radio'

// Components
import { Footer } from '../components/Footer'

// Hooks
import { useToast } from '../hooks/useToast'
import { useSounds } from '../hooks/useSounds'
import { useUserNetwork } from '../hooks/useUserNetwork'
import { useUserAddress } from '../hooks/useUserAddress'
import { useWeb3Provider } from '../hooks/useWeb3Provider'
import { useFaucetNetwork } from '../hooks/useFaucetNetwork'

// Utils
import { services } from '../utils/services'

// Constants
import { NETWORKS } from '../utils/constants'

const HomePage = () => {
  // React hooks
  const [isLoading, setIsLoading] = useState(false)
  const [isValidAddress, setIsValidAddress] = useState(false)

  // Web3 hooks
  const web3Provider = useWeb3Provider()

  // User hooks
  const [userAddress, setUserAddress] = useUserAddress(web3Provider)
  const [userNetwork, setUserNetwork] = useUserNetwork(web3Provider)

  // Faucet hooks
  const faucetNetwork = useFaucetNetwork(userNetwork)

  // Sound hooks
  const { playErrorSound, playSuccessSound } = useSounds()

  // Chakra hooks
  const { colorMode, toggleColorMode } = useColorMode()
  const { displayInfoMessage, displaySuccessMessage, displayErrorMessage } = useToast()

  // Handlers - Form
  const handleNetworkChange = (network) => setUserNetwork(network)
  const handleAddressChange = ({ target }) => setUserAddress(target.value)

  // Handlers - Submit
  const handleEthSubmit = async () => {
    const isInvalidAddress = !isAddress(userAddress)
    if (isInvalidAddress) return setIsValidAddress(isInvalidAddress)

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

      <SimpleGrid maxWidth="610px" width="100%">
        <Text as="h1" fontSize="4xl" fontWeight={800} pb={4} onClick={toggleColorMode}>
          Faucy
        </Text>

        <Grid columnGap={6} templateColumns={['auto', 'auto', 'minmax(auto, 426px) auto']}>
          <FormControl>
            <FormLabel mb={1}>Choose your network:</FormLabel>

            <RadioButtonGroup
              isInline
              d="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              value={userNetwork}
              onChange={handleNetworkChange}
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
          </FormControl>
        </Grid>

        <Grid columnGap={6} mt={3} templateColumns={['auto', 'auto', 'minmax(auto, 426px) auto']}>
          <FormControl isDisabled={!faucetNetwork}>
            <FormLabel htmlFor="eth" mb={1}>
              Insert your address:
            </FormLabel>

            <Input
              value={userAddress}
              maxLength={42}
              isInvalid={isValidAddress}
              onChange={handleAddressChange}
              _hover={{ boxShadow: 'sm' }}
              aria-label="Insert your address"
              placeholder="0x0000000000000000000000000000000000000000"
            />
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
              onClick={handleEthSubmit}
              disabled={!faucetNetwork || !userAddress}
            >
              Send ethers
            </Button>
          </FormControl>
        </Grid>
      </SimpleGrid>

      <Footer faucetLink={faucetNetwork?.faucetLink} />
    </Box>
  )
}

export default HomePage
