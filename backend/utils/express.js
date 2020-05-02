const ms = require('ms');
const express = require('express');
const timeout = require('connect-timeout');

// Middlewares
const cors = require('cors');
const helmet = require('helmet');
const sentry = require('@sentry/node');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

// Custom Middlewares
const { userAddress } = require('../middlewares/address');

// Constants
const { SENTRY_DSN = '' } = process.env;

function setupExpressApp() {
  const app = express();

  // Sentry
  sentry.init({ dsn: SENTRY_DSN });
  app.use(sentry.Handlers.requestHandler());

  // Security
  app.use(cors());
  app.use(helmet());

  // Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Request timeout
  app.use(timeout(ms('3m')));

  // Rate limit
  app.use(rateLimit({ windowMs: ms('15m'), max: 100 }));

  // Custom Middlewares
  app.use(userAddress);

  return app;
}

module.exports = { setupExpressApp };
