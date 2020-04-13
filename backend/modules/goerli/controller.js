// Resolver
const { getGoerliEth } = require('./resolver');

const goerliController = async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, message } = await getGoerliEth({ address });
    return res.status(statusCode).send({ message });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { goerliController };
