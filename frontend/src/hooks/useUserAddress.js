import { useEffect } from 'react';

const useUserAddress = (web3Provider, setUserAddress) => {
  useEffect(() => {
    if (!web3Provider) return;

    function updateAddress(accounts) {
      if (!accounts.length) return;
      setUserAddress(accounts[0]);
    }

    web3Provider.provider.enable().then(updateAddress);
    web3Provider.provider.on('accountsChanged', updateAddress);
  }, [web3Provider, setUserAddress]);
};

export { useUserAddress };
