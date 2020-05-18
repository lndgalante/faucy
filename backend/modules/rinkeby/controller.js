const DelayedResponse = require('http-delayed-response');

// Resolver
const { getRinkebyEth } = require('./resolver');

// Controller
const rinkebyController = async (req, res, next) => {
  const { address } = req.body;

  const delayed = new DelayedResponse(req, res, next);
  delayed.on('done', (data) => res.end(JSON.stringify(data)));

  try {
    delayed.start();
    const data = await getRinkebyEth({ address });
    delayed.end(null, data);
  } catch (error) {
    delayed.end(error, { statusCode: 500, body: { error } });
  }
};

module.exports = { rinkebyController };
