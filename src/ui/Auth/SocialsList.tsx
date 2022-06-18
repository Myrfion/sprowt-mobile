import React, {FC} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {GoogleIcon, FacebookIcon, AppleIcon} from 'ui';

export enum SocialProviders {
  google,
  facebook,
  apple,
}

type SocialsListProps = {
  onPressSocial: (social: SocialProviders) => void;
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 20,
  },
  icon: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 42,
    marginHorizontal: 8,
  },
  googleIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  facebookIcon: {
    borderRadius: 40,
    marginHorizontal: 24,
  },
});

export const SocialsList: FC<SocialsListProps> = props => {
  const {onPressSocial} = props;

  return (
    <View style={styles.root}>
      <TouchableOpacity
        onPress={() => onPressSocial(SocialProviders.google)}
        style={[styles.icon, styles.googleIcon]}>
        <GoogleIcon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPressSocial(SocialProviders.apple)}
        style={[styles.icon]}>
        <AppleIcon />
      </TouchableOpacity>
    </View>
  );
};
