import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View} from '../View';
import {LogoIcon} from 'ui/icons';

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
    borderRadius: 80,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
});

const ProfilePhoto = ({uri}: {uri: string | undefined}) => {
  return (
    <View style={styles.root}>
      {uri ? <Image source={{uri}} style={styles.image} /> : <LogoIcon />}
    </View>
  );
};

export default ProfilePhoto;
