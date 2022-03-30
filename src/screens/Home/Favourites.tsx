import {usePosts} from 'api/usePosts';
import React from 'react';
import {Text, View} from 'ui';
import MediumCardsList from 'ui/Home/MediumCardsList';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'ui/ScrollView';
import {useLikes} from '../../api/useLikes';

const Favourites = () => {
  const {data: posts} = usePosts({tag: ''});
  const {data: likes} = useLikes();

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView />
      <ScrollView>
        <Text
          variant="header"
          textAlign="left"
          fontSize={28}
          paddingBottom="l"
          color="neutral900"
          pt="l">
          Favourites
        </Text>
        <MediumCardsList posts={posts?.filter(p => likes.includes(p.id))} />
      </ScrollView>
    </View>
  );
};

export default Favourites;
