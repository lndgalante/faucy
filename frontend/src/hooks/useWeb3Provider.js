import { useEffect, useMemo } from 'react';
import { ethers } from 'ethers';

// Utils
import { isDOMavailable } from '../utils/dom';

export const useWeb3Provider = () => {
  const web3Provider = useMemo(
    () =>
      isDOMavailable && (window?.ethereum || window?.web3)
        ? new ethers.providers.Web3Provider(window?.ethereum || window?.web3)
        : null,
    [],
  );

  useEffect(() => {
    if (isDOMavailable && window?.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
    }
  }, []);

  return web3Provider;
};
