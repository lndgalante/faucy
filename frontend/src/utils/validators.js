import { isAddress } from 'ethereum-address'

function validateAddress(value) {
  let error

  if (!value) {
    error = 'Address is required'
  }

  if (!isAddress(value)) {
    error = 'Address is invalid'
  }

  return error || true
}

export { validateAddress }
