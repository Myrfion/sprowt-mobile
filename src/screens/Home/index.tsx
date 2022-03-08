import {useNavigation} from '@react-navigation/native';
import {useLikes} from 'api/useLikes';
import {usePosts} from 'api/usePosts';
import {useTags} from 'api/useTags';
import {useAuth} from 'core';
import {useFeeling} from 'core/Feeling';
import React, {useState} from 'react';
import {ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, View} from 'ui';
import HorizontalCard from 'ui/Home/HorizontalCard';
import HorizontalTags from 'ui/Home/HorizontalTags';
import PhotoCard from 'ui/Home/PhotoCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {SearchInput} from 'ui/SearchInput';
import {IPost, ITag} from '../../../types';

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

export const Home = () => {
  const navigation = useNavigation();

  const {current: currentFeeling} = useFeeling();

  console.log('Feeling: ', currentFeeling);

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
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <SafeAreaView style={styles.safeAreaView}>
          <Text
            variant="header"
            textAlign="left"
            fontSize={28}
            paddingBottom="l"
            color="neutral900"
            paddingHorizontal="m">
            Good morning, {firstName}
          </Text>
          <View marginHorizontal="m">
            <SearchInput
              text={search}
              onChange={setSearch}
              onPress={() => navigation.navigate('Search')}
            />
          </View>
          <Text
            variant="header"
            textAlign="left"
            fontSize={28}
            marginTop="m"
            color="neutral900"
            paddingHorizontal="m">
            Made for you
          </Text>
          <Text fontSize={14} mb="m" paddingHorizontal="m">
            Recommended for{' '}
            <Text
              color="primary"
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
                <PhotoCard
                  key={post.id}
                  rootStyles={styles.photoCard}
                  onPress={() => console.log('photo-card')}
                  {...post}
                />
              );
            })}
          </ScrollView>
          <Text
            variant="header"
            textAlign="left"
            fontSize={28}
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
                <HorizontalCard
                  key={post.id}
                  rootStyles={styles.horizontalCard}
                  {...post}
                />
              );
            })}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
