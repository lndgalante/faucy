const express = require('express');

// Custom Middlewares
const { userAddress } = require('../../middlewares/address');

// Controllers
const { kovanController } = require('./kovan/controller');
const { goerliController } = require('./goerli/controller');
const { ropstenController } = require('./ropsten/controller');
const { rinkebyController } = require('./rinkeby/controller');

// Express - Faucet endpoints
const faucetRouter = express.Router();

faucetRouter.use(userAddress);
faucetRouter.post('/kovan', kovanController);
faucetRouter.post('/goerli', goerliController);
faucetRouter.post('/ropsten', ropstenController);
faucetRouter.post('/rinkeby', rinkebyController);

module.exports = { faucetRouter };
