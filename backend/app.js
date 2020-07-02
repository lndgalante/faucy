require('dotenv').config();
const sentry = require('@sentry/node');

// Routers
const { healthRouter } = require('./modules/health/router');
const { faucetRouter } = require('./modules/faucets/router');

// Utils
const { setupExpressApp } = require('./utils/express');

// Constants
const PORT = process.env.PORT || 8080;
const app = setupExpressApp();

// Express - Routers
app.use('/faucet', faucetRouter);
app.use('/health', healthRouter);

// Express - Sentry
app.use(sentry.Handlers.errorHandler());

// Express - Listen
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
