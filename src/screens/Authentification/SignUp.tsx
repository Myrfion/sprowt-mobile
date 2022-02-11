import React from 'react';
import {BaseTheme, Button, Input, Text, View} from 'ui';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'ui/SafeAreaView';
import {useNavigation} from '@react-navigation/native';
import {CheckBox} from 'ui/CheckBox';
import {SocialProviders, SocialsList} from 'ui/Auth/SocialsList';

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
  terms: yup.boolean().oneOf([true], 'you must accept terms and conditions'),
});

const styles = StyleSheet.create({
  subheader: {
    marginBottom: 28,
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
    color: BaseTheme.colors.primary,
    fontWeight: 'bold',
  },
});

export const SignUp = () => {
  const navigation = useNavigation();

  const {handleSubmit, control} = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: SignUpFormData) => {
    navigation.navigate('PersonalInformation', {
      email: data.email,
      password: data.password,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text variant="header" textAlign="center">
        Sign up
      </Text>
      <Text variant="subheader" textAlign="center" style={styles.subheader}>
        Join free and enjoy a 7-day premium trial (no credit card required 😎)
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
          <Text style={styles.termsText}>
            Terms of Service & Privacy Policy
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
            if (SocialProviders.google === social) {
              console.log('social: ', social);
            }
          }}
        />
      </View>
      <View style={styles.createAccountRow}>
        <Text>Already have account? </Text>
        <Text
          style={{color: BaseTheme.colors.primary}}
          fontWeight="bold"
          onPress={() => navigation.navigate('Login')}>
          Sing in
        </Text>
      </View>
    </SafeAreaView>
  );
};
