const express = require('express');
const ms = require('ms');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const { isAddress } = require('ethereum-address');

// Dotenv - setup
require('dotenv').config();

// Modules
const { getRopstenEth } = require('./ropsten');

// Constants - Environment variables
const PORT = process.env.PORT || 8080;

// Express - Setup
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: ms('15m'), max: 100 }));

// Endpoints
app.post('/ropsten', async (req, res) => {
  const { address } = req.body;

  // Check address
  if (!address) {
    return res.status(400).send({ message: 'Address not defined' });
  }

  // Validate address
  if (!isAddress(address)) {
    return res.status(422).send({ message: 'Invalid address' });
  }

  // Trigger eth request
  try {
    const { statusCode, message } = await getRopstenEth({ address });
    return res.status(statusCode).send({ message });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
