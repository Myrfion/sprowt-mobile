import {useAuth} from 'core';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Text, View} from 'ui';
import {SafeAreaView} from 'ui/SafeAreaView';

const styles = StyleSheet.create({
  header: {
    width: 100 + '%',
  },
  safeAreaView: {
    paddingHorizontal: 16,
    flex: 1,
    height: 100 + '%',
    alignItems: 'center',
  },
  logo: {
    width: 115,
    height: 36,
    marginBottom: 64,
    marginTop: 16,
  },
  subheader: {
    marginBottom: 28,
  },
  ilContainer: {
    height: 100,
    width: 100,
    backgroundColor: '#EAF6EF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
});

export const EmailVerification = () => {
  const {user} = useAuth();

  React.useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (user) {
          await user.reload();
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <Text variant="header" textAlign="center">
        Verify your account
      </Text>
      <Text variant="subheader" textAlign="center" style={styles.subheader}>
        Check your email for the link to verify your account.
      </Text>
    </SafeAreaView>
  );
};
