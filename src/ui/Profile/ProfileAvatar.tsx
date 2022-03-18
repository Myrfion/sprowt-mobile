import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import {LogoIcon} from 'ui/icons';
import {View} from 'ui/View';

const styles = StyleSheet.create({
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
  return (
    <TouchableOpacity style={{width: 90, height: 90, alignSelf: 'center'}}>
      <View width={80} height={80} borderRadius={80} style={styles.root}>
        <LogoIcon />
      </View>
      <View style={styles.cameraButton}>
        <CameraIcon />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileAvatar;
