const ms = require('ms');
const unit = require('ethjs-unit');
const capitalize = require('lodash.capitalize');

// Utils
const { services } = require('../utils/services');

async function getRopstenEth({ address }) {
  try {
    const response = await services.ropsten(address);
    const { address: _address, amount, txhash } = await response.json();

    return {
      statusCode: 200,
      message: `You have received ${unit.fromWei(amount, 'ether')} ethers to your account.`,
    };
  } catch (error) {
    const { status, text } = error;
    const { message, duration, address: _address } = JSON.parse(text);

    return {
      statusCode: status,
      message: `${capitalize(message)}. You are greylisted duration is for ${ms(duration)}.`,
    };
  }
}

module.exports = { getRopstenEth };
