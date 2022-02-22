import * as React from 'react';
import {
  Image,
  StyleSheet,
  StyleSheetProperties,
  TouchableOpacity,
} from 'react-native';
import {View, Text, HeadphoneIcon, HeartIcon} from 'ui';
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

interface Props extends IPost {
  rootStyles: StyleSheetProperties | null;
  isLiked: boolean;
  onLike: () => void;
  onPress: () => void;
}

const PhotoCard: React.FC<Props> = props => {
  const {rootStyles, isLiked, onPress, title, tags, thumbnail} = props;

  return (
    <TouchableOpacity style={[styles.root, rootStyles || {}]} onPress={onPress}>
      <TouchableOpacity style={styles.likeIcon}>
        <HeartIcon fill={isLiked ? '#F8F8F8' : '#969696'} />
      </TouchableOpacity>
      <Image source={{uri: thumbnail}} style={styles.image} />
      <View style={styles.overlay} />
      <View padding="s" alignSelf="flex-end" width="100%">
        <Text color="white" fontWeight="bold" fontSize={18} marginBottom="xss">
          {title}
        </Text>
        <View flexDirection="row" mb="xs" flexWrap="wrap">
          {tags.map((tag, index) => {
            console.log(tag.id);
            return (
              <React.Fragment key={tag.id}>
                <Text color="white" fontSize={12} key={tag.id}>
                  {tag.name}
                </Text>
                <Text color="white" fontSize={12} style={{marginTop: -3}}>
                  {tags.length - 1 !== index && ' . '}
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
              10 mins
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
            <HeadphoneIcon />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PhotoCard;