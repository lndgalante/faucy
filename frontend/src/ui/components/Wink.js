import React from 'react';

export const Wink = (props) => (
  <svg
    aria-hidden="true"
    height="1em"
    style={{
      display: 'inline-block',
      msTransform: 'rotate(360deg)',
      WebkitTransform: 'rotate(360deg)',
    }}
    transform="rotate(360)"
    viewBox="0 0 36 36"
    width="1em"
    {...props}
  >
    <path
      d="M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
      fill="#FFCC4D"
    />
    <ellipse cx={11.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5} />
    <path
      d="M28.457 17.797c-.06-.135-1.499-3.297-4.457-3.297-2.957 0-4.397 3.162-4.457 3.297a.503.503 0 00.755.605c.012-.009 1.262-.902 3.702-.902 2.426 0 3.674.881 3.702.901a.498.498 0 00.755-.604zM5.999 12.458a1 1 0 01-.799-1.6c3.262-4.35 7.616-4.4 7.8-4.4a1 1 0 01.004 2c-.156.002-3.569.086-6.205 3.6a.995.995 0 01-.8.4zm23.002 2.125a.998.998 0 01-.801-.4c-2.592-3.457-6.961-2.627-7.004-2.62a1 1 0 01-.393-1.961c.231-.047 5.657-1.072 8.996 3.38a1 1 0 01-.798 1.601zm-5.747 8.994a.513.513 0 00-.597.06c-.01.008-1.013.863-4.657.863-3.641 0-4.646-.854-4.646-.854a.5.5 0 00-.838.475c.01.044 1.144 4.379 5.484 4.379s5.474-4.335 5.485-4.379a.497.497 0 00-.231-.544z"
      fill="#664500"
    />
  </svg>
);