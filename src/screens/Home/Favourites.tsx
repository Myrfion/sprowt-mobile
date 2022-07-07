import {usePosts} from 'api/posts';
import React from 'react';
import {Text, View} from 'ui';
import MediumCardsList from 'ui/Home/MediumCardsList';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {ScrollView} from 'ui/ScrollView';
import {useLikes} from '../../api/favourites';

const Favourites = () => {
  const {posts, loading} = usePosts();
  const {likes} = useLikes();
  console.log('likes: ', likes);
  console.log(posts);
  const postsWithLikes = posts?.filter(p => likes?.includes(p.id as string));

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView />
      <ScrollView>
        <Text
          variant="header"
          textAlign="left"
          paddingBottom="l"
          color="neutral900"
          pt="l">
          Favourites
        </Text>
        {!loading && postsWithLikes?.length === 0 && (
          <Text mt="xl" variant="subheader" textAlign="center">
            Keep your favourite content here
          </Text>
        )}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <MediumCardsList posts={postsWithLikes} />
        )}
      </ScrollView>
    </View>
  );
};

export default Favourites;
