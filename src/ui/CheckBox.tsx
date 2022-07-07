import React, {FC, useEffect} from 'react';
import {
  default as NativeCheckbox,
  CheckBoxProps as NativeCheckboxProps,
} from '@react-native-community/checkbox';
import {useTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {Control, useController} from 'react-hook-form';
import {showErrorMessage} from './utils';

const styles = StyleSheet.create({
  root: {width: 19, height: 19},
});

interface CheckBoxProps extends NativeCheckboxProps {
  control: Control<any>;
  name: string;
}

export const CheckBox: FC<CheckBoxProps> = props => {
  const {control, name, ...inputProps} = props;

  const {field, fieldState} = useController({control, name});

  const theme = useTheme();

  useEffect(() => {
    if (fieldState.error) {
      showErrorMessage('You must select the checkbox');
    }
  }, [fieldState.error]);

  return (
    <>
      <NativeCheckbox
        value={field.value}
        onValueChange={field.onChange}
        boxType="square"
        style={styles.root}
        onCheckColor={theme.colors.background}
        onFillColor={theme.colors.primary}
        onTintColor={theme.colors.primary}
        offAnimationType="bounce"
        {...inputProps}
      />
    </>
  );
};
