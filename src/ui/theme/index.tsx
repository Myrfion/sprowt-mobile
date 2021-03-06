import * as React from 'react';
import {Platform} from 'react-native'
import {
  ThemeProvider as ReThemeProvider,
  TextProps,
  BoxProps,
  useTheme as useRTheme,
} from '@shopify/restyle';

type BaseThemeType = typeof BaseTheme & {
  textVariants: {[key: string]: TextProps<typeof BaseTheme>};
  navigation: any;
  buttonVariants: {[key: string]: BoxProps<typeof BaseTheme>};
};

const createTheme = <T extends BaseThemeType>(themeObject: T): T => themeObject;

export const BaseTheme = {
  colors: {
    text: '#181935',
    primary: '#46BA79',
    secondary: 'white',
    muted: '#f1f3f4',

    black: '#000',
    grey1: '#333333',
    grey2: '#666666',
    grey3: '#C3C3C3',
    grey4: '#E4E4E4',
    white: 'white',
    red: '#EC5C5C',

    // neutral colors
    neutral50: '#F8F8F8',
    neutral100: '#EAEAEA',
    neutral200: '#C0C0C0',
    neutral300: '#ababab',
    neutral400: '#969696',
    neutral500: '#818181',
    neutral600: '#6C6C6C',
    neutral700: '#575757',
    neutral800: '#424242',
    neutral900: '#2d2d2d',
    success200: '#317864',
    success300: '#0B5641',
    success100: '#F6FFFA',

    // primary colors
    primary50: '#F4FCFA',
    primary100: '#EDFCF8',
    primary200: '#DFF5EF',
    primary300: '#CAEBE2',
    primary400: '#ACE0D1',
    primary500: '#72BDA6',
    primary600: '#66A995',
    primary700: '#46967E',
    primary800: '#1A7056',
    primary900: '#195E49',

    background: '#FDFDFD',
  },
  spacing: {
    xss: 2,
    xs: 4,
    s: 12,
    m: 16,
    l: 20,
    xl: 32,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

export const theme = createTheme({
  ...BaseTheme,
  // TODO : Not sure if this the best way to handel navigation theme
  navigation: {
    dark: false,
    colors: {
      primary: '#46967E',
      background: 'white',
      card: '#f8f8fa',
      text: '#0c1245',
      border: 'rgb(199, 199, 204)',
      notification: 'red',
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: 'primary700',
    },
    secondary: {
      backgroundColor: 'secondary',
    },
    outline: {
      backgroundColor: 'white',
      borderColor: 'primary',
      borderWidth: 1,
    },
  },
  textVariants: {
    defaults: {
      fontWeight: '400',
      fontFamily: 'Nunito',
      fontSize: 14,
    },
    header: {
      lineHeight: 40,
      fontSize: 32,
      color: 'neutral900',
      fontFamily:  Platform.OS === 'ios' ?  'Perfectly Nineties' : 'Nineties',
    },
    subheader: {
      fontWeight: '400',
      fontSize: 24,
      lineHeight: 32,
      color: 'neutral800',
      fontFamily: Platform.OS === 'ios' ?  'Perfectly Nineties' : 'Nineties',
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 15,
      lineHeight: 24,
      color: 'grey2',
    },
    button_primary: {
      fontFamily: 'Nunito',
      fontSize: 14,
      lineHeight: 22,
      color: 'white',
      fontWeight: '700',
    },
    button_secondary: {
      fontFamily: 'Nunito',
      fontSize: 14,
      lineHeight: 22,
      color: 'primary',
      fontWeight: '700',
      borderColor: 'primary',
    },
    button_outline: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 22,
      color: 'neutral700',
    },
    label: {
      fontFamily: 'Inter',
      fontSize: 13,
      lineHeight: 18,
      color: 'grey2',
      paddingVertical: 's',
    },
  },
});

export type Theme = typeof theme;

export const ThemeProvider = ({children}: {children: React.ReactNode}) => (
  <ReThemeProvider theme={theme}>{children}</ReThemeProvider>
);

export const useTheme = () => useRTheme<Theme>();
