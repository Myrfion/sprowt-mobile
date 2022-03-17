import {useLikes} from 'api/useLikes';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'ui/View';
import {IPost} from '../../../types';
import MediumCard from './MediumCard';

type Props = {
  posts: Array<IPost> | undefined;
};

const styles = StyleSheet.create({
  horizontalCard: {
    marginBottom: 24,
  },
});

const MediumCardsList: React.FC<Props> = ({posts}) => {
  const {data: likes} = useLikes();

  if (!posts) {
    return null;
  }

  return (
    <View flexDirection="column">
      {posts.map((post: IPost) => {
        const isLiked = likes?.includes(post?.id);

        return (
          <MediumCard
            rootStyles={styles.horizontalCard}
            key={post.id}
            isLiked={isLiked}
            onPress={() => console.log('photo-card')}
            {...post}
            {...post}
          />
        );
      })}
    </View>
  );
};

export default MediumCardsList;
