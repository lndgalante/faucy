// Utils
const { networkController } = require('../../utils/controllers');

// Resolver
const { getRinkebyEth } = require('./resolver');

// Controller
const rinkebyController = networkController(getRinkebyEth);

module.exports = { rinkebyController };
