const ms = require('ms');
const unit = require('ethjs-unit');
const capitalize = require('lodash.capitalize');
const { Luminator } = require('@tictactrip/luminator');

// Utils
const { createSuccessMessage } = require('../../utils/strings');

// Constants
const { ROPSTEN_FAUCET_URL, PROXY_USERNAME, PROXY_PASSWORD } = process.env;
const agent = new Luminator(PROXY_USERNAME, PROXY_PASSWORD);

async function getRopstenEth({ address }) {
  try {
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
    const { message, duration } = JSON.parse(text);

    return {
      statusCode: status,
      body: {
        message: `${capitalize(message)}. Your greylisted duration is for ${ms(
          duration,
        )}. In the meanwhile you can use it with another account.`,
      },
    };
  }
}

module.exports = { getRopstenEth };
