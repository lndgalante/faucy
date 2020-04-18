import { useState, useEffect } from 'react'

const useUserAddress = (web3Provider) => {
  const [userAddress, setUserAddress] = useState('')

  useEffect(() => {
    if (!web3Provider) return
    web3Provider.provider.enable().then((accounts) => accounts.length && setUserAddress(accounts[0]))
  }, [web3Provider])

  return userAddress
}

export { useUserAddress }
