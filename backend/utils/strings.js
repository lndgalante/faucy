const convert = require('convert-seconds');

const parseKovanMessage = (rawMessage) =>
  rawMessage.replace(' seconds.', '').replace(/\d+\.\d+/g, (seconds) => `${convert(seconds).hours} hours.`);

const createSuccessMessage = (eth) => `You will receive ${eth} ethers into your account.`;

module.exports = { parseKovanMessage, createSuccessMessage };
