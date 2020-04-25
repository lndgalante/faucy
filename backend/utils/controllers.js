const networkController = (resolver) => async (req, res) => {
  const { address } = req.body;

  try {
    const { statusCode, body } = await resolver({ address });
    return res.status(statusCode).send({ body });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { networkController };
