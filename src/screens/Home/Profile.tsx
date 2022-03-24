import {useNavigation} from '@react-navigation/native';
import {useProfile} from 'api/useProfile';
import {useAuth} from 'core';
import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Image} from 'react-native';
import {Text, View} from 'ui';
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

const Profile = () => {
  const {signOut} = useAuth();
  const navigation = useNavigation();

  const {data: profileData} = useProfile();
  console.log(profileData);
  return (
    <View flex={1}>
      <SafeAreaView>
        <ProfileHeader title="Account" />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View alignItems="center" mb="l" mt="xs">
          {profileData?.data && (
            <Image
              source={{uri: profileData?.data.profilePicture}}
              style={styles.image}
            />
          )}
          <Text fontSize={32} textAlign="center" mb="s">
            {profileData?.data.firstName} {profileData?.data.lastName}
          </Text>
          <Text>Jan 3 2021</Text>
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
          onPress={() => console.log('Subscription')}
          rootStyles={styles.accountButton}
        />
        <AccountButton
          text="Family account"
          icon={<FamilyAccountIcon />}
          onPress={() => console.log('Family account')}
          rootStyles={styles.accountButton}
        />
        <Text color="neutral800" fontWeight="bold" fontSize={16} mt="l" mb="m">
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
      </ScrollView>
    </View>
  );
};

export default Profile;
