const delay = require('delay');
const dotenv = require('dotenv');
const wretch = require('wretch');
const fetch = require('node-fetch');

// Initial config
dotenv.config();
wretch().polyfills({ fetch });

// Constants
const { FAUCY_API_URL_HTTPS } = process.env;

// Helpers
const faucyApi = wretch().url(FAUCY_API_URL_HTTPS);

const getEthFromNetwork = (network) => (address) => faucyApi.url(`/faucet/${network}`).post({ address }).json();

const services = {
  kovan: getEthFromNetwork('kovan'),
  goerli: getEthFromNetwork('goerli'),
  ropsten: getEthFromNetwork('ropsten'),
  rinkeby: getEthFromNetwork('rinkeby'),
};

const getNetworkService = (networkName) => services[networkName];

async function requestEthers(address, network) {
  console.log('requestEthers -> address', address);
  console.log('requestEthers -> network', network);

  try {
    const networkService = getNetworkService(network);
    const { body } = await networkService(address);
    console.log('requestEthers -> body', body);
    await delay(5000);

    requestEthers(address, network);
  } catch (error) {
    console.log('requestEthers -> error', error);
  }
}

requestEthers('0x1DbB9983148705C84eFf23d93F43b12920DEF6c3', 'rinkeby');

/* Idea:
  Create account (Web3) -> Send to that new account ->  Send the eth from that account to another one
*/
