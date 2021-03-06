import {useNavigation} from '@react-navigation/native';
import {useLikeMutation, useLikes} from 'api/favourites';
import usePremium from 'api/usePremium';
import {usePremiumStore} from 'core/Premium';
import * as React from 'react';
import {StyleSheet, StyleSheetProperties, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  View,
  Text,
  HeadphoneIcon,
  HeartIcon,
  LockIcon,
  VideoIcon,
  MicIcon,
} from 'ui';
import {IPost, MediaTypes} from '../../../types/index';

const styles = StyleSheet.create({
  root: {
    width: 232,
    height: 275,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2D2D2D80',
  },
  image: {
    width: 100 + '%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  likeIcon: {
    zIndex: 10,
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const ContentIcons = {
  [MediaTypes.video]: <VideoIcon />,
  [MediaTypes.podcast]: <MicIcon />,
  [MediaTypes.meditation]: <HeadphoneIcon />,
};

interface Props extends IPost {
  rootStyles: StyleSheetProperties | null;
  isLiked: boolean;
  hasPremium: boolean;
}

const BigCard: React.FC<Props> = props => {
  const {
    rootStyles,
    title,
    tags,
    thumbnail,
    id,
    mediaType,
    duration,
    isPremium,
  } = props;
  const navigation = useNavigation();
  const {likes} = useLikes();
  const {updateLike} = useLikeMutation();

  const {hasPremium} = usePremiumStore();
  console.log('hasPremium: ', hasPremium);
  const isLiked = likes?.includes(id as string);

  const isAvailable = hasPremium || !isPremium;

  const slicedTags = tags.slice(0, 3);

  return (
    <TouchableOpacity
      style={[styles.root, rootStyles || {}]}
      onPress={() =>
        isAvailable
          ? navigation.navigate('Content', {post: props})
          : navigation.navigate('Subscription')
      }>
      {!isAvailable ? (
        <View style={styles.likeIcon}>
          <LockIcon />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.likeIcon}
          onPress={() => updateLike(id as string)}>
          <HeartIcon fill={isLiked ? '#F8F8F8' : '#969696'} />
        </TouchableOpacity>
      )}
      <FastImage source={{uri: thumbnail}} style={styles.image} />
      <View style={styles.overlay} />
      <View padding="s" alignSelf="flex-end" width="100%">
        <View flexDirection="row" alignItems="center">
          <Text
            color="white"
            fontWeight="bold"
            fontSize={24}
            marginBottom="xss">
            {title}
          </Text>
        </View>
        <View flexDirection="row" mb="xs" flexWrap="wrap">
          {slicedTags.slice(0, 3).map((tag, index) => {
            return (
              <React.Fragment key={tag.id}>
                <Text color="white" fontSize={12} key={tag.id}>
                  {tag.name}
                </Text>
                <Text color="white" fontSize={12} style={{marginTop: -3}}>
                  {slicedTags.length - 1 !== index && ' . '}
                </Text>
              </React.Fragment>
            );
          })}
        </View>
        <View flexDirection="row" justifyContent="space-between">
          <View
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
          <View
            mt="xss"
            backgroundColor="success100"
            paddingVertical="xss"
            paddingHorizontal="s"
            borderRadius={20}
            alignItems="center"
            justifyContent="center">
            {ContentIcons[mediaType]}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BigCard;
