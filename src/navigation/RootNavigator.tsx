import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {createStackNavigator} from '@react-navigation/stack';
import {createNavigationContainerRef} from '@react-navigation/native';

import {useAuth} from 'core';
import {NavigationContainer} from './NavigationContainer';
import {HomeNavigator} from './TabNavigator';
import {AuthNavigator} from './AuthNavigator';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

export function navigationWithRef(name: string, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

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
  <NavigationContainer containerRef={navigationRef}>
    <Root />
  </NavigationContainer>
);
