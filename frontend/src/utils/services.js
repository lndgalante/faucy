import wretch from 'wretch';

// Constants - Environment Variables
const { GATSBY_FAUCY_API_URL } = process.env;

// Helpers
const faucyApi = wretch().url(GATSBY_FAUCY_API_URL);

const getEthFromNetwork = (network) => (address) => faucyApi.url(`/${network}`).post({ address }).json();

export const services = {
  kovan: getEthFromNetwork('kovan'),
  goerli: getEthFromNetwork('goerli'),
  ropsten: getEthFromNetwork('ropsten'),
  rinkeby: getEthFromNetwork('rinkeby'),
};
