const ms = require('ms');
const unit = require('ethjs-unit');
const capitalize = require('lodash.capitalize');

// Utils
const { wretch } = require('../../utils/fetch');

async function getRopstenEth({ address }) {
  try {
    const response = await wretch(`https://faucet.ropsten.be/donate/${address}`).get().res();
    const { amount, txhash: txHash } = await response.json();

    return {
      statusCode: 200,
      metadata: { txHash },
      message: `You will receive ${unit.fromWei(amount, 'ether')} ethers to your account.`,
    };
  } catch (error) {
    const { status, text } = error;
    const { message, duration } = JSON.parse(text);

    return {
      statusCode: status,
      message: `${capitalize(message)}. You are greylisted duration is for ${ms(duration)}.`,
    };
  }
}

module.exports = { getRopstenEth };