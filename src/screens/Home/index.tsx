import {useNavigation, useRoute} from '@react-navigation/native';
import {usePosts} from 'api/usePosts';
import {useAuth} from 'core';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Screen, Text, View} from 'ui';
import HorizontalCard from 'ui/Home/HorizontalCard';
import PhotoCard from 'ui/Home/PhotoCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {SearchInput} from 'ui/SearchInput';
import {IPost} from '../../../types';

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});

const exploreTags = ['Accaptance', 'Adaptability', 'Anger', 'Anxiety', 'Awe'];

export const Home = () => {
  const router = useRoute();
  const navigation = useNavigation();

  const {signOut, user} = useAuth();
  const [search, setSearch] = useState('');
  const [exploreTag, setExploreTag] = useState(exploreTags[0]);
  const {data, isLoading, error, refetch} = usePosts({
    tag: router.params?.feeling,
  });
  const {data: exploreData, isLoading: exploreLoading} = usePosts({tag: ''});
  console.log(data?.length, isLoading, error);
  useEffect(() => {}, []);

  const firstName = user?.displayName?.split(' ')[0];

  return (
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginBottom: 20}}>
          {exploreTags.map(tag => {
            const isSelected = tag === exploreTag;

            return (
              <TouchableOpacity
                style={{
                  backgroundColor: isSelected ? '#EAF6EF' : '#F8F8F8',
                  marginRight: 8,
                  height: 32,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}
                onPress={() => setExploreTag(tag)}
                key={tag}>
                <Text
                  style={{
                    color: isSelected ? '#0B5641' : '#2D2D2D',
                    fontWeight: isSelected ? '700' : '400',
                  }}>
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
  );
};
