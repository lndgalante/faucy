import { useMemo } from 'react';
import { ethers } from 'ethers';

const isDOMavailable = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

const useWeb3Provider = () => {
  const windowProvider = window?.ethereum || window?.web3;
  const hasProvider = isDOMavailable && windowProvider;

  const web3Provider = useMemo(() => (hasProvider ? new ethers.providers.Web3Provider(windowProvider) : null), [
    hasProvider,
    windowProvider,
  ]);

  return web3Provider;
};

export { useWeb3Provider };
