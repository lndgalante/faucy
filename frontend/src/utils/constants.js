export const NETWORKS = [
  {
    value: 'ropsten',
    label: 'Ropsten',
    disabled: false,
    availableEths: [1],
    link: 'https://faucet.ropsten.be',
    serviceDuration: '30 seconds',
  },
  {
    value: 'kovan',
    label: 'Kovan',
    disabled: false,
    availableEths: [1],
    link: 'https://faucet.kovan.network',
    serviceDuration: 0,
  },
  {
    value: 'rinkeby',
    label: 'Rinkeby',
    disabled: false,
    availableEths: [3, 7.5, 18.75],
    link: 'https://faucet.rinkeby.io',
    serviceDuration: 0,
  },
  {
    value: 'goerli',
    label: 'Goerli',
    disabled: false,
    availableEths: [0.05],
    link: 'https://goerli-faucet.slock.it',
    serviceDuration: '2 minutes',
  },
]
