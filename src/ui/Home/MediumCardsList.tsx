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
  if (!posts) {
    return null;
  }

  return (
    <View flexDirection="column">
      {posts.map((post: IPost) => {
        return (
          <MediumCard
            rootStyles={styles.horizontalCard}
            key={`medium-card-${post.id}`}
            {...post}
          />
        );
      })}
    </View>
  );
};

export default MediumCardsList;
