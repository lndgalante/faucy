const convert = require('convert-seconds');

const parseKovanMessage = (rawMessage) =>
  rawMessage.replace(' seconds.', '').replace(/\d+\.\d+/g, (seconds) => `${convert(seconds).hours} hours.`);

module.exports = { parseKovanMessage };
