import {useNavigation} from '@react-navigation/native';
import {getProfile, useProfile} from 'api/profile';
import {useAuth} from 'core';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Linking} from 'react-native';
import {Text, View} from 'ui';
import ProfilePhoto from 'ui/Home/ProfilePhoto';
import {
  CardIcon,
  FAQIcon,
  LogOutIcon,
  ProfileIcon,
  SupportIcon,
} from 'ui/icons/Profile';
import AccountButton from 'ui/Profile/AccountButton';
import ProfileHeader from 'ui/Profile/ProfileHeader';

const styles = StyleSheet.create({
  accountButton: {
    marginBottom: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
    marginBottom: 4,
  },
});

const FAQ_LINK = 'https://sprowt.zendesk.com/hc/en-us';
const SUPPORT_LINK = 'mailto:support@sprowt.zendesk.com';

export function convertFirebaseDateToDate(firebaseDate: any) {
  return new Date(
    firebaseDate._seconds * 1000 + firebaseDate._nanoseconds / 1000000,
  );
}

const Profile = () => {
  const {profile} = useProfile();

  console.log('user profile: ', profile);
  const {signOut} = useAuth();
  const navigation = useNavigation();

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView>
        <ProfileHeader title="Account" hideBack />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View alignItems="center" mb="l" mt="xs">
          <ProfilePhoto uri={profile?.profilePicture} />
          <Text variant="header" textAlign="center" mb="s" mt="s">
            {profile?.firstName} {profile?.lastName}
          </Text>
          <Text>
            {profile
              ? format(
                  convertFirebaseDateToDate(profile.joinDate),
                  'MMM d yyyy',
                )
              : ''}
          </Text>
          <Text color="neutral400">Member Since</Text>
        </View>
        <Text color="neutral800" fontWeight="bold" fontSize={16} mb="m">
          Account Settings
        </Text>

        <AccountButton
          text="Profile"
          icon={<ProfileIcon />}
          onPress={() => navigation.navigate('Account')}
          rootStyles={styles.accountButton}
        />
        <AccountButton
          text="Subscription"
          icon={<CardIcon />}
          onPress={() => navigation.navigate('Subscription')}
          rootStyles={styles.accountButton}
        />
        {/*<AccountButton
          text="Family account"
          icon={<FamilyAccountIcon />}
          onPress={() => navigation.navigate('Family')}
          rootStyles={styles.accountButton}
            />*/}
        <Text color="neutral800" fontWeight="bold" fontSize={16} mt="l" mb="m">
          Help
        </Text>
        <AccountButton
          text="Support"
          icon={<SupportIcon />}
          rootStyles={styles.accountButton}
          onPress={() => Linking.openURL(SUPPORT_LINK)}
        />
        <AccountButton
          text="FAQs"
          icon={<FAQIcon />}
          onPress={() => Linking.openURL(FAQ_LINK)}
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
      </ScrollView>
    </View>
  );
};

export default Profile;
