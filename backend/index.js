const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const { isAddress } = require('ethereum-address');

// Modules
const { getRopstenEth } = require('./ropsten');

// Constants - Environment variables
const PORT = process.env.PORT || 8080;

// Dotenv - setup
dotenv.config();

// Express - Setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  const { statusCode, message } = await getRopstenEth({ address });

  return res.status(statusCode).send({ message });
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
