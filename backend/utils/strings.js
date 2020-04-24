const convert = require('convert-seconds');

const addressRegex = /0x+[A-F,a-f,0-9]{40}/g;

const parseKovanMessage = (rawMessage) =>
  rawMessage.replace(' seconds.', '').replace(/\d+\.\d+/g, (seconds) => `${convert(seconds).hours} hours.`);

const createSuccessMessage = (eth) => `You will receive ${eth} ethers into your account.`;

module.exports = { addressRegex, parseKovanMessage, createSuccessMessage };
