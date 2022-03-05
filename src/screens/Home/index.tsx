import {useNavigation, useRoute} from '@react-navigation/native';
import {usePosts} from 'api/usePosts';
import {useTags} from 'api/useTags';
import {useAuth} from 'core';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
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
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  scrollView: {},
  tagButton: {
    borderRadius: 20,
    marginRight: 8,
    height: 32,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//const exploreTags = ['Accaptance', 'Adaptability', 'Anger', 'Anxiety', 'Awe'];

export const Home = () => {
  const router = useRoute();
  const navigation = useNavigation();

  const {user} = useAuth();
  const [search, setSearch] = useState('');
  const {data: exploreTags} = useTags();
  console.log(exploreTags);
  const [exploreTag, setExploreTag] = useState<ITag>();
  const {data, isLoading, refetch} = usePosts({
    tag: router.params?.feeling,
  });
  const {data: exploreData, isLoading: exploreLoading} = usePosts({
    tag: exploreTag?.name || '',
  });
  console.log('Tags: ', exploreTags);
  useEffect(() => {}, []);

  const firstName = user?.displayName?.split(' ')[0];

  function onExploreTagPress(tag: ITag) {
    setExploreTag(tag);
  }

  return (
    <>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <SafeAreaView style={styles.safeAreaView}>
          <Text
            variant="header"
            textAlign="left"
            fontSize={28}
            paddingBottom="l"
            color="neutral900">
            Good morning, {firstName}
          </Text>
          <SearchInput
            text={search}
            onChange={setSearch}
            onPress={() => navigation.navigate('Search')}
          />
          <Text
            variant="header"
            textAlign="left"
            fontSize={28}
            marginTop="m"
            color="neutral900">
            Made for you
          </Text>
          <Text fontSize={14} mb="m">
            Recommended for{' '}
            <Text
              color="primary"
              fontWeight="bold"
              onPress={() => navigation.goBack()}>
              {router.params?.feeling}
            </Text>
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data?.map(post => {
              return (
                <PhotoCard
                  key={post.id}
                  rootStyles={{marginRight: 16}}
                  isLiked
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
            marginBottom="m">
            Explore
          </Text>
          <HorizontalTags
            tags={exploreTags}
            selectedTag={exploreTag}
            onSelect={setExploreTag}
          />

          <View>
            {exploreLoading && <ActivityIndicator />}
            {exploreData?.map((post: IPost) => {
              return (
                <HorizontalCard
                  key={post.id}
                  rootStyles={{marginBottom: 24}}
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
