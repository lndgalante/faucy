import { useState, useEffect } from 'react';

// Constants
import { NETWORKS } from '../utils/constants';

const useFaucetNetwork = (network) => {
  const [faucetNetwork, setFaucetNetwork] = useState(null);

  // Effect - Update faucet network
  useEffect(() => {
    if (!network) return;

    const foundNetwork = NETWORKS.find(({ value }) => value === network);
    if (foundNetwork) setFaucetNetwork(foundNetwork);
  }, [network]);

  return faucetNetwork;
};

export { useFaucetNetwork };
