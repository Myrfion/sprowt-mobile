import {useNavigation, useRoute} from '@react-navigation/native';
import {useLikeMutation, useLikes} from 'api/useLikes';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Share from 'react-native-share';
import {
  BackIcon,
  BigHeartIcon,
  ShareIcon,
  Text,
  View,
  showErrorMessage,
} from 'ui';
import {ContentIcons, toTitleCase} from 'ui/Home/BigCard';
import {ScrollView} from 'react-native-gesture-handler';
import {IPost} from '../../../types';
import {PlayIcon, LockIcon} from 'ui/icons/Content';
import {usePosts} from 'api/usePosts';
import MediumCardsList from 'ui/Home/MediumCardsList';
import {SafeAreaView} from 'react-native';
import usePremium from 'api/usePremium';

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
    width: 82,
    height: 82,
    borderRadius: 82,
    backgroundColor: '#EDFCF8',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2D2D2D50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Content = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {hasPremium} = usePremium();

  const {data: likes} = useLikes();

  const likeMutation = useLikeMutation();

  const {data: allPosts} = usePosts({tag: ''});

  const post: IPost =
    route.params?.post || allPosts?.find(p => p.id === route.params?.postId);

  let {data: relatedPosts} = usePosts({tag: post?.tags[0].name || ''});

  if (!post) {
    return null;
  }

  relatedPosts = relatedPosts?.filter(p => p.id !== post.id);

  const {
    mediaType,
    thumbnail,
    title,
    id,
    description,
    tags,
    isPremium,
    duration,
  } = post;

  const isPostAvailable = !isPremium || hasPremium;

  const isLiked = likes?.includes(id) || false;

  function onPlay() {
    if (!isPostAvailable) {
      showErrorMessage('Buy premium to unlock this content');

      return;
    }

    navigation.navigate('Player', {post});
  }

  return (
    <View
      position="relative"
      height="100%"
      flex={1}
      backgroundColor="background">
      <SafeAreaView>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          pb="m"
          pt="s"
          px="m">
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
      </SafeAreaView>
      <ScrollView style={{paddingHorizontal: 16}}>
        <View style={styles.imageContainer}>
          <View position="relative">
            <Image source={{uri: thumbnail}} style={styles.image} />
            <View style={styles.overlay}>
              <TouchableOpacity style={styles.playButton} onPress={onPlay}>
                <PlayIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View
            flexDirection="row"
            justifyContent="space-between"
            mx="s"
            style={{marginTop: -36}}>
            <View style={styles.infoContainer}>
              <Text color="success300" fontWeight="600" fontSize={12}>
                {duration ?? 0} mins
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
            {!isPostAvailable ? (
              <LockIcon />
            ) : (
              <TouchableOpacity
                onPress={() => likeMutation.mutate(id as string)}>
                <BigHeartIcon fill={isLiked ? '#37493E' : 'none'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <ScrollView horizontal>
          {tags.map(tag => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Search', {text: tag.name})}
                style={[styles.infoContainer, {marginRight: 8}]}
                key={`tag-${tag.id}`}>
                <Text color="success300" fontWeight="bold">
                  {tag.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text my="l">{description}</Text>
        <View width={100 + '%'} height={1} backgroundColor="neutral200" />
        <Text my="l" fontSize={16}>
          Related to{' '}
          <Text fontSize={16} fontWeight="bold" color="primary700">
            {tags[0].name}
          </Text>
        </Text>
        <MediumCardsList posts={relatedPosts} />
      </ScrollView>
    </View>
  );
};
