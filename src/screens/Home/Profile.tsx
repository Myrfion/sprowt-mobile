import {useNavigation} from '@react-navigation/native';
import {useProfile} from 'api/useProfile';
import {useAuth} from 'core';
import {format} from 'date-fns';
import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Linking} from 'react-native';
import {Text, View} from 'ui';
import ProfilePhoto from 'ui/Home/ProfilePhoto';
import {
  CardIcon,
  FamilyAccountIcon,
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

const Profile = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation();

  const {data: profileData, error} = useProfile();

  console.log('profile: ', profileData);
  const joinDate = new Date(
    profileData?.data.joinDate._seconds * 1000 +
      profileData?.data.joinDate._nanoseconds / 1000000,
  );

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView>
        <ProfileHeader title="Account" hideBack />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View alignItems="center" mb="l" mt="xs">
          <ProfilePhoto uri={profileData?.data.profilePicture} />
          <Text variant="header" textAlign="center" mb="s" mt="s">
            {profileData?.data.firstName} {profileData?.data.lastName}
          </Text>
          <Text>
            {profileData?.data.joinDate && format(joinDate, 'MMM d yyyy')}
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
