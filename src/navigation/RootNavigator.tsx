import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {createStackNavigator} from '@react-navigation/stack';

import {useAuth} from 'core';
import {NavigationContainer} from './NavigationContainer';
import {HomeNavigator} from './TabNavigator';
import {AuthNavigator} from './AuthNavigator';

const Stack = createStackNavigator();

export const Root = () => {
  const {user} = useAuth();

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: false,
        headerShown: false,
        gestureEnabled: false,
        animationTypeForReplace: user ? 'push' : 'pop',
      }}>
      {user && user.emailVerified ? (
        <Stack.Screen name="App" component={HomeNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => (
  <NavigationContainer>
    <Root />
  </NavigationContainer>
);
