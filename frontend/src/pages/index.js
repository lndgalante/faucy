import React, { useState, useEffect } from 'react'
import useSound from 'use-sound'
import { FaEthereum } from 'react-icons/fa'
import { useWeb3Injected } from '@openzeppelin/network/react'

import { Box, Grid, Input, Select, Button, FormLabel, SimpleGrid, FormControl, RadioButtonGroup } from '@chakra-ui/core'
import capitalize from 'lodash.capitalize'
import { isAddress } from 'ethereum-address'

// Assets
import errorSound from '../assets/sounds/error.wav'
import successSound from '../assets/sounds/success.wav'

// UI Components
import { SEO } from '../ui/components/Seo'
import { Radio } from '../ui/components/Radio'

// Components
import { Footer } from '../components/Footer'

// Hooks
import { useToast } from '../hooks/useToast'

// Utils
import { services } from '../utils/services'
import { NETWORKS } from '../utils/constants'

const HomePage = () => {
  // React hooks - Network
  const [network, setNetwork] = useState(null)
  const [faucetLink, setFaucetLink] = useState(null)

  // React hooks - Eth
  const [eth, setEth] = useState('')
  const [availableEths, setAvailableEths] = useState([])

  // React hooks - Address
  const [address, setAddress] = useState('')
  const [isValidAddress, setIsValidAddress] = useState(false)

  // React hooks - Async
  const [isLoading, setIsLoading] = useState(false)
  const [serviceDuration, setServiceDuration] = useState(null)

  // Web3 hooks
  const injected = useWeb3Injected()

  // Chakra hooks
  const { displayLoadingMessage, displaySuccessMessage, displayErrorMessage } = useToast()

  // Sound hooks
  const [playErrorSound] = useSound(errorSound)
  const [playSuccessSound] = useSound(successSound)

  // Handlers
  const handleNetworkChange = (network) => setNetwork(network)

  const handleEthChange = ({ target: { value } }) => setEth(value)

  const handleAddressChange = ({ target: { value } }) => setAddress(value)

  const handleEthClick = async () => {
    const isInvalidAddress = !isAddress(address)

    setIsValidAddress(isInvalidAddress)
    if (isInvalidAddress) return displayErrorMessage(`Address ${address} is not valid.`)

    try {
      setIsLoading(true)
      displayLoadingMessage(`This may take about ${serviceDuration} so we'll trigger a sound notification 🔊`)

      const networkService = services[network]
      const data = await networkService(address)

      playSuccessSound({})
      displaySuccessMessage(data.message)
    } catch (error) {
      const { message } = JSON.parse(error.message)

      playErrorSound({})
      displayErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Effect - Dependencies constants
  const networkName = injected?.networkName
  const requestAuth = injected?.requestAuth
  const connected = injected?.connected

  // Effect - Update available eth and selected eth when network changes
  useEffect(() => {
    if (!network) return

    const foundNetwork = NETWORKS.find(({ value }) => value === network)
    if (!foundNetwork) return displayErrorMessage(`${capitalize(network)} is not supported.`)

    const { availableEths, link, serviceDuration } = foundNetwork
    setAvailableEths(availableEths)
    setServiceDuration(serviceDuration)

    setEth(String(availableEths[0]))
    setFaucetLink(link)
  }, [network, displayErrorMessage])

  // Effect - Update network from user provider
  useEffect(() => {
    if (!injected || !injected.networkName) return
    setNetwork(injected.networkName.toLowerCase())
  }, [injected, networkName])

  // Effect - Ask permission to the user provider
  useEffect(() => {
    if (!injected || !injected.requestAuth) return
    injected.requestAuth()
  }, [injected, requestAuth])

  // Effect - Update address from user provider
  useEffect(() => {
    if (!injected || !injected.connected) return
    const [account] = injected.accounts
    setAddress(account)
  }, [injected, connected])

  return (
    <Box w="100%" height="100vh" bg="gray.50" p={4} d="flex" justifyContent="center" alignItems="center">
      <SEO title={`${network ? `Connected on ${capitalize(network)}` : ''}`} />

      <SimpleGrid>
        <Grid columnGap={6} templateColumns={['auto', 'auto', 'minmax(auto, 432px) auto']}>
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

          <FormControl mt={[2, 2, 0, 0]} isDisabled={!network}>
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Choose total eth:
            </FormLabel>
            <Select
              id="eth"
              color="gray.700"
              minWidth="186px"
              iconSize={4}
              icon={FaEthereum}
              onChange={handleEthChange}
              _hover={{ boxShadow: 'sm' }}
              _active={{ boxShadow: 'md' }}
              value={eth}
              placeholder={availableEths ? null : 'Gave me 1 eth!'}
            >
              {availableEths &&
                availableEths.map((availableEth) => (
                  <option key={availableEth} value={availableEth}>
                    {availableEth} ether{availableEth === 1 ? '' : 's'}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid columnGap={6} mt={2} templateColumns={['auto', 'auto', 'minmax(auto, 432px) auto']}>
          <FormControl isDisabled={!eth}>
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Insert your address:
            </FormLabel>

            <Input
              color="gray.700"
              value={address}
              isInvalid={isValidAddress}
              onChange={handleAddressChange}
              aria-label="Insert your address"
              placeholder="0x0000000000000000000000000000000000000000"
            />
          </FormControl>

          <FormControl mt={[2, 2, 0, 0]} isDisabled={!address}>
            <FormLabel htmlFor="eth" color="gray.700" mb={1}>
              Ready?
            </FormLabel>

            <Button
              width="100%"
              d="flex"
              size="md"
              bg="gray.600"
              color="white"
              isDisabled={!network}
              isLoading={isLoading}
              _hover={{ boxShadow: 'sm' }}
              _active={{ boxShadow: 'md' }}
              onClick={handleEthClick}
            >
              Send eth
            </Button>
          </FormControl>
        </Grid>
      </SimpleGrid>

      <Footer faucetLink={faucetLink} />
    </Box>
  )
}

export default HomePage
