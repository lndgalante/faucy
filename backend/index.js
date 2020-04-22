// Dotenv
require('dotenv').config();

// Utils
const { setupExpressApp } = require('./utils/express');

// Controllers
const { kovanController } = require('./modules/kovan/controller');
const { goerliController } = require('./modules/goerli/controller');
const { ropstenController } = require('./modules/ropsten/controller');
const { rinkebyController } = require('./modules/rinkeby/controller');

// Constants
const PORT = process.env.PORT || 8080;

// Express - Setup
const app = setupExpressApp();

// Express - Endpoints
app.post('/kovan', kovanController);
app.post('/goerli', goerliController);
app.post('/ropsten', ropstenController);
app.post('/rinkeby', rinkebyController);

// Express - Listen
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
