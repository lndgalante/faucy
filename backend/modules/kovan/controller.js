// Resolver
const { getKovanEth } = require('./resolver');

const kovanController = async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, body } = await getKovanEth({ address });
    return res.status(statusCode).send({ body });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { kovanController };
