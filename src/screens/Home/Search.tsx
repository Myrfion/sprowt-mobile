import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BackIcon, BaseTheme, Text, View} from 'ui';
import MediumCard from 'ui/Home/MediumCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {SearchInput} from 'ui/SearchInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getPostsList} from 'api/posts';
import {IPost} from '../../../types';

const styles = StyleSheet.create({
  backButton: {
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    elevation: 3,
    backgroundColor: 'white',
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
  },
  scrollView: {
    overflow: 'visible',
  },
  mediumCard: {
    marginTop: 16,
  },
});

const Search = () => {
  const route = useRoute();

  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (route?.params?.text) {
      setQuery(route?.params?.text);
    }
  }, [route?.params?.text]);

  useEffect(() => {
    if (query.length > 0) {
      setIsPostsLoading(true);
      (async () => {
        const postsResult = await getPostsList(query);
        setPosts(postsResult);

        setIsPostsLoading(false);
      })();
    }
  }, [query]);

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView paddingHorizontal="m" pt="m">
        <View flexDirection="row" zIndex={10}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <BackIcon color={BaseTheme.colors.neutral900} />
          </TouchableOpacity>
          <View flexDirection="row" flex={1}>
            <SearchInput autoFocus text={query} onChange={setQuery} />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {isPostsLoading && <ActivityIndicator />}
          {posts?.length === 0 && !isPostsLoading && query.length > 0 && (
            <Text mt="xl" variant="subheader" textAlign="center">
              Looks like there is no content that matches your search
            </Text>
          )}
          {posts.map(post => {
            return (
              <MediumCard
                key={`medium-card-${post.id}`}
                rootStyles={styles.mediumCard}
                {...post}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Search;
