import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/core';

export const Radio = forwardRef((props, ref) => {
  const { isChecked, isDisabled, ...rest } = props;

  return (
    <Button
      {...rest}
      ref={ref}
      aria-checked={isChecked}
      isDisabled={isDisabled}
      role="radio"
      variant={isChecked ? 'solid' : 'outline'}
      variantColor="teal"
    />
  );
});
