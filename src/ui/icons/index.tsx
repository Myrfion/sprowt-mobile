import React from 'react';
import Svg, {G, Circle, Path, Defs, ClipPath} from 'react-native-svg';
export * from './Settings';

export * from './Home';
export * from './FeelingsPicker';

export const GoogleIcon = props => (
  <Svg
    width={56}
    height={56}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G filter="url(#a)">
      <Circle cx={28} cy={26} r={20} fill="#fff" />
    </G>
    <Path
      d="M37.575 26.225c0-.659-.058-1.284-.158-1.892H28v3.758h5.392c-.242 1.234-.95 2.275-2 2.984v2.5h3.216c1.884-1.742 2.967-4.309 2.967-7.35Z"
      fill="#4285F4"
    />
    <Path
      d="M28 36c2.7 0 4.959-.9 6.608-2.425l-3.216-2.5c-.9.6-2.042.966-3.392.966-2.608 0-4.817-1.758-5.608-4.133h-3.317v2.575C20.717 33.75 24.092 36 28 36Z"
      fill="#34A853"
    />
    <Path
      d="M22.392 27.908A5.801 5.801 0 0 1 22.075 26c0-.667.117-1.308.317-1.908v-2.575h-3.317a9.885 9.885 0 0 0 0 8.966l3.317-2.575Z"
      fill="#FBBC05"
    />
    <Path
      d="M28 19.958c1.475 0 2.792.509 3.834 1.5l2.85-2.85C32.959 16.992 30.7 16 28 16c-3.908 0-7.283 2.25-8.925 5.517l3.317 2.575c.791-2.375 3-4.134 5.608-4.134Z"
      fill="#EA4335"
    />
  </Svg>
);

export const FacebookIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={42}
    height={42}
    {...props}>
    <Path fill="#3f51b5" d="M24 4a20 20 0 1 0 0 40 20 20 0 1 0 0-40Z" />
    <Path
      fill="#fff"
      d="M29.368 24H26v12h-5V24h-3v-4h3v-2.41c.002-3.508 1.459-5.59 5.592-5.59H30v4h-2.287C26.104 16 26 16.6 26 17.723V20h4l-.632 4z"
    />
  </Svg>
);

export const AppleIcon = props => (
  <Svg
    width={42}
    height={42}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle
      cx={21}
      cy={21}
      r={20.25}
      fill="#000"
      stroke="#000"
      strokeWidth={0.5}
    />
    <G clipPath="url(#a)">
      <Path
        d="M28.762 16.818c-.116.09-2.164 1.244-2.164 3.81 0 2.968 2.606 4.018 2.684 4.044-.012.064-.414 1.438-1.374 2.838-.856 1.232-1.75 2.462-3.11 2.462-1.36 0-1.71-.79-3.28-.79-1.53 0-2.074.816-3.318.816-1.244 0-2.112-1.14-3.11-2.54C13.934 25.814 13 23.26 13 20.836c0-3.888 2.528-5.95 5.016-5.95 1.322 0 2.424.868 3.254.868.79 0 2.022-.92 3.526-.92.57 0 2.618.052 3.966 1.984Zm-4.68-3.63c.622-.738 1.062-1.762 1.062-2.786a1.92 1.92 0 0 0-.038-.402c-1.012.038-2.216.674-2.942 1.516-.57.648-1.102 1.672-1.102 2.71 0 .156.026.312.038.362.064.012.168.026.272.026.908 0 2.05-.608 2.71-1.426Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(13 10)" d="M0 0h16.28v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const LockIcon = props => {
  return (
    <Svg
      width={47}
      height={47}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M36.755 21.606H10.243a3.788 3.788 0 0 0-3.788 3.788V38.65a3.787 3.787 0 0 0 3.788 3.788h26.512a3.787 3.787 0 0 0 3.788-3.788V25.394a3.788 3.788 0 0 0-3.788-3.788Z"
        stroke="#0B5641"
        strokeWidth={3.788}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.03 21.607v-7.575a9.469 9.469 0 1 1 18.938 0v7.575"
        stroke="#0B5641"
        strokeWidth={3.788}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export const EnvelopeIcon = props => (
  <Svg
    width={43}
    height={35}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.35 2.35h30.3a3.799 3.799 0 0 1 3.788 3.788v22.725a3.799 3.799 0 0 1-3.788 3.787H6.35a3.799 3.799 0 0 1-3.787-3.787V6.138A3.799 3.799 0 0 1 6.35 2.35Z"
      stroke="#0B5641"
      strokeWidth={3.788}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M40.438 6.138 21.5 19.394 2.562 6.138"
      stroke="#0B5641"
      strokeWidth={3.788}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
