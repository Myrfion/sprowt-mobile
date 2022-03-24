import React from 'react';
import {Button, Input, Text} from 'ui';
import {useAuth} from 'core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'ui/SafeAreaView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useProfileCreate} from 'api/useProfile';

export type PersonalInformationFormData = {
  firstName: string;
  lastName: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
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

export const PersonalInformation = () => {
  const {signUp} = useAuth();
  const route = useRoute();
  const navigation = useNavigation();
  console.log(route.params);

  const profileCreate = useProfileCreate({
    onSuccess: () => console.log('user profile created!'),
  });

  const {handleSubmit, control} = useForm<PersonalInformationFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PersonalInformationFormData) => {
    const {email, password} = route.params;
    const {firstName, lastName} = data;

    signUp({email, password, firstName, lastName}, profileCreate.mutate);
    navigation.navigate('EmailVerification');
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text variant="header" textAlign="center">
        Personal Information
      </Text>
      <Text variant="subheader" textAlign="center" style={styles.subheader}>
        Lorem ipsum dolor amet lorem ipsum dolor amet lorem ipsum dolor amet!
      </Text>
      <Input control={control} name="firstName" label="First Name" />
      <Input control={control} name="lastName" label="Last Name" />
      <Button
        label="Continue"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
      />
    </SafeAreaView>
  );
};
