import {useNavigation} from '@react-navigation/native';
import FEELINGS from 'constants/feelings';
import {useFeeling} from 'core/Feeling';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {BaseTheme, Button, Text, View} from 'ui';

const styles = StyleSheet.create({
  safeAreaView: {
    marginHorizontal: 16,
  },
  logo: {
    width: 115,
    height: 36,
    marginBottom: 48,
    marginTop: 16,
  },
  buttonsContainer: {
    flexWrap: 'wrap',
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 16,
    width: 48 + '%',
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: BaseTheme.colors.primary400,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#EAF6EF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BaseTheme.colors.primary50,
  },
});

const FeelingPicker = () => {
  const navigation = useNavigation();
  const {setCurrent} = useFeeling();

  function onNext(feeling: string) {
    setCurrent(feeling);
    navigation.navigate('TabNavigation', {
      screen: 'Home',
    });
  }

  return (
    <View flex={1} px="m" backgroundColor="background">
      <SafeAreaView style={styles.safeAreaView} />
      <ScrollView>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text variant="header">Let's begin</Text>
        <Text fontSize={18}>What are you feeling?</Text>
        <View style={styles.buttonsContainer}>
          {FEELINGS.map(feeling => {
            const Icon = feeling.icon;

            return (
              <TouchableOpacity
                style={[styles.button, {borderWidth: 1}]}
                key={feeling.name}
                onPress={() => onNext(feeling.name)}>
                <View style={[styles.iconContainer]}>
                  <Icon />
                </View>
                <Text marginLeft="m" fontSize={16}>
                  {feeling.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeelingPicker;
