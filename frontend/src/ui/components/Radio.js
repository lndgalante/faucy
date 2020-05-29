import React, { forwardRef } from 'react';
import { Button } from '@chakra-ui/core';
import { NETWORK_STATUS } from '../../utils/constants';

export const Radio = forwardRef((props, ref) => {
  const { isChecked, isDisabled, status, ...rest } = props;
  const isDown = status === NETWORK_STATUS.down;
  return (
    <Button
      {...rest}
      ref={ref}
      aria-checked={isChecked}
      isDisabled={isDisabled || isDown}
      isLoading={status === NETWORK_STATUS.loading}
      role="radio"
      variant={isChecked ? 'solid' : 'outline'}
      variantColor={isDown ? 'red' : 'teal'}
    />
  );
});
