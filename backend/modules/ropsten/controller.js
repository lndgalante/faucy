// Resolver
const { getRopstenEth } = require('./resolver');

const ropstenController = async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, message } = await getRopstenEth({ address });
    return res.status(statusCode).send({ message });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { ropstenController };
