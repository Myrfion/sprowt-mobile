import {useNavigation} from '@react-navigation/native';
import {usePosts} from 'api/usePosts';
import {useTags} from 'api/useTags';
import {useAuth} from 'core';
import {useFeeling} from 'core/Feeling';
import React, {useState} from 'react';
import {ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'ui';
import MediumCard from 'ui/Home/MediumCard';
import HorizontalTags from 'ui/Home/HorizontalTags';
import {SearchInput} from 'ui/SearchInput';
import {IPost, ITag} from '../../../types';
import BigCard from 'ui/Home/BigCard';
import {SafeAreaView} from 'react-native';
import {addMinutes, compareAsc, startOfDay} from 'date-fns';
import {addHours} from 'date-fns/esm';

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
    return `Good morning, ${name}`;
  }

  if (
    compareAsc(currentDate, afternoon) === 1 &&
    compareAsc(currentDate, evening) === -1
  ) {
    return `Good afternoon, ${name}`;
  }

  if (
    compareAsc(currentDate, evening) === 1 &&
    compareAsc(currentDate, morning) === -1
  ) {
    return `Good evening, ${name}`;
  }

  return `Good evening, ${name}`;
};

export const Home = () => {
  const navigation = useNavigation();

  const {current: currentFeeling} = useFeeling();

  const {user} = useAuth();
  const [search, setSearch] = useState('');
  const {data: exploreTags} = useTags();
  const [exploreTag, setExploreTag] = useState<ITag>();
  const {data, isLoading, refetch} = usePosts({
    tag: currentFeeling,
  });
  const {data: exploreData, isLoading: exploreLoading} = usePosts({
    tag: exploreTag?.name || '',
  });

  const firstName = user?.displayName?.split(' ')[0];

  return (
    <View backgroundColor="background">
      <SafeAreaView />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
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
          paddingHorizontal="m">
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
          {data?.map((post: IPost) => {
            return (
              <BigCard key={post.id} rootStyles={styles.photoCard} {...post} />
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
          {exploreLoading && <ActivityIndicator />}
          {exploreData?.map((post: IPost) => {
            return (
              <MediumCard
                key={post.id}
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
