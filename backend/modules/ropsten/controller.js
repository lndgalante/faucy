// Utils
const { networkController } = require('../../utils/controllers');

// Resolver
const { getRopstenEth } = require('./resolver');

// Controller
const ropstenController = networkController(getRopstenEth);

module.exports = { ropstenController };
