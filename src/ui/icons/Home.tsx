import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Home({color, ...props}: SvgProps) {
  return (
    <Svg width={28} height={29} fill="none" {...props}>
      <Path
        d="M11 24.456v-10h6v10m-12-13l9-7 9 7v11a2 2 0 01-2 2H7a2 2 0 01-2-2v-11z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export const SearchIcon = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.35-4.35"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BackIcon = props => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="m15 18-6-6 6-6"
      stroke="#424242"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
