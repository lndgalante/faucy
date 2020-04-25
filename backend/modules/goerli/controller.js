// Utils
const { networkController } = require('../../utils/controllers');

// Resolver
const { getGoerliEth } = require('./resolver');

// Controller
const goerliController = networkController(getGoerliEth);

module.exports = { goerliController };
