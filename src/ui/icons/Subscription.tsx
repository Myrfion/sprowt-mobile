import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const CheckmarkIcon = (props: any) => (
  <Svg
    width={16}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M13.335 4.5 6 12.75 2.668 9"
      stroke="#46967E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
