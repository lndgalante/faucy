const ms = require('ms');
const unit = require('ethjs-unit');
const { Luminator } = require('@tictactrip/luminator');

// Utils
const { createSuccessMessage, createGreylistMessage } = require('../../../utils/strings');

// Constants
const { ROPSTEN_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

async function getRopstenEth({ address }) {
  try {
    const agent = new Luminator(PROXY_USERNAME, PROXY_PASSWORD);
    const { data } = await agent.fetch({ method: 'get', url: `${ROPSTEN_FAUCET_URL}/${address}` });

    const { amount, txhash: txHash, address: userAddress } = data;
    const ethers = unit.fromWei(amount, 'ether');

    return {
      statusCode: 200,
      body: {
        txHash,
        userAddress,
        message: createSuccessMessage(ethers),
      },
    };
  } catch (error) {
    const { status, text } = error;
    const { duration } = JSON.parse(text);

    return {
      statusCode: status,
      body: { message: createGreylistMessage(ms(duration)) },
    };
  }
}

module.exports = { getRopstenEth };
