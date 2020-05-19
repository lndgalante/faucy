const sentry = require('@sentry/node');

// Routers
const { healthRouter } = require('./modules/health/router');
const { faucetRouter } = require('./modules/faucets/router');

// Utils
const { setupExpressApp } = require('./utils/express');

// Express - Setup
const app = setupExpressApp();

// Express - Routers
app.use('/faucet', faucetRouter);
app.use('/health', healthRouter);

// Express - Sentry
app.use(sentry.Handlers.errorHandler());

module.exports = { app };
