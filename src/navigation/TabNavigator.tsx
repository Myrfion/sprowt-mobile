import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from 'screens';
import Onboarding from 'screens/Home/Onboarding';
import FeelingPicker from 'screens/Home/FeelingsPicker';
import Search from 'screens/Home/Search';
import Profile from 'screens/Home/Profile';
import Favourites from 'screens/Home/Favourites';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BaseTheme, HeartTabIcon, LogoIcon, ProfileTabIcon} from 'ui';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Content} from 'screens/Home/Content';
import {Player} from 'screens/Home/Player';
import {Raiting} from 'screens/Home/Raiting';
import {IPost} from '../../types';
import {Account} from 'screens/Home/Profile/Account';
import {Subscription} from 'screens/Home/Profile/Subscription';
import {Family} from 'screens/Home/Profile/Family';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationWithRef} from './RootNavigator';

const styles = StyleSheet.create({
  logoIconButton: {
    width: 64,
    height: 64,
    backgroundColor: BaseTheme.colors.primary50,
    borderRadius: 64,
    marginTop: -28,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6.27,
    zIndex: 10,
  },
});

export type TabParamList = {
  Favorites: undefined;
  Home: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  Onboarding: undefined;
  FeelingPicker: undefined;
  Search: {text?: string};
  Content: {post: IPost};
  Player: {post: IPost};
  Raiting: {post: IPost};
  Account: undefined;
  Subscription: undefined;
  Family: undefined;
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: BaseTheme.colors.white,
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Favorites"
        component={Favourites}
        options={{
          tabBarItemStyle: {
            marginRight: -32,
          },
          tabBarIcon: ({focused}) => (
            <HeartTabIcon
              color={
                focused
                  ? BaseTheme.colors.primary900
                  : BaseTheme.colors.neutral300
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={styles.logoIconButton}
              onPress={() => navigation.navigate('Home')}>
              <LogoIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={Profile}
        options={{
          tabBarItemStyle: {
            marginLeft: -32,
          },
          tabBarIcon: ({focused}) => (
            <ProfileTabIcon
              color={
                focused
                  ? BaseTheme.colors.primary900
                  : BaseTheme.colors.neutral300
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const HomeNavigator = () => {
  React.useEffect(() => {
    (async () => {
      const appData = await AsyncStorage.getItem('isAppFirstLaunch');

      if (!appData) {
        navigationWithRef('Onboarding');

        await AsyncStorage.setItem('isAppFirstLaunch', 'true');
      }
    })();
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FeelingPicker" component={FeelingPicker} />

      <Stack.Screen
        name="TabNavigation"
        component={TabNavigator}
        options={{headerShown: false}}
      />

      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Content" component={Content} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen
        name="Raiting"
        component={Raiting}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Family" component={Family} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};
