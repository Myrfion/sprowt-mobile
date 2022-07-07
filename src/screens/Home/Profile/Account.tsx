import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Button,
  Input,
  showErrorMessage,
  showSuccessMessage,
  Text,
  View,
} from 'ui';
import ProfileAvatar from 'ui/Profile/ProfileAvatar';
import ProfileHeader from 'ui/Profile/ProfileHeader';
import {Platform, SafeAreaView, ScrollView} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {InputDate} from 'ui/InputDate';
import {useProfile, useProfileUpdate} from 'api/profile';
import storage from '@react-native-firebase/storage';
import {convertFirebaseDateToDate} from '../Profile';

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

function convertFirebaseProfileToFormData(profile: any) {
  return {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    birthDay: profile?.birthDay
      ? convertFirebaseDateToDate(profile?.birthDay)
      : new Date(),
    profilePicture: profile?.profilePicture,
  };
}

export const Account = () => {
  const {profile} = useProfile();
  const {
    updateProfile,
    error: updateProfileError,
    loading: updateProfileLoading,
  } = useProfileUpdate();
  const navigation = useNavigation();
  console.log('updateProfileError: ', updateProfileError);
  const [imageUploading, setImageUploading] = useState(false);

  const {handleSubmit, control, reset} = useForm<ProfileData>({
    resolver: yupResolver(schema),
    defaultValues: convertFirebaseProfileToFormData(profile),
  });

  useEffect(() => {
    console.log('profile: ', profile);
    reset(convertFirebaseProfileToFormData(profile));
  }, [profile, reset]);

  const fullName = `${profile?.firstName} ${profile?.lastName}`;

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
        data.profilePicture !== undefined &&
        data.profilePicture !== profile?.profilePicture
      ) {
        const profilePictureUri = await uploadImage(data.profilePicture);
        await updateProfile({...data, profilePicture: profilePictureUri});
      } else {
        await updateProfile({
          firstName: data?.firstName,
          lastName: data?.lastName,
          birthDay: data?.birthDay,
        });
      }

      showSuccessMessage('Profile was successfuly updated');
      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      showErrorMessage(error?.message || 'error');
      showErrorMessage('profile update error');
    }
  };

  return (
    <View flex={1}>
      <SafeAreaView>
        <ProfileHeader title="Profile" />
      </SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <ProfileAvatar editMode name="profilePicture" control={control} />
        <Text fontSize={32} variant="header" textAlign="center" my="s">
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
            loading={updateProfileLoading || imageUploading}
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
