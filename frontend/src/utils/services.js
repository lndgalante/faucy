import wretch from 'wretch';
import { NETWORK_STATUS } from '../utils/constants';

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

export const getNetworkStatus = async (network) => {
  const response = await faucyApi.url(`/health/${network}`).get().json();
  const status = response['statusCode'];
  return status === 200 ? NETWORK_STATUS.up : NETWORK_STATUS.down;
};
