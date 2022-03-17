import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const PlayIcon = props => (
  <Svg
    width={22}
    height={28}
    viewBox="0 0 22 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M.334 2.663c0-1.582 1.75-2.538 3.082-1.682L21.05 12.318a2 2 0 010 3.364L3.416 27.02c-1.332.856-3.082-.1-3.082-1.682V2.663z"
      fill="#0B5641"
    />
  </Svg>
);

export const LockIcon = props => {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.25 8.25H3.75a1.5 1.5 0 00-1.5 1.5V15a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V9.75a1.5 1.5 0 00-1.5-1.5zM5.25 8.25v-3a3.75 3.75 0 017.5 0v3"
        stroke="#2D2D2D"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
