// Dotenv
require('dotenv').config();

// Utils
const { setupExpressApp } = require('./utils/express');

// Controllers
const { goerliController } = require('./modules/goerli/controller');
const { ropstenController } = require('./modules/ropsten/controller');

// Constants
const PORT = process.env.PORT || 8080;

// Express - Setup
const app = setupExpressApp();

// Express - Endpoints
app.post('/ropsten', goerliController);
app.post('/goerli', ropstenController);

// Express - Listen
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
