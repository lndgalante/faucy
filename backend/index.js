// Dotenv - setup
require('dotenv').config();

// Utils
const { setupExpressApp } = require('./utils/express');

// Modules
const { getGoerliEth } = require('./modules/goerli');
const { getRopstenEth } = require('./modules/ropsten');

// Constants
const PORT = process.env.PORT || 8080;

// Express - Setup
const app = setupExpressApp();

// Endpoints - Ropsten
app.post('/ropsten', async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, message } = await getRopstenEth({ address });
    return res.status(statusCode).send({ message });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

// Endpoints - Goerli
app.post('/goerli', async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, message } = await getGoerliEth({ address });
    console.log('message', message);
    console.log('statusCode', statusCode);
    return res.status(statusCode).send({ message });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
