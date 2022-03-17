import {usePosts} from 'api/usePosts';
import React from 'react';
import {Text} from 'ui';
import MediumCardsList from 'ui/Home/MediumCardsList';
import {SafeAreaView} from 'ui/SafeAreaView';
import {ScrollView} from 'ui/ScrollView';

const Favourites = () => {
  const {data: posts} = usePosts({tag: ''});

  return (
    <ScrollView>
      <SafeAreaView pt="m">
        <Text
          variant="header"
          textAlign="left"
          fontSize={28}
          paddingBottom="l"
          color="neutral900">
          Favourites
        </Text>
        <MediumCardsList posts={posts} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Favourites;
