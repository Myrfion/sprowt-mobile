import React from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'ui';
import FlashMessage from 'react-native-flash-message';
import {RootNavigator} from 'navigation';
import {hydrateAuth, setI18nConfig} from 'core';
import APIProvider from 'api/APIProvider';
import {registerPushNotifications} from 'services/push-notifications';

setI18nConfig();
hydrateAuth();
registerPushNotifications();

const App = () => {
  return (
    <APIProvider>
      <ThemeProvider>
        <RootNavigator />
        <FlashMessage position="top" />
      </ThemeProvider>
    </APIProvider>
  );
};

export default App;
