const wretch = require('wretch');
const fetch = require('node-fetch');

wretch().polyfills({ fetch });

const services = {
  ropsten: (address) => wretch(`https://faucet.ropsten.be/donate/${address}`).get().res(),
};

module.exports = { services };
