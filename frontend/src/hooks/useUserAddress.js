import { useState, useEffect } from 'react';

const useUserAddress = (web3Provider) => {
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    if (!web3Provider) return;

    function updateAddress(accounts) {
      if (!accounts.length) return;
      setUserAddress(accounts[0]);
    }

    web3Provider.provider.enable().then((accounts) => updateAddress(accounts));
    web3Provider.provider.on('accountsChanged', (accounts) => updateAddress(accounts));
  }, [web3Provider]);

  return userAddress;
};

export { useUserAddress };
