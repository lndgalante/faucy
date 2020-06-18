const convert = require('convert-seconds');

const getTxHash = (string) => {
  const [txHash] = string.match(/0x+[A-F,a-f,0-9]{64}/g) || [];
  return txHash;
};

const getKovanHours = (rawMessage) =>
  rawMessage.replace(/\d+\.\d+/g, (seconds) => `|${convert(seconds).hours}|`).split('|')[1];

const createSuccessMessage = (eth) => `You will receive ${eth} ethers into your account`;

const createGreylistMessage = (duration) => `Your address is greylisted for ${duration}`;

module.exports = { getTxHash, getKovanHours, createSuccessMessage, createGreylistMessage };
