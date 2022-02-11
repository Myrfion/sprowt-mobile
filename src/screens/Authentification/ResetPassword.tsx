import React from 'react';
import {Button, Input, Text} from 'ui';
import {useAuth} from 'core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'ui/SafeAreaView';

export type ForgotPassowordFormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

const styles = StyleSheet.create({
  subheader: {
    marginBottom: 28,
  },
  logo: {
    width: 115,
    height: 36,
    marginBottom: 64,
    marginTop: 16,
  },
  safeAreaView: {
    paddingHorizontal: 16,
    flex: 1,
    height: 100 + '%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  rememberMeText: {
    marginLeft: 14,
  },
  forgotPassText: {
    marginLeft: 'auto',
  },
  socialsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
  },
});

export const ResetPassword = () => {
  const {resetPassowordErrors, resetPassword} = useAuth();

  const {handleSubmit, control} = useForm<ForgotPassowordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ForgotPassowordFormData) => {
    resetPassword(data.email);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text variant="header" textAlign="center">
        Reset password
      </Text>
      <Text variant="subheader" textAlign="center" style={styles.subheader}>
        Lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet!
      </Text>
      <Input
        control={control}
        name="email"
        label="Email"
        error={resetPassowordErrors.email}
      />

      <Button
        label="Send instructions"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
      />
    </SafeAreaView>
  );
};
