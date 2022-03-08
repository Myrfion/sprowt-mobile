import {useLikes} from 'api/useLikes';
import {usePosts} from 'api/usePosts';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'ui';
import HorizontalCard from 'ui/Home/HorizontalCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {ScrollView} from 'ui/ScrollView';
import {IPost} from '../../../types';

const styles = StyleSheet.create({
  horizontalCard: {
    marginBottom: 24,
  },
});

const Favourites = () => {
  const {data: likes} = useLikes();
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
        {posts
          ?.filter((post: IPost) => likes?.includes(post.id))
          .map((post: IPost) => {
            const isLiked = likes?.includes(post.id);

            return (
              <HorizontalCard
                rootStyles={styles.horizontalCard}
                key={post.id}
                isLiked={isLiked}
                onPress={() => console.log('photo-card')}
                {...post}
              />
            );
          })}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Favourites;
