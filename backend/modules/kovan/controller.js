// Utils
const { networkController } = require('../../utils/controllers');

// Resolver
const { getKovanEth } = require('./resolver');

// Controller
const kovanController = networkController(getKovanEth);

module.exports = { kovanController };
