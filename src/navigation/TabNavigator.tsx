import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from 'screens';
import Onboarding from 'screens/Home/Onboarding';
import FeelingPicker from 'screens/Home/FeelingsPicker';
import useAsyncStorage from 'core/Storage';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  const {hadOnboarding} = useAsyncStorage();

  let initialRouteName = hadOnboarding ? 'Home' : 'Onboarding';
  console.log(initialRouteName);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="FeelingPicker" component={FeelingPicker} />
    </Stack.Navigator>
  );
};
