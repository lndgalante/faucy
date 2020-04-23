import { isAddress } from 'ethereum-address';

function validateAddress(values) {
  const errors = {};

  if (!values.userAddress) {
    errors.userAddress = 'Address is required';
  }

  if (!isAddress(values.userAddress)) {
    errors.userAddress = 'Address is invalid';
  }

  return errors;
}

export { validateAddress };
