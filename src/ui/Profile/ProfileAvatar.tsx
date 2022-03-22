import React, {useState} from 'react';
import {Image, StyleSheet, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {LogoIcon} from 'ui/icons';
import {View} from 'ui/View';
import {useProfilePicture, useProfilePictureAdd} from 'api/useProfilePicture';
import {ImageLibraryOptions} from 'react-native-image-picker';

const styles = StyleSheet.create({
  touchableOpacity: {
    width: 90,
    height: 90,
    alignSelf: 'center',
  },
  root: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    backgroundColor: '#F8F8F8',
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 2,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
});

const CameraIcon = props => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M15.335 12.667A1.333 1.333 0 0 1 14 14h-12a1.334 1.334 0 0 1-1.333-1.333V5.333A1.333 1.333 0 0 1 2.001 4h2.667l1.333-2h4l1.334 2H14a1.333 1.333 0 0 1 1.334 1.333v7.334Z"
      stroke="#424242"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.999 11.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333Z"
      stroke="#424242"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileAvatar = () => {
  const [image, setImage] =
    useState<ImagePicker.Asset | null | undefined>(null);

  const {data: profilePictureData, refetch} = useProfilePicture();
  const addProfilePicture = useProfilePictureAdd({onSuccess: refetch});
  console.log('profilePictureData: ', profilePictureData?.data.profilePicture);
  const selectImage = async () => {
    const options: ImageLibraryOptions = {
      maxHeight: 200,
      maxWidth: 200,
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 1,
    };

    const result = await ImagePicker.launchImageLibrary(options);

    if (result) {
      setImage(result.assets[0]);
      await uploadImage();
    }
  };

  const uploadImage = async () => {
    const {uri} = image;
    const filename =
      '/profiles/' + `${uri.substring(uri.lastIndexOf('/') + 1)}`;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    try {
      const ref = await storage().ref(filename);

      await ref.putFile(uploadUri);
      const url = await ref.getDownloadURL();
      console.log(url);
      addProfilePicture.mutate(url);
    } catch (e) {
      console.error(e);
    }

    console.log('Photo uploaded!');
    setImage(null);
  };

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={selectImage}>
      <View width={80} height={80} borderRadius={80} style={styles.root}>
        {profilePictureData?.data.profilePicture ? (
          <Image
            resizeMode="cover"
            resizeMethod="scale"
            source={{
              uri: profilePictureData?.data.profilePicture,
            }}
            style={styles.image}
          />
        ) : (
          <LogoIcon />
        )}
      </View>
      <View style={styles.cameraButton}>
        <CameraIcon />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileAvatar;
