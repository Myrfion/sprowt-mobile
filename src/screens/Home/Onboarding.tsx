import {useNavigation} from '@react-navigation/native';
import useAsyncStorage from 'core/Storage';
import React, {useRef, useState, useEffect} from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import {Button, View, Text, BaseTheme} from 'ui';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 178,
    height: 56,
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,

    borderRadius: 10,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    justifyContent: 'space-between',
    width: 100 + '%',
  },
  slideText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 96,
    marginHorizontal: 16,
  },
  image: {
    width: 100 + '%',
    height: 361,
  },

  dotStyle: {width: 10, height: 10, borderRadius: 10},
  dotStyleActive: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: BaseTheme.colors.primary700,
  },
});

const sliderLength = 3;

const Onboarding = () => {
  const navigation = useNavigation();
  const swiperRef = useRef();
  const [index, setIndex] = useState(0);

  const {setValue} = useAsyncStorage();

  useEffect(() => {
    setValue('hadOnboarding', 'yes');
  }, [setValue]);

  function onNext() {
    if (index + 1 === sliderLength) {
      navigation.navigate('FeelingPicker');
    } else {
      swiperRef.current.scrollBy(1);
    }
  }

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView style={styles.safeAreaView}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logo}
        />

        <Swiper
          onIndexChanged={setIndex}
          ref={swiperRef}
          loop={false}
          bounces
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.dotStyleActive}>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/illustrations/il_onboarding1.png')}
              style={styles.image}
            />
            <Text style={styles.slideText}>
              Check in with how you’re feeling and discover meditations made for
              your mood
            </Text>
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/illustrations/il_onboarding2.png')}
              style={styles.image}
            />
            <Text style={styles.slideText}>
              Choose what resonates, find stillness, and tend to the garden of
              your inner world
            </Text>
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/illustrations/il_onboarding3.png')}
              style={styles.image}
            />
            <Text style={styles.slideText}>
              Practice regularly to cultivate peace, resilience and adaptability
            </Text>
          </View>
        </Swiper>
        <Button label="Next" onPress={onNext} marginHorizontal="m" />
      </SafeAreaView>
    </View>
  );
};

export default Onboarding;
