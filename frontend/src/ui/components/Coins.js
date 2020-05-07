import React from 'react';
import { useColorMode } from '@chakra-ui/core';

export function Coins(props) {
  // Chakra hooks
  const { colorMode } = useColorMode();
  const color = colorMode === 'light' ? 'rgb(26, 32, 44)' : 'rgba(255, 255, 255, 0.92)';

  return (
    <svg fill="none" height={15} viewBox="0 0 18 15" width={18} {...props}>
      <g clipPath="url(#prefix__clip0)">
        <circle cx={7.364} cy={7.364} r={6.797} stroke={color} />
        <path
          d="M10.194 7.46l-2.83 1.847L4.53 7.46l2.832-5.193 2.83 5.193zM7.364 9.9L4.53 8.054l2.832 4.409 2.833-4.41-2.833 1.849z"
          fill={color}
        />
      </g>
      <g clipPath="url(#prefix__clip1)">
        <path d="M9 .765a6.797 6.797 0 11-.023 13.192" stroke={color} />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path d="M0 0h14.727v14.727H0V0z" fill={color} />
        </clipPath>
        <clipPath id="prefix__clip1">
          <path d="M3.273 0H18v14.727H3.273z" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
