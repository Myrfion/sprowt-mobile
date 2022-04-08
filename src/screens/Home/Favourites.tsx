import {usePosts} from 'api/usePosts';
import React from 'react';
import {Text, View} from 'ui';
import MediumCardsList from 'ui/Home/MediumCardsList';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import {ScrollView} from 'ui/ScrollView';
import {useLikes} from '../../api/useLikes';

const Favourites = () => {
  const {data: posts, isLoading, isFetched} = usePosts({tag: ''});
  const {data: likes} = useLikes();

  const postsWithLikes = posts?.filter(p => likes?.includes(p.id));

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
        {isLoading || !isFetched ? (
          <ActivityIndicator />
        ) : (
          <MediumCardsList posts={postsWithLikes} />
        )}
      </ScrollView>
    </View>
  );
};

export default Favourites;
