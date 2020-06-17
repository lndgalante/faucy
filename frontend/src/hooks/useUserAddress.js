import { useEffect } from 'react';

export const useUserAddress = (web3Provider, setUserAddress, emitter) => {
  useEffect(() => {
    if (!web3Provider) return;

    function updateAddress(accounts) {
      if (!accounts.length) return;
      setUserAddress(accounts[0]);
    }

    emitter.on('updateAddress', updateAddress);
    web3Provider.provider.on('accountsChanged', updateAddress);
  }, [web3Provider, setUserAddress, emitter]);
};
