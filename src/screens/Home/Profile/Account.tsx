import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Input, showErrorMessage, Text, View} from 'ui';
import ProfileAvatar from 'ui/Profile/ProfileAvatar';
import ProfileHeader from 'ui/Profile/ProfileHeader';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {InputDate} from 'ui/InputDate';
import {useProfile, useProfileMutation} from 'api/useProfile';
import {showMessage} from 'react-native-flash-message';
import storage from '@react-native-firebase/storage';
import {parseISO} from 'date-fns';

export type ProfileData = {
  firstName: string;
  lastName: string;
  birthDay: Date;
  profilePicture: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  birthDay: yup.date().required(),
  profilePicture: yup.string(),
});

const styles = StyleSheet.create({
  cancelButton: {
    width: 100 + '%',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 8,
  },
  safeAreaView: {
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});

export const Account = () => {
  const {data: profileData, refetch} = useProfile();
  const navigation = useNavigation();

  const [imageUploading, setImageUploading] = useState(false);

  const {handleSubmit, control} = useForm<ProfileData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: profileData?.data.firstName,
      lastName: profileData?.data.lastName,
      birthDay: parseISO(profileData?.data.birthDay) || new Date(),
      profilePicture: profileData?.data.profilePicture,
    },
  });

  const profileMutation = useProfileMutation({
    onSuccess: () => {
      refetch();
      showMessage({
        type: 'success',
        message: 'Profile was successfuly updated',
      });
      navigation.goBack();
    },
    onError: () => {
      showMessage({
        type: 'danger',
        message: 'profile update error',
      });
    },
  });

  useEffect(() => {}, [profileData]);

  const fullName = `${profileData?.data?.firstName} ${profileData?.data?.lastName}`;

  const uploadImage = async (uri: string) => {
    const filename =
      '/profiles/' + `${uri.substring(uri.lastIndexOf('/') + 1)}`;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const ref = await storage().ref(filename);
    setImageUploading(true);
    await ref.putFile(uploadUri);
    const url = await ref.getDownloadURL();
    setImageUploading(false);
    return url;
  };

  const onSubmit = async (data: ProfileData) => {
    console.log(data);
    try {
      if (
        data.profilePicture &&
        data.profilePicture !== profileData?.data.profilePicture
      ) {
        const profilePictureUri = await uploadImage(data.profilePicture);
        profileMutation.mutate({...data, profilePicture: profilePictureUri});
      } else {
        profileMutation.mutate({...data});
      }
    } catch (error: any) {
      showErrorMessage(error?.message || 'error');
    }
  };

  return (
    <View flex={1}>
      <SafeAreaView style={styles.safeAreaView}>
        <ProfileHeader title="Profile" />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <ProfileAvatar editMode name="profilePicture" control={control} />
        <Text fontSize={32} textAlign="center" mb="s">
          {fullName}
        </Text>
        <Input name="firstName" label="First Name" control={control} />
        <Input name="lastName" label="Last Name" control={control} />
        <InputDate label="Birthday" name="birthDay" control={control} />
        <View backgroundColor="neutral100" height={1} width="100%" />
        <View style={{marginBottom: 'auto'}}>
          <Button
            label="Save changes"
            onPress={handleSubmit(onSubmit)}
            variant="primary"
            marginTop="l"
            loading={profileMutation.isLoading || imageUploading}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}>
            <Text fontWeight="700" color="red" textAlign="center">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
