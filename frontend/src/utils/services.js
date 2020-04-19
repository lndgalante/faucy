import wretch from 'wretch';

// Constants - Environment Variables
const { GATSBY_FAUCY_API_URL } = process.env;

// Helpers
const faucyApi = wretch().url(GATSBY_FAUCY_API_URL);

export const services = {
  kovan: (address) => faucyApi.url('/kovan').post({ address }).json(),
  goerli: (address) => faucyApi.url('/goerli').post({ address }).json(),
  ropsten: (address) => faucyApi.url('/ropsten').post({ address }).json(),
};
