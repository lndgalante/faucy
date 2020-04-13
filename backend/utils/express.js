// Express
const express = require('express');

// Utils
const ms = require('ms');

// Middlewares
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

// Custom Middlewares
const { userAddress } = require('../middlewares/address');

function setupExpressApp() {
  const app = express();

  app.use(cors());
  app.use(helmet());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(userAddress);
  app.use(rateLimit({ windowMs: ms('15m'), max: 100 }));

  return app;
}

module.exports = { setupExpressApp };
