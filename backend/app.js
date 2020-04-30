const sentry = require('@sentry/node');

// Utils
const { setupExpressApp } = require('./utils/express');

// Controllers
const { kovanController } = require('./modules/kovan/controller');
const { goerliController } = require('./modules/goerli/controller');
const { ropstenController } = require('./modules/ropsten/controller');
const { rinkebyController } = require('./modules/rinkeby/controller');

// Express - Setup
const app = setupExpressApp();

// Express- Endpoints
app.post('/kovan', kovanController);
app.post('/goerli', goerliController);
app.post('/ropsten', ropstenController);
app.post('/rinkeby', rinkebyController);

// Sentry
app.use(sentry.Handlers.errorHandler());

module.exports = { app };
