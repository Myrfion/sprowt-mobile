import React from 'react';
import {
  Button,
  CheckEmailIllustration,
  EnvelopeIcon,
  Input,
  Text,
  View,
} from 'ui';
import {useAuth} from 'core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'ui/SafeAreaView';
import {useNavigation} from '@react-navigation/native';

export type ForgotPassowordFormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
});

const styles = StyleSheet.create({
  subheader: {},
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
    alignItems: 'center',
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
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#EAF6EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
});

export const ResetPassword = () => {
  const navigation = useNavigation();
  const {resetPassowordErrors, resetPassword, resetPasswordStatus} = useAuth();

  const {handleSubmit, control} = useForm<ForgotPassowordFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ForgotPassowordFormData) => {
    resetPassword(data.email);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View width="100%">
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text variant="header" textAlign="center">
        {resetPasswordStatus === 'success'
          ? 'Check your email'
          : 'Reset password'}
      </Text>
      <Text variant="subheader" textAlign="center" style={styles.subheader}>
        {resetPasswordStatus === 'success'
          ? 'Password recovery instructions sent to\n your email.'
          : ' Lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet!'}
      </Text>
      {resetPasswordStatus === 'success' ? (
        <>
          <CheckEmailIllustration />
          <Button
            label="Back to login"
            onPress={() => navigation.navigate('Login')}
            variant="primary"
          />
        </>
      ) : (
        <>
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
            loading={resetPasswordStatus === 'loading'}
          />
        </>
      )}
    </SafeAreaView>
  );
};
