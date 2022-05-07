import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'ui';
import FlashMessage from 'react-native-flash-message';
import {RootNavigator} from 'navigation';
import messaging from '@react-native-firebase/messaging';
import {hydrateAuth, setI18nConfig} from 'core';
import APIProvider from 'api/APIProvider';
//import {registerPushNotifications} from 'services/push-notifications';
import {Alert} from 'react-native';
import {notificationManager} from 'services/notification-service';

setI18nConfig();
hydrateAuth();
//registerPushNotifications();
notificationManager.configure();
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

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
