import { useMemo } from 'react';
import { ethers } from 'ethers';

const isDOMavailable = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

const useWeb3Provider = () => {
  const web3Provider = useMemo(
    () =>
      isDOMavailable && (window?.ethereum || window?.web3)
        ? new ethers.providers.Web3Provider(window?.ethereum || window?.web3)
        : null,
    [],
  );

  return web3Provider;
};

export { useWeb3Provider };
