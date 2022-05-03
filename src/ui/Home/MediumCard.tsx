import {useNavigation} from '@react-navigation/native';
import {useLikeMutation, useLikes} from 'api/useLikes';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  StyleSheetProperties,
} from 'react-native';
import {View, Text, HeartIcon} from 'ui';
import {IPost} from '../../../types/index';
import {ContentIcons} from './BigCard';
import TagsList from './TagList';

const styles = StyleSheet.create({
  root: {
    width: 100 + '%',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 100 + '%',
    height: 128,

  },
  imageContainer: {
    width: 100 + '%',
    height: 128,
  },
  likeIcon: {
    zIndex: 10,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  dotSeparator: {
    marginTop: -3,
  },
  contentType: {marginLeft: 'auto'},
});

interface Props extends IPost {
  rootStyles?: StyleSheetProperties | null;
  isLiked: boolean;
  onLike: () => void;
  onPress: () => void;
}

const MediumCard: React.FC<Props> = props => {
  const {thumbnail, rootStyles, title, mediaType, tags, id} = props;

  const navigation = useNavigation();

  const {data: likes} = useLikes();
  const likeMutation = useLikeMutation();
  const isLiked = likes?.includes(id);

  const post: IPost = props;

  return (
    <TouchableOpacity
      style={[styles.root, rootStyles]}
      onPress={() => navigation.navigate('Content', {post})}>
      <View style={styles.imageContainer}>
        <Image source={{uri: thumbnail}} style={styles.image} />
        <View
          position="absolute"
          left={12}
          bottom={12}
          zIndex={10}
          mt="xss"
          backgroundColor="success100"
          paddingVertical="xss"
          paddingHorizontal="s"
          borderRadius={20}
          alignItems="center">
          <Text fontSize={12} color="success300" fontWeight="bold">
            10 mins
          </Text>
        </View>
        <TouchableOpacity
          style={styles.likeIcon}
          onPress={() => likeMutation.mutate(id)}>
          <HeartIcon fill={isLiked ? '#F8F8F8' : '#969696'} />
        </TouchableOpacity>
      </View>
      <View p="s">
        <View flexDirection="row" alignItems="center">
          <Text>{title}</Text>
          <Text style={styles.dotSeparator}> . </Text>
          <Text color="neutral700" fontWeight="500">
            {mediaType?.charAt(0).toUpperCase() + mediaType?.slice(1)}
          </Text>
          <View
            backgroundColor="success100"
            paddingVertical="xss"
            paddingHorizontal="s"
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            style={styles.contentType}>
            {ContentIcons[mediaType]}
          </View>
        </View>
        <TagsList tags={tags} />
      </View>
    </TouchableOpacity>
  );
};

export default MediumCard;
