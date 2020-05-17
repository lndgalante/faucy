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

// Express - Main endpoints
app.post('/kovan', kovanController);
app.post('/goerli', goerliController);
app.post('/ropsten', ropstenController);
app.post('/rinkeby', rinkebyController);

// Express - Secondary endpoints
app.get('/health', (req, res) => {
  res.status(200).json({ statusCode: 200, body: { message: 'The service is running' } });
});

// Sentry
app.use(sentry.Handlers.errorHandler());

module.exports = { app };
