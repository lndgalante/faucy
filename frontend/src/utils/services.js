import wretch from 'wretch';

// Constants
const { GATSBY_FAUCY_API_URL } = process.env;

// Helpers
const faucyApi = wretch().url(GATSBY_FAUCY_API_URL);

const getEthFromNetwork = (network) => (address) => faucyApi.url(`/faucet/${network}`).post({ address }).json();

export const services = {
  kovan: getEthFromNetwork('kovan'),
  goerli: getEthFromNetwork('goerli'),
  ropsten: getEthFromNetwork('ropsten'),
  rinkeby: getEthFromNetwork('rinkeby'),
};

export const getNetworkService = (networkName) => services[networkName];

export const getHealthStatus = () => faucyApi.url(`/health/check`).get().json();
