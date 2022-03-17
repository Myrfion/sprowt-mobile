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

export const HeartTabIcon = props => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.63 3.457a4.125 4.125 0 0 0-5.834 0L9 4.252l-.795-.795A4.126 4.126 0 0 0 2.37 9.292l.795.795L9 15.922l5.835-5.835.795-.795a4.127 4.127 0 0 0 0-5.835v0Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileTabIcon = props => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5M9 8.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke={props.color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const LogoIcon = props => (
  <Svg
    width={31}
    height={29}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.535 17.755c1.585-3.413 4.632-7.496 7.496-8.899 2.864-1.402 6.643-2.011 7.74.731.976 2.499-1.34 4.998-5.18 5.12-3.352.121-8.535 1.158-10.056 3.047Z"
      fill="#46BA79"
    />
    <Path
      d="M15.538 17.754c-1.585-3.414-4.632-7.497-7.496-8.898-2.864-1.401-6.582-2.012-7.679.73-.974 2.5 1.342 4.998 5.18 5.12 3.352.122 8.47 1.158 9.995 3.048ZM17.915 26.102a26.693 26.693 0 0 0-2.377-8.289 27.716 27.716 0 0 0-2.376 8.29 2.332 2.332 0 0 0 2.376 2.559 2.368 2.368 0 0 0 2.377-2.56ZM15.537 8.67c1.682 0 3.047-1.91 3.047-4.266 0-2.357-1.363-4.261-3.047-4.261-1.684 0-3.047 1.91-3.047 4.266s1.365 4.26 3.047 4.26Z"
      fill="#46BA79"
    />
  </Svg>
);
