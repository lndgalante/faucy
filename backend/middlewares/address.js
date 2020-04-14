const { isAddress } = require('ethereum-address');

function userAddress(req, res, next) {
  const { address } = req.body;

  if (!address) {
    return res.status(400).send({ message: 'Address not defined' });
  }

  if (!isAddress(address)) {
    return res.status(422).send({ message: 'Invalid address' });
  }

  next();
}

module.exports = { userAddress };
