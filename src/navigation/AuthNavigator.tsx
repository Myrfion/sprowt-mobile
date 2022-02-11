import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from 'screens';
import {SignUp} from 'screens/Authentification/SignUp';
import {PersonalInformation} from 'screens/Authentification/PersonalInformation';
import {ResetPassword} from 'screens/Authentification/ResetPassword';
import {EmailVerification} from 'screens/Authentification/EmailVerification';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  PersonalInformation: {email: string; password: string};
  EmailVerification: undefined;
};

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
    </Stack.Navigator>
  );
};
