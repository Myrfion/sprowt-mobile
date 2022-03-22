import {useNavigation} from '@react-navigation/native';
import {useAuth} from 'core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {BackIcon, Text, View} from 'ui';
import {
  CardIcon,
  FamilyAccountIcon,
  FAQIcon,
  LogOutIcon,
  ProfileIcon,
  SupportIcon,
} from 'ui/icons/Profile';
import AccountButton from 'ui/Profile/AccountButton';
import ProfileAvatar from 'ui/Profile/ProfileAvatar';
import {SafeAreaView} from 'ui/SafeAreaView';

const styles = StyleSheet.create({
  accountButton: {
    marginTop: 16,
  },
});

const Profile = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation();

  const {user} = useAuth();

  return (
    <ScrollView>
      <SafeAreaView px="m">
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pb="l"
          pt="s">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color="#424242" />
          </TouchableOpacity>
          <Text fontWeight="600" fontSize={18}>
            Account
          </Text>
          <View width={24}></View>
        </View>
        <ProfileAvatar />
        <View alignItems="center" mb="l">
          <Text fontSize={32} textAlign="center" mb="s">
            {user?.displayName}
          </Text>
          <Text>Jan 3 2021</Text>
          <Text color="neutral400">Member Since</Text>
        </View>
        <Text color="neutral800" fontWeight="bold" fontSize={16}>
          Account Settings
        </Text>

        <AccountButton
          text="Profile"
          icon={<ProfileIcon />}
          onPress={() => console.log('profile')}
          rootStyles={styles.accountButton}
        />
        <AccountButton
          text="Subscription"
          icon={<CardIcon />}
          onPress={() => console.log('Subscription')}
          rootStyles={styles.accountButton}
        />
        <AccountButton
          text="Family account"
          icon={<FamilyAccountIcon />}
          onPress={() => console.log('Family account')}
          rootStyles={styles.accountButton}
        />
        <Text color="neutral800" fontWeight="bold" fontSize={16} mt="l">
          Help
        </Text>
        <AccountButton
          text="Support"
          icon={<SupportIcon />}
          onPress={() => console.log('Support')}
          rootStyles={styles.accountButton}
        />
        <AccountButton
          text="FAQs"
          icon={<FAQIcon />}
          onPress={() => console.log('FAQ')}
          rootStyles={styles.accountButton}
        />
        <View width="100%" height={1} backgroundColor="neutral100" my="l" />
        <AccountButton
          text="Log out"
          icon={<LogOutIcon />}
          onPress={signOut}
          rootStyles={styles.accountButton}
          isLogOut
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
