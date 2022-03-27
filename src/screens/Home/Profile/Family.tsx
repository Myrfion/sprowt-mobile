import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text, Button} from 'ui';
import ProfileHeader from 'ui/Profile/ProfileHeader';
import {useProfile} from 'api/useProfile';
import ProfilePhoto from 'ui/Home/ProfilePhoto';

const styles = StyleSheet.create({
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 'auto',
  },
  scrollView: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

export const Family = () => {
  const {data: profileData} = useProfile();

  return (
    <View flex={1}>
      <SafeAreaView>
        <ProfileHeader title="Family Account" />
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProfilePhoto />
        <Text fontSize={32} textAlign="center" mb="s" mt="s">
          {profileData?.data.firstName} {profileData?.data.lastName}
        </Text>
        <View
          flex={1}
          width="100%"
          borderRadius={8}
          overflow="hidden"
          borderColor="neutral100"
          borderWidth={1}
          marginTop="xl">
          <View backgroundColor="primary50" px="l" py="s">
            <Text fontWeight="bold">Name</Text>
          </View>
          <View
            flexDirection="row"
            alignItems="center"
            py="m"
            px="m"
            borderColor="neutral100"
            borderTopWidth={1}>
            <Image
              source={{uri: profileData?.data.profilePicture}}
              style={{width: 32, height: 32, borderRadius: 32, marginRight: 12}}
            />
            <View>
              <Text fontWeight="bold">Anna Bandi</Text>
              <Text fontSize={12}>annabandi@example.com</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Text color="red" fontWeight="bold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
          <View
            flexDirection="row"
            alignItems="center"
            py="m"
            px="m"
            borderColor="neutral100"
            borderTopWidth={1}>
            <Image
              source={{uri: profileData?.data.profilePicture}}
              style={{width: 32, height: 32, borderRadius: 32, marginRight: 12}}
            />
            <View>
              <Text fontWeight="bold">Anna Bandi</Text>
              <Text fontSize={12}>annabandi@example.com</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}>
              <Text color="red" fontWeight="bold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button
          label="+ Add New Member"
          onPress={() => console.log('add new member')}
          marginTop="xl"
        />
      </ScrollView>
    </View>
  );
};
