import {useNavigation} from '@react-navigation/native';
import {useLikeMutation, useLikes} from 'api/favourites';
import {usePremiumStore} from 'core/Premium';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, StyleSheetProperties} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View, Text, HeartIcon} from 'ui';
import {LockIcon} from 'ui/icons';
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
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
  rootStyles?: StyleSheetProperties | {};
}

const MediumCard: React.FC<Props> = props => {
  const {
    thumbnail,
    rootStyles,
    title,
    mediaType,
    tags,
    id,
    isPremium,
    duration,
  } = props;

  const navigation = useNavigation();

  const {likes} = useLikes();
  const {updateLike} = useLikeMutation();
  const {hasPremium} = usePremiumStore();

  const isAvailable = !isPremium || hasPremium;

  const isLiked = likes?.includes(id);

  const post: IPost = props;

  return (
    <TouchableOpacity
      style={[styles.root, rootStyles]}
      onPress={() =>
        isAvailable
          ? navigation.navigate('Content', {post})
          : navigation.navigate('Subscription')
      }>
      <View style={styles.imageContainer}>
        <FastImage source={{uri: thumbnail}} style={styles.image} />
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
            {duration ? `${duration} mins` : '0 mins'}
          </Text>
        </View>
        {isAvailable ? (
          <TouchableOpacity
            style={styles.likeIcon}
            onPress={async () => await updateLike(id as string)}>
            <HeartIcon fill={isLiked ? '#F8F8F8' : '#969696'} />
          </TouchableOpacity>
        ) : (
          <View style={styles.likeIcon}>
            <LockIcon />
          </View>
        )}
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
        <TagsList tags={tags} keyPrefix={title} />
      </View>
    </TouchableOpacity>
  );
};

export default MediumCard;
