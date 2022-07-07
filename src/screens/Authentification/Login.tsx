import React from 'react';
import {BaseTheme, Button, Input, Text, View} from 'ui';
import {useAuth} from 'core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, StyleSheet} from 'react-native';

import {SafeAreaView} from 'ui/SafeAreaView';
import {useNavigation} from '@react-navigation/native';
import {SocialProviders, SocialsList} from 'ui/Auth/SocialsList';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import {useProfileUpdate} from 'api/profile';

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
    fontSize: 18,
    color: BaseTheme.colors.neutral800,
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
    justifyContent: 'space-between',
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

  const {updateProfile} = useProfileUpdate();

  const onSubmit = (data: SingInFormData) => {
    console.log(data);
    signIn(data);
  };

  async function onGoogleSignIn() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const currentUser = await GoogleSignin.getCurrentUser();

    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        updateProfile({
          firstName: currentUser?.user.givenName,
          lastName: currentUser?.user.familyName,
          email: currentUser?.user.email,
        });
      });
  }

  async function onAppleSignIn() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      return auth()
        .signInWithCredential(appleCredential)
        .then(() => {
          updateProfile({
            firstName: appleAuthRequestResponse.fullName?.givenName ?? '',
            lastName: appleAuthRequestResponse.fullName?.familyName ?? '',
            email: appleAuthRequestResponse.email,
          });
        });
    }
  }

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView style={styles.safeAreaView}>
        <View>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
          <Text variant="header" textAlign="center" mb="s">
            Welcome
          </Text>
          <Text textAlign="center" style={styles.subheader}>
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
            <Text
              style={styles.forgotPassText}
              onPress={() => navigation.navigate('ResetPassword')}>
              Forgot password?
            </Text>
          </View>
        </View>
        <View style={styles.singInContainer}>
          <Button
            label="Sign in"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
          />
          <Text>OR</Text>
          <SocialsList
            onPressSocial={async (social: SocialProviders) => {
              if (social === SocialProviders.google) {
                return await onGoogleSignIn();
              } else if (social === SocialProviders.apple) {
                return await onAppleSignIn();
              }
            }}
          />
          <View style={styles.createAccountRow}>
            <Text color="neutral900">Don't have an account yet? </Text>
            <Text
              style={{color: BaseTheme.colors.primary700}}
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
