import React from 'react'
import { Button } from '@chakra-ui/core'

export const Radio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props

  return (
    <Button
      ref={ref}
      {...rest}
      bg={isChecked ? 'purple.500' : 'purple.300'}
      variantColor="purple"
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
    />
  )
})
