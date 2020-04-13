const { isAddress } = require('ethereum-address');

function userAddress(req, res, next) {
  const { address } = req.body;

  // Check address
  if (!address) {
    return res.status(400).send({ message: 'Address not defined' });
  }

  // Validate address
  if (!isAddress(address)) {
    return res.status(422).send({ message: 'Invalid address' });
  }

  next();
}

module.exports = { userAddress };
