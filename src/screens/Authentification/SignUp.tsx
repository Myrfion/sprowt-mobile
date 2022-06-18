import React from 'react';
import {BaseTheme, Button, Input, Text, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, Linking, StyleSheet} from 'react-native';
import {SafeAreaView} from 'ui/SafeAreaView';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'ui/CheckBox';
import {SocialsList} from 'ui/Auth/SocialsList';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next';
import {useProfileCreate} from 'api/useProfile';

export type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  terms: yup.bool().oneOf([true], 'you must accept terms and conditions'),
});

const styles = StyleSheet.create({
  subheader: {
    marginBottom: 28,
    fontSize: 18,
    marginTop: 12,
  },
  logo: {
    width: 115,
    height: 36,
    marginBottom: 16,
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
  checkboxText: {
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
    marginTop: 20,
    alignSelf: 'center',
  },
  termsText: {
    color: BaseTheme.colors.primary900,
    fontWeight: 'bold',
  },
});

GoogleSignin.configure({
  webClientId:
    '796983538258-ltud2s5dnr0nhpmtgu9b3e1cfs5qbrs1.apps.googleusercontent.com',
  iosClientId:
    '796983538258-ec0siks1orr3dl82asiv4ti62ivgr5si.apps.googleusercontent.com',
});
Settings.setAppID('699728804407049');

export const SignUp = () => {
  const navigation = useNavigation();

  const profileCreate = useProfileCreate({
    onSuccess: () => console.log('user profile created!'),
  });

  const {handleSubmit, control} = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    navigation.navigate('PersonalInformation', {
      email: data.email,
      password: data.password,
    });
  };

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const currentUser = await GoogleSignin.getCurrentUser();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(currentUser?.user.givenName);

    profileCreate.mutate({
      firstName: currentUser?.user.givenName,
      lastName: currentUser?.user.familyName,
      email: currentUser?.user.email,
    });

    return auth().signInWithCredential(googleCredential);
  }

  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    profileCreate.mutate({
      firstName: appleAuthRequestResponse.fullName?.givenName ?? '',
      lastName: appleAuthRequestResponse.fullName?.familyName ?? '',
      email: appleAuthRequestResponse.email,
    });

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView style={styles.safeAreaView}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text variant="header" textAlign="center">
          Sign Up
        </Text>
        <Text textAlign="center" style={styles.subheader} color="neutral800">
          Join free (no credit card required) 😎
        </Text>
        <Input control={control} name="email" label="Email" />
        <Input
          control={control}
          name="password"
          label="Password"
          secureTextEntry
        />
        <Input
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          secureTextEntry
        />
        <View flexDirection="row">
          <CheckBox name="terms" control={control} />
          <Text style={styles.checkboxText}>
            I agree to{' '}
            <Text
              style={styles.termsText}
              onPress={() => Linking.openURL('https://www.sprowt.io/terms')}>
              Terms of Service
            </Text>{' '}
            &{' '}
            <Text
              style={styles.termsText}
              onPress={() =>
                Linking.openURL('https://www.sprowt.io/privacy-policy')
              }>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <View style={styles.singInContainer}>
          <Button
            label="Sign up"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
          />
          <Text>OR</Text>
          <SocialsList
            onPressSocial={social => {
              console.log('social: ', social);
              if (social === 0) {
                onGoogleButtonPress().then(() =>
                  console.log('Signed in with Google!'),
                );
              } else if (social === 1) {
                onFacebookButtonPress().then(() =>
                  console.log('Signed in with Facebook!'),
                );
              } else if (social === 2) {
                onAppleButtonPress().then(() =>
                  console.log('Apple sign-in complete!'),
                );
              }
            }}
          />
        </View>
        <View style={styles.createAccountRow}>
          <Text textDecorationLine="underline">
            Already have an account?{' '}
            <Text
              textDecorationLine="underline"
              color="primary700"
              fontWeight="bold"
              onPress={() => navigation.navigate('Login')}>
              Sign in
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
