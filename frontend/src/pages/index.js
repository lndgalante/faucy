import React, { useState, useEffect } from 'react'
import { useWeb3Injected } from '@openzeppelin/network/react'

import { Box, Grid, Input, Button, FormLabel, SimpleGrid, FormControl, RadioButtonGroup } from '@chakra-ui/core'
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
import { useFaucetNetwork } from '../hooks/useFaucetNetwork'

// Utils
import { services } from '../utils/services'

// Constants
import { NETWORKS } from '../utils/constants'

const HomePage = () => {
  // React hooks - Network
  const [network, setNetwork] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // React hooks - Address
  const [address, setAddress] = useState('')
  const [isValidAddress, setIsValidAddress] = useState(false)

  // Web3 hooks - Chakra hooks
  const injected = useWeb3Injected()

  // Faucet hooks
  const faucetNetwork = useFaucetNetwork(network)

  // Sound hooks
  const { playErrorSound, playSuccessSound } = useSounds()

  // Toast hooks
  const { displayInfoMessage, displaySuccessMessage, displayErrorMessage } = useToast()

  // Handlers - Form
  const handleNetworkChange = (network) => setNetwork(network)
  const handleAddressChange = ({ target }) => setAddress(target.value)

  // Handlers - Submit
  const handleEthSubmit = async () => {
    const isInvalidAddress = !isAddress(address)
    if (isInvalidAddress) return setIsValidAddress(isInvalidAddress)

    try {
      setIsLoading(true)
      displayInfoMessage(`This may take about ${faucetNetwork.serviceDuration} so we'll trigger a sound notification.`)

      const networkService = services[network]
      const { body } = await networkService(address)

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

  // Effect - Ask permission to the user provider
  useEffect(() => {
    if (injected?.requestAuth) injected.requestAuth()
  }, [injected, injected?.requestAuth])

  // Effect - Update address from user provider
  useEffect(() => {
    if (injected?.connected && injected?.accounts?.length) setAddress(injected.accounts[0])
  }, [injected, injected?.connected])

  // Effect - Update network from user provider
  useEffect(() => {
    if (!injected || !injected.networkName) return

    const providerNetwork = injected.networkName.toLowerCase()
    const allowedNetworks = NETWORKS.filter(({ disabled }) => !disabled).map(({ value }) => value)

    if (allowedNetworks.includes(providerNetwork)) setNetwork(providerNetwork)
  }, [injected, injected?.networkName])

  return (
    <Box w="100%" height="100vh" bg="gray.50" p={4} d="flex" justifyContent="center" alignItems="center">
      <SEO lang="en" title={`${network ? `Connected to ${capitalize(network)}` : ''}`} />

      <SimpleGrid maxWidth="610px" width="100%">
        <Grid columnGap={6} templateColumns={['auto', 'auto', 'minmax(auto, 426px) auto']}>
          <FormControl>
            <FormLabel color="gray.700" mb={1}>
              Choose your network:
            </FormLabel>

            <RadioButtonGroup
              isInline
              d="flex"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
              value={network}
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
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Insert your address:
            </FormLabel>

            <Input
              color="gray.700"
              value={address}
              maxLength={42}
              isInvalid={isValidAddress}
              onChange={handleAddressChange}
              _hover={{ boxShadow: 'sm' }}
              aria-label="Insert your address"
              placeholder="0x0000000000000000000000000000000000000000"
            />
          </FormControl>

          <FormControl isDisabled={!faucetNetwork || !address} mt={[3, 3, 0]}>
            <FormLabel color="gray.700" mb={1}>
              Ready?
            </FormLabel>

            <Button
              width="100%"
              d="flex"
              size="md"
              bg="gray.700"
              color="white"
              loadingText="Getting ethers"
              isDisabled={!network}
              isLoading={isLoading}
              _hover={{ boxShadow: 'sm' }}
              _active={{ boxShadow: 'md' }}
              onClick={handleEthSubmit}
              disabled={!faucetNetwork || !address}
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
