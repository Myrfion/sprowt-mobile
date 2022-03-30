import React from 'react';
import {BaseTheme, Button, Input, Text, View} from 'ui';
import {useAuth} from 'core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, StyleSheet} from 'react-native';

import {SafeAreaView} from 'ui/SafeAreaView';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'ui/CheckBox';
import {SocialProviders, SocialsList} from 'ui/Auth/SocialsList';

export type SingInFormData = {
  email: string;
  password: string;
  shouldRemember: boolean;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
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
  socialIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
  },
  singInContainer: {
    alignItems: 'center',
    width: 100 + '%',
    marginTop: 'auto',
  },
  googleIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  facebookIcon: {
    borderRadius: 40,
    marginHorizontal: 24,
  },
  createAccountRow: {
    flexDirection: 'row',
  },
});

export const Login = () => {
  const {signIn, loginErrors} = useAuth();
  const navigation = useNavigation();

  const {handleSubmit, control} = useForm<SingInFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SingInFormData) => {
    console.log(data);
    signIn(data);
  };

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView style={styles.safeAreaView}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text variant="header" textAlign="center">
          Welcome!
        </Text>
        <Text variant="subheader" textAlign="center" style={styles.subheader}>
          We’re happy you’re here
        </Text>
        <Input
          control={control}
          name="email"
          label="Email"
          error={loginErrors.login}
        />
        <Input
          control={control}
          name="password"
          label="Password"
          secureTextEntry
          error={loginErrors.password}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox name="shouldRemember" control={control} />
          <Text style={styles.rememberMeText}>Remember me</Text>
          <Text
            style={styles.forgotPassText}
            onPress={() => navigation.navigate('ResetPassword')}>
            Forgot password?
          </Text>
        </View>
        <View style={styles.singInContainer}>
          <Button
            label="Sign in"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
          />
          <Text>OR</Text>
          <SocialsList
            onPressSocial={(social: SocialProviders) =>
              console.log('Sign in: ', social)
            }
          />
          <View style={styles.createAccountRow}>
            <Text>Don't have an account yet? </Text>
            <Text
              style={{color: BaseTheme.colors.primary}}
              fontWeight="bold"
              onPress={() => navigation.navigate('SignUp')}>
              Create account
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
