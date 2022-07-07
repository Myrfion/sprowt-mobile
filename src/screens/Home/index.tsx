import {useNavigation, useRoute} from '@react-navigation/native';
import {useTags} from 'api/tags';
import {useAuth} from 'core';
import {useFeeling} from 'core/Feeling';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
//import RNRestart from 'react-native-restart'; // Import package from node modules

import {ScrollView} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import {Text, View} from 'ui';
import MediumCard from 'ui/Home/MediumCard';
import HorizontalTags from 'ui/Home/HorizontalTags';
import {SearchInput} from 'ui/SearchInput';
import {IPost, ITag} from '../../../types';
import BigCard from 'ui/Home/BigCard';
import {SafeAreaView} from 'react-native';
import {addMinutes, compareAsc, startOfDay} from 'date-fns';
import {addHours} from 'date-fns/esm';
import {getPostsList} from 'api/posts';
import {usePremiumStore} from 'core/Premium';

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: 16,
    flex: 1,
  },
  tagButton: {
    borderRadius: 20,
    marginRight: 8,
    height: 32,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCard: {
    marginRight: 16,
  },
  horizontalCard: {
    marginBottom: 24,
  },
});

const getGreeting = (name: string | undefined) => {
  const currentDate = new Date();

  const morning = addMinutes(addHours(startOfDay(new Date()), 3), 30);
  const afternoon = addMinutes(addHours(startOfDay(new Date()), 12), 0);
  const evening = addMinutes(addHours(startOfDay(new Date()), 18), 0);

  if (
    compareAsc(currentDate, morning) === 1 &&
    compareAsc(currentDate, afternoon) === -1
  ) {
    return name ? `Good morning, ${name}` : 'Good morning';
  }

  if (
    compareAsc(currentDate, afternoon) === 1 &&
    compareAsc(currentDate, evening) === -1
  ) {
    return name ? `Good afternoon, ${name}` : 'Good afternoon';
  }

  if (
    compareAsc(currentDate, evening) === 1 &&
    compareAsc(currentDate, morning) === -1
  ) {
    return name ? `Good evening, ${name}` : 'Good evening';
  }

  return name ? `Good evening, ${name}` : 'Good evening,';
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {current: currentFeeling} = useFeeling();
  const {user} = useAuth();
  const {hasPremium} = usePremiumStore();

  const [search, setSearch] = useState('');
  const {tags: exploreTags} = useTags();
  const [exploreTag, setExploreTag] = useState<ITag>();

  const [discoverPosts, setDiscoverPosts] = useState<Array<IPost>>([]);
  const [isDiscoverPostsLoading, setIsDiscoverPostsLoading] = useState(false);

  const [explorePosts, setExplorePosts] = useState<Array<IPost>>([]);
  const [isExplorePostsLoading, setIsExplorePostsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await requestUserPermission();
    })();
  }, []);

  useEffect(() => {
    setIsDiscoverPostsLoading(true);
    (async () => {
      const discoverPostsResult = await getPostsList(currentFeeling ?? '');

      setDiscoverPosts(discoverPostsResult);
      setIsDiscoverPostsLoading(false);
    })();
  }, [currentFeeling]);

  useEffect(() => {
    console.log('subscription updated in Home hasPremium: ', hasPremium);
  }, [hasPremium]);

  /* useEffect(() => {
    console.log(route.params, ' ', hasPremium);
    if (route.params?.hasPremium) {
      setHasPremium(true);
      RNRestart.Restart();
    }
  }, [route.params, hasPremium]);*/

  useEffect(() => {
    setIsExplorePostsLoading(true);
    (async () => {
      const explorePostsResult = await getPostsList(exploreTag?.name ?? '');

      setExplorePosts(explorePostsResult);
      setIsExplorePostsLoading(false);
    })();
  }, [exploreTag?.name]);

  const firstName = user?.displayName?.split(' ')[0];

  return (
    <View backgroundColor="background">
      <SafeAreaView />
      <ScrollView
        refreshControl={<RefreshControl refreshing={isDiscoverPostsLoading} />}>
        <Text
          variant="header"
          textAlign="left"
          paddingBottom="l"
          color="neutral900"
          paddingHorizontal="m"
          pt="l">
          {getGreeting(firstName)}
        </Text>
        <View marginHorizontal="m">
          <SearchInput
            text={search}
            onChange={setSearch}
            onPress={() => navigation.navigate('Search')}
          />
        </View>
        <Text
          variant="subheader"
          textAlign="left"
          marginTop="m"
          color="neutral900"
          paddingHorizontal="m"
          mb="s">
          Made for you
        </Text>
        <Text fontSize={14} mb="m" paddingHorizontal="m">
          Recommended for{' '}
          <Text
            color="primary700"
            fontWeight="bold"
            onPress={() => navigation.navigate('FeelingPicker')}>
            {currentFeeling}
          </Text>
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingHorizontal: 16}}>
          {discoverPosts?.map((post: IPost) => {
            return (
              <BigCard
                key={`big-card-${post.id}`}
                rootStyles={styles.photoCard}
                {...post}
              />
            );
          })}
        </ScrollView>
        <Text
          variant="subheader"
          textAlign="left"
          marginTop="m"
          color="neutral900"
          marginBottom="m"
          marginHorizontal="m">
          Explore
        </Text>
        <HorizontalTags
          tags={exploreTags}
          selectedTag={exploreTag}
          onSelect={setExploreTag}
        />

        <View marginHorizontal="m">
          {isExplorePostsLoading && <ActivityIndicator />}
          {explorePosts?.map((post: IPost) => {
            return (
              <MediumCard
                key={`medium-card-${post.id}`}
                rootStyles={styles.horizontalCard}
                {...post}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
