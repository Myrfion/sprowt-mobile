import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from 'screens';
import Onboarding from 'screens/Home/Onboarding';
const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Onboarding">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};
