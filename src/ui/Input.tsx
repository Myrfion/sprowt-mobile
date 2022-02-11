import * as React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import {Control, Path, RegisterOptions, useController} from 'react-hook-form';

import {Text} from './Text';
import {View} from './View';
import {useTheme} from './theme';

// types
type TRule = Omit<
  RegisterOptions,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs'
>;

export type RuleType<T> = {[name in keyof T]: TRule};
export type InputControllerType<T> = {
  name: Path<T>;
  control: Control<T>;
  rules?: TRule;
};

interface Props<T> extends TextInputProps, InputControllerType<T> {
  disabled?: boolean;
  label?: string;
  error?: string | null;
}

export function Input<T>(props: Props<T>) {
  const {label, name, control, rules, error, ...inputProps} = props;
  const {colors} = useTheme();
  const {field, fieldState} = useController({control, name, rules});
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = () => setIsFocussed(false);
  const onFocus = () => setIsFocussed(true);

  const hasError = error || fieldState.invalid;

  const borderColor = hasError
    ? colors.red
    : isFocussed
    ? colors.neutral900
    : colors.neutral300;

  return (
    <View key={`input-${name}`} marginBottom="m">
      {label && (
        <Text
          variant="label"
          color={hasError ? 'red' : 'neutral900'}
          style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={colors.grey2}
        style={[
          styles.input,
          {
            borderColor,
          },
        ]}
        autoCapitalize="none"
        onChangeText={field.onChange}
        value={field.value as string}
        onBlur={onBlur}
        onFocus={onFocus}
        {...inputProps}
      />
      {fieldState.error && (
        <Text fontSize={12} color="red">
          {fieldState.error.message}
        </Text>
      )}
      {error && (
        <Text fontSize={12} color="red">
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#F3F3F3',
  },
  input: {
    borderWidth: 1,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    fontSize: 16,
  },
  label: {
    marginLeft: 16,
  },
});
