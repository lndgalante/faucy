// Resolver
const { getRopstenEth } = require('./service');

// Controller
const ropstenController = async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, body } = await getRopstenEth({ address });
    return res.status(statusCode).send({ body });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { ropstenController };
