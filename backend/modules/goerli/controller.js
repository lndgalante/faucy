const DelayedResponse = require('http-delayed-response');

// Resolver
const { getGoerliEth } = require('./resolver');

// Controller
const goerliController = async (req, res, next) => {
  const { address } = req.body;

  const delayed = new DelayedResponse(req, res, next);
  delayed.on('done', (data) => res.end(JSON.stringify(data)));

  try {
    delayed.start();
    const data = await getGoerliEth({ address });
    delayed.end(null, data);
  } catch (error) {
    delayed.end(error, { statusCode: 500, body: { error } });
  }
};

module.exports = { goerliController };
