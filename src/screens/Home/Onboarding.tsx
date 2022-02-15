import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {default as OnboardingSwiper} from 'react-native-onboarding-swiper';
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
    marginHorizontal: 6,
    borderRadius: 10,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    justifyContent: 'space-between',
  },
  slideText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 96,
    marginHorizontal: 16,
  },
  image1: {width: 352, height: 313},
  image2: {width: 355, height: 278},
  image3: {width: 352, height: 404},
});

const sliderLength = 3;

const Onboarding = () => {
  const navigation = useNavigation();
  const swiperRef = useRef();
  const [index, setIndex] = useState(0);
  console.log(index);

  function onNext() {
    if (index + 1 === sliderLength) {
      navigation.navigate('Home');
    } else {
      swiperRef.current.scrollBy(1);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Swiper
        onIndexChanged={setIndex}
        ref={swiperRef}
        loop={false}
        bounces
        dotStyle={{width: 10, height: 10, borderRadius: 10}}
        activeDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: BaseTheme.colors.primary,
        }}>
        <View style={styles.slide}>
          <Image
            source={require('../../../assets/illustrations/il_onboarding1.png')}
            style={styles.image1}
          />
          <Text style={styles.slideText}>
            Check in with how you’re feeling and discover meditations made for
            your mood
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../../assets/illustrations/il_onboarding2.png')}
            style={styles.image2}
          />
          <Text style={styles.slideText}>
            Choose what resonates, find stillness, and tend to the garden of
            your inner world
          </Text>
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../../assets/illustrations/il_onboarding3.png')}
            style={styles.image3}
          />
          <Text style={styles.slideText}>
            Practice regularly to cultivate peace, resilience and adaptability
          </Text>
        </View>
      </Swiper>
      <Button label="Next" onPress={onNext} marginHorizontal="m" />
    </SafeAreaView>
  );
};

export default Onboarding;
