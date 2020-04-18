import { useState, useEffect } from 'react'

// Constants
import { NETWORKS } from '../utils/constants'

const useUserNetwork = (web3Provider) => {
  const [userNetwork, setUserNetwork] = useState(null)

  useEffect(() => {
    if (!web3Provider) return

    web3Provider.getNetwork().then(({ name: providerNetwork }) => {
      const allowedNetworks = NETWORKS.filter(({ disabled }) => !disabled).map(({ value }) => value)
      if (allowedNetworks.includes(providerNetwork)) setUserNetwork(providerNetwork)
    })
  }, [web3Provider])

  return [userNetwork, setUserNetwork]
}

export { useUserNetwork }
