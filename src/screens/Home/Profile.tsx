import {useNavigation} from '@react-navigation/native';
import {useAuth} from 'core';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path, Rect} from 'react-native-svg';
import {BackIcon, Button, Text, View} from 'ui';
import {toTitleCase} from 'ui/Home/BigCard';
import AccountButton from 'ui/Profile/AccountButton';
import ProfileAvatar from 'ui/Profile/ProfileAvatar';
import {SafeAreaView} from 'ui/SafeAreaView';

const ProfileIcon = props => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15 15.75v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v1.5M9 8.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke="#0B5641"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CardIcon = props => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M17.75 5H4.25a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5ZM2.75 9.5h16.5"
      stroke="#0B5641"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RightArrowIcon = props => {
  return (
    <Svg
      width={8}
      height={14}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="m1 13 6-6-6-6"
        stroke="#424242"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const FamilyAccountIcon = props => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M14 17.75v-1.5a3 3 0 0 0-3-3H5.75a3 3 0 0 0-3 3v1.5M17 8v4.5M19.25 10.25h-4.5M8.375 10.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke="#0B5641"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SupportIcon = props => (
  <Svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11 18.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM11 14.75h.008"
      stroke="#0B5641"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.816 8.75a2.25 2.25 0 0 1 4.373.75c0 1.5-2.25 2.25-2.25 2.25"
      stroke="#0B5641"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FAQIcon = props => (
  <Svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Rect x={0.5} y={0.5} width={31} height={31} rx={15.5} fill="#EDFCF8" />
    <Path
      d="M16 23.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM16 19v-3M16 13h.008"
      stroke="#0B5641"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x={0.5} y={0.5} width={31} height={31} rx={15.5} stroke="#DFF5EF" />
  </Svg>
);

const LogOutIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M11 11.75 14.75 8 11 4.25M14.75 8h-9M5.75 14.75h-3a1.5 1.5 0 0 1-1.5-1.5V2.75a1.5 1.5 0 0 1 1.5-1.5h3"
      stroke="#DC2626"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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
