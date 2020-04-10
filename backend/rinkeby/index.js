const ms = require('ms');
const Twit = require('twit');
const { isAddress } = require('ethereum-address');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Twit setup

const twitOptions = {
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: '',
  timeout_ms: ms('1m'),
  strictSSL: true,
};

const T = new Twit(twitOptions);

const tweet = (message) => T.post('statuses/update', { status: message });

// Faucet utils
const createRinkebyFaucetMessage = (address) => {
  return `Requesting faucet funds into ${address} on the #Rinkeby #Ethereum test network.`;
};

const createTweetLink = (id) => {
  return `https://twitter.com/faucy3/status/${id}`;
};

puppeteer.use(StealthPlugin());

async function tweetFaucet({ address }) {
  if (isAddress(address)) {
    console.log('It`s a valid address!');
  }

  const faucetMessage = createRinkebyFaucetMessage(address);
  console.log('tweetFaucet -> faucetMessage', faucetMessage);

  const { data } = await tweet(faucetMessage);
  const { id_str: tweetId } = data;

  const tweetLink = createTweetLink(tweetId);
  console.log('tweetFaucet -> tweetLink', tweetLink);
}

tweetFaucet({ address: '0x6061F0c4F3ca310A72442381Ed56B16054b948F4' });
