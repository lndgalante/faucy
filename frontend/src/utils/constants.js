export const NETWORKS = [
  {
    value: 'ropsten',
    label: 'Ropsten',
    disabled: false,
    serviceDuration: '30 seconds',
    link: 'https://faucet.ropsten.be',
    createEtherscanLink: (txHash) => `https://ropsten.etherscan.io/tx/${txHash}`,
  },
  {
    value: 'kovan',
    label: 'Kovan',
    disabled: false,
    serviceDuration: '1 minute',
    link: 'https://faucet.kovan.network',
    createEtherscanLink: (txHash) => `https://kovan.etherscan.io/tx/${txHash}`,
  },
  {
    value: 'rinkeby',
    label: 'Rinkeby',
    disabled: false,
    serviceDuration: '1 minute',
    link: 'https://faucet.rinkeby.io',
    createEtherscanLink: (txHash) => `https://rinkeby.etherscan.io/tx/${txHash}`,
  },
  {
    value: 'goerli',
    label: 'Goerli',
    disabled: false,
    serviceDuration: '2 minutes',
    link: 'https://goerli-faucet.slock.it',
    createEtherscanLink: (txHash) => `https://goerli.etherscan.io/tx/${txHash}`,
  },
];

export const NETWORK_IDS = {
  1: 'main',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  42: 'kovan',
};

export const NETWORK_NAMES = {
  main: 1,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  kovan: 42,
};

export const getNetworkName = (networkId) => NETWORK_IDS[networkId];
export const getNetworkId = (networkName) => NETWORK_NAMES[networkName] || NETWORK_NAMES.main;
