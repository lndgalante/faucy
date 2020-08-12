const delay = require('delay');
const dotenv = require('dotenv');
const wretch = require('wretch');
const fetch = require('node-fetch');
const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');

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

const getCurrentGasPrices = async () => {
  const { safeLow, average, fast } = await wretch().url('https://ethgasstation.info/json/ethgasAPI.json').get().json();

  const prices = {
    low: safeLow / 10,
    medium: average / 10,
    high: fast / 10,
  };

  console.log('\r\n');
  console.log(`Current ETH Gas Prices (in GWEI):`);
  console.log('\r\n');
  console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`);
  console.log(`Standard: ${prices.medium} (transaction completes in < 5 minutes)`);
  console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`);
  console.log('\r\n');

  return prices;
};

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/0dd208d9f5cd4d5d9a10f196eb15cb61'));

async function requestEthers(network) {
  try {
    // sender wallet
    const sendWallet = '0x1DbB9983148705C84eFf23d93F43b12920DEF6c3';

    // create account
    const { address, privateKey } = web3.eth.accounts.create();
    console.log('requestEthers -> address', address);

    // get nonce from my wallet
    const nonce = await web3.eth.getTransactionCount(address);
    console.log('requestEthers -> nonce', nonce);

    // get gas prices
    const gasPrices = await getCurrentGasPrices();
    console.log('requestEthers -> gasPrices', gasPrices);

    // get ethers
    const networkService = getNetworkService(network);
    const response = await networkService(address);
    console.log('requestEthers -> response', response);

    // tx details
    const amountToSend = 0.15;
    const details = {
      nonce,
      gas: 21000,
      chainId: 4,
      to: sendWallet,
      gasPrice: gasPrices.low * 1000000000,
      value: web3.utils.toHex(web3.utils.toWei(amountToSend, 'ether')),
    };

    // create tx
    const transaction = new EthereumTx(details);

    // sign tx
    transaction.sign(Buffer.from(privateKey, 'hex'));
    const serializedTransaction = transaction.serialize();

    // send tx
    const transactionId = web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex'));
    const url = `https://rinkeby.etherscan.io/tx/${transactionId}`;
    console.log('requestEthers -> url', url);

    await delay(5000);

    requestEthers(network);
  } catch (error) {
    console.log('requestEthers -> error', error);
  }
}

requestEthers('rinkeby');

/* Idea:
  Create account (Web3) -> Send to that new account ->  Send the eth from that account to another one
*/
