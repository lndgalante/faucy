// Resolver
const { getRinkebyEth } = require('./resolver');

// Controller
const rinkebyController = async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, body } = await getRinkebyEth({ address });
    return res.status(statusCode).send({ body });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { rinkebyController };
