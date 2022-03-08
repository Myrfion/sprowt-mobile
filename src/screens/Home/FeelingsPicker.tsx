import {useNavigation} from '@react-navigation/native';
import FEELINGS from 'constants/feelings';
import {useFeeling} from 'core/Feeling';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Text, View} from 'ui';
import {SafeAreaView} from 'ui/SafeAreaView';

const styles = StyleSheet.create({
  safeAreaView: {},
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
    borderColor: '#EAF6EF',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#EAF6EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const FeelingPicker = () => {
  const [pickedFeeling, setPickedFeeling] = useState(FEELINGS[0].name);
  const navigation = useNavigation();
  const {setCurrent} = useFeeling();

  function onNext() {
    setCurrent(pickedFeeling);
    navigation.navigate('TabNavigation', {
      screen: 'Home',
    });
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.safeAreaView} marginHorizontal="m">
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />
        <Text variant="header" fontSize={32}>
          Let's begin
        </Text>
        <Text fontSize={18}>What are you feeling?</Text>
        <View style={styles.buttonsContainer}>
          {FEELINGS.map(feeling => {
            const Icon = feeling.icon;
            const buttonStyles =
              feeling.name === pickedFeeling
                ? {backgroundColor: '#EAF6EF'}
                : {borderWidth: 1};
            const iconContainerStyles =
              feeling.name === pickedFeeling ? {backgroundColor: 'white'} : {};

            return (
              <TouchableOpacity
                style={[styles.button, buttonStyles]}
                key={feeling.name}
                onPress={() => setPickedFeeling(feeling.name)}>
                <View style={[styles.iconContainer, iconContainerStyles]}>
                  <Icon />
                </View>
                <Text marginLeft="m" fontSize={16}>
                  {feeling.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Button label="Let's go" onPress={onNext} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default FeelingPicker;
