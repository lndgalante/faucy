import { useState, useEffect } from 'react';

// Constants
import { NETWORKS } from '../utils/constants';

export const useFaucetNetwork = (network) => {
  const [faucetNetwork, setFaucetNetwork] = useState(null);

  useEffect(() => {
    if (!network) return;

    const foundNetwork = NETWORKS.find(({ value }) => value === network);
    if (foundNetwork) setFaucetNetwork(foundNetwork);
  }, [network]);

  return faucetNetwork;
};
