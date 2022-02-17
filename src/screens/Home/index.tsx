import {useAuth} from 'core';
import React, {useEffect} from 'react';
import {Button, Screen, Text, View} from 'ui';

export const Home = () => {
  const {signOut, user} = useAuth();

  useEffect(() => {}, []);
  console.log(user);
  return (
    <Screen>
      <View flex={1} justifyContent="center">
        <Text variant="header" textAlign="center">
          Welcome, {user?.displayName}
        </Text>
        <Button label="LogOut" onPress={signOut} />
      </View>
    </Screen>
  );
};
