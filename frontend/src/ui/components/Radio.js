import React from 'react'
import { Button } from '@chakra-ui/core'

export const Radio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props

  return (
    <Button
      ref={ref}
      {...rest}
      variantColor="teal"
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      variant={isChecked ? 'solid' : 'outline'}
    />
  )
})
