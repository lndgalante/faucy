import { useMemo } from 'react';
import Notify from 'bnc-notify';

// Constants
import { NETWORK_NAMES } from '../utils/constants';
const { GATSBY_BLOCKNATIVE_API_KEY } = process.env;

const notifyGenerator = (networkId) => {
  return Notify({ dappId: GATSBY_BLOCKNATIVE_API_KEY, networkId });
};

export const useNotify = () => {
  const notifyNetworks = useMemo(
    () => ({
      ropsten: notifyGenerator(NETWORK_NAMES.ropsten),
      rinkeby: notifyGenerator(NETWORK_NAMES.rinkeby),
      goerli: notifyGenerator(NETWORK_NAMES.goerli),
      kovan: notifyGenerator(NETWORK_NAMES.kovan),
    }),
    [],
  );

  return notifyNetworks;
};
