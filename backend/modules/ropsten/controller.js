// Resolver
const { getRopstenEth } = require('./resolver');

// Controller
const ropstenController = async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, body } = await getRopstenEth({ address });
    return res.status(statusCode).send({ body });
  } catch (error) {
    console.log('ropstenController -> error', error);
    return res.status(500).send({ error });
  }
};

module.exports = { ropstenController };
