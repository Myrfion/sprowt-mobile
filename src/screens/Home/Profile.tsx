import {useAuth} from 'core';
import React from 'react';
import {Button, Text} from 'ui';
import {SafeAreaView} from 'ui/SafeAreaView';

const Profile = () => {
  const {signOut} = useAuth();

  return (
    <SafeAreaView>
      <Text>Profile screen</Text>
      <Button label="LogOut" onPress={signOut} />
    </SafeAreaView>
  );
};

export default Profile;
