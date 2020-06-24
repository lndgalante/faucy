require('dotenv').config();
const WebSocket = require('ws');
const sentry = require('@sentry/node');

// Controllers
const { getKovanEth } = require('./modules/faucets/kovan/service');
const { getGoerliEth } = require('./modules/faucets/goerli/service');
const { getRopstenEth } = require('./modules/faucets/ropsten/service');
const { getRinkebyEth } = require('./modules/faucets/rinkeby/service');

// Utils
const { setupExpressApp } = require('./utils/express');

// Constants
const PORT = process.env.PORT || 8080;

// Express - Setup
const app = setupExpressApp();

// Express - Sentry
app.use(sentry.Handlers.errorHandler());

// Express - Listen
const server = app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const { id, userNetwork, userAddress: address } = JSON.parse(message);

    try {
      if (userNetwork === 'ropsten') {
        const data = await getRopstenEth({ address });
        ws.send(JSON.stringify({ id, userNetwork, ...data }));
      }

      if (userNetwork === 'kovan') {
        const data = await getKovanEth({ address });
        ws.send(JSON.stringify({ id, userNetwork, ...data }));
      }

      if (userNetwork === 'rinkeby') {
        const data = await getRinkebyEth({ address });
        ws.send(JSON.stringify({ id, userNetwork, ...data }));
      }

      if (userNetwork === 'goerli') {
        const data = await getGoerliEth({ address });
        ws.send(JSON.stringify({ id, userNetwork, ...data }));
      }
    } catch (error) {
      ws.send(JSON.stringify({ id, statusCode: 500, error }));
    }
  });
});
