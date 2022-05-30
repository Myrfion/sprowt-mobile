import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';

import {Text} from './Text';
import {View} from './View';
import {Theme} from './theme';

const buttonVariant = createVariant({themeKey: 'buttonVariants'});
const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, 'buttonVariants'> & React.ComponentProps<typeof View>,
  Theme
>([buttonVariant], View);

const restyleFunctions = [
  buttonVariant as any,
  spacing,
  border,
  backgroundColor,
];

type Props = SpacingProps<Theme> &
  VariantProps<Theme, 'buttonVariants'> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
    label?: string;
    outline?: boolean;
    loading?: boolean;
  };

const styles = StyleSheet.create({
  touchableOpacity: {
    width: 100 + '%',
  },
});

export const Button = ({
  onPress,
  label,
  loading = false,
  variant = 'primary',
  disabled,
  ...rest
}: Props) => {
  // const props = useRestyle(restyleFunctions, {...rest, variant});

  const textVariant = 'button_' + variant;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchableOpacity]}
      disabled={disabled}>
      <ButtonContainer
        borderWidth={1}
        borderColor="primary"
        borderRadius={30}
        flexDirection="row"
        paddingHorizontal="xl"
        marginVertical="s"
        justifyContent="center"
        variant="primary">
        {loading ? (
          <ActivityIndicator size="small" color={'white'} />
        ) : (
          <Text variant="button_primary" style={{paddingVertical: 8}}>
            {label}
          </Text>
        )}
      </ButtonContainer>
    </TouchableOpacity>
  );
};
