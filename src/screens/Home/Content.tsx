import {useNavigation, useRoute} from '@react-navigation/native';
import {useLikeMutation, useLikes} from 'api/useLikes';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Svg, {Path} from 'react-native-svg';
import Share from 'react-native-share';
import {BackIcon, BigHeartIcon, ShareIcon, Text, View, BaseTheme} from 'ui';
import {ContentIcons, toTitleCase} from 'ui/Home/BigCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {ScrollView} from 'ui/ScrollView';
import {IPost} from '../../../types';

const styles = StyleSheet.create({
  image: {
    width: 100 + '%',
    height: 370,
    borderRadius: 8,
  },

  imageContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
    width: 100 + '%',
    height: 370,
    borderRadius: 8,
  },

  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#EAF6EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#EAF6EF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: BaseTheme.colors.primary,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PlayIcon = props => (
  <Svg
    width={21}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M.334 4.327C.334 1.162 3.835-.75 6.497.962l11.936 7.673c2.45 1.575 2.45 5.155 0 6.73L6.497 23.038c-2.662 1.711-6.163-.2-6.163-3.365V4.327Z"
      fill="white"
    />
  </Svg>
);

export const Content = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {data: likes} = useLikes();
  const likeMutation = useLikeMutation();

  const post: IPost = route.params?.post;

  const {mediaType, thumbnail, title, id, description, tags} = post;

  const isLiked = likes.includes(id);

  return (
    <ScrollView>
      <SafeAreaView position="relative" height="100%" style={{flex: 1}}>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pb="m"
          pt="s">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon color="#424242" />
          </TouchableOpacity>
          <Text fontWeight="600" fontSize={18}>
            {toTitleCase(mediaType)}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Share.open({
                title: 'Sprowt',
                message: `Shared post ${title}`,
                url: 'https://www.sprowt.io/',
              })
            }
            style={styles.shareButton}>
            <ShareIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri: thumbnail}} style={styles.image} />
          <View
            flexDirection="row"
            justifyContent="space-between"
            mx="s"
            style={{marginTop: -36}}>
            <View style={styles.infoContainer}>
              <Text color="success300" fontWeight="600" fontSize={12}>
                10 min
              </Text>
            </View>
            <View style={styles.infoContainer}>{ContentIcons[mediaType]}</View>
          </View>
        </View>
        <View
          flexDirection="row"
          alignItems="center"
          my="l"
          width="100%"
          justifyContent="space-between">
          <View flexDirection="row" alignItems="center">
            <Text variant="header" mr="s">
              {title}
            </Text>
            <TouchableOpacity onPress={() => likeMutation.mutate(id)}>
              <BigHeartIcon fill={isLiked ? '#37493E' : 'none'} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => navigation.navigate('Player', {post})}>
            <PlayIcon />
          </TouchableOpacity>
        </View>
        <View flexDirection="row" mb="l">
          {tags.map(tag => {
            return (
              <View
                style={[styles.infoContainer, {marginRight: 8}]}
                key={tag.id}>
                <Text color="success300" fontWeight="bold">
                  {tag.name}
                </Text>
              </View>
            );
          })}
        </View>
        <Text>{description}</Text>
      </SafeAreaView>
    </ScrollView>
  );
};
