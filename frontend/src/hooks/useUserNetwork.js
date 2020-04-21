import { useState, useEffect } from 'react';

// Constants
import { NETWORKS, NETWORK_IDS } from '../utils/constants';

const useUserNetwork = (web3Provider) => {
  const [userNetwork, setUserNetwork] = useState(null);

  useEffect(() => {
    if (!web3Provider) return;

    function updateNetwork(providerNetwork) {
      const allowedNetworks = NETWORKS.filter(({ disabled }) => !disabled).map(({ value }) => value);
      if (allowedNetworks.includes(providerNetwork)) setUserNetwork(providerNetwork);
    }

    web3Provider.getNetwork().then(({ name: providerNetwork }) => updateNetwork(providerNetwork));
    web3Provider.provider.on('networkChanged', (networkId) => updateNetwork(NETWORK_IDS[networkId]));
  }, [web3Provider]);

  return userNetwork;
};

export { useUserNetwork };
