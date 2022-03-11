import {useNavigation, useRoute} from '@react-navigation/native';
import {useLikeMutation, useLikes} from 'api/useLikes';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer, {
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import {BackIcon, BaseTheme, Text, View} from 'ui';
import TagsList from 'ui/Home/TagList';
import {SafeAreaView} from 'ui/SafeAreaView';
import {IPost} from '../../../types';
import {
  FifteenBackIcon,
  FifteenForwardIcon,
  LikePlayIcon,
  PauseIcon,
  PlayIcon,
  RepeatIcon,
} from 'ui/icons/Player';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 0,
    width: 100 + '%',
    alignSelf: 'stretch',
  },
  playButtonContainer: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF6EF',
    borderRadius: 82,
  },
  playButton: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4EDDF',
    borderRadius: 72,
  },
});

export const Player = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const likeMutation = useLikeMutation();
  const {data: likes} = useLikes();

  const playerState = usePlaybackState();
  const progress = useProgress();

  const [isPlaying, setIsPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const post: IPost = route.params?.post;

  const {thumbnail, title, tags, id, mediaPath} = post;

  const isLiked = likes.includes(id);

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer();

      await TrackPlayer.add({
        id: id,
        url: mediaPath,
        title: title,
        artist: thumbnail,
      });

      await TrackPlayer.play();
      setIsPlaying(true);

      return async () => {
        await TrackPlayer.pause();
      };
    })();

    return async () => {
      await TrackPlayer.stop();
      await TrackPlayer.destroy();
    };
  }, [id, mediaPath, title, thumbnail]);

  async function onPlayPausePress() {
    if (playerState === State.Playing) {
      TrackPlayer.pause();
      setIsPlaying(false);
    }

    if (playerState === State.Paused) {
      TrackPlayer.play();
      setIsPlaying(true);
    }
  }

  async function onRepeatToggle() {
    if (repeat) {
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeat(false);
    } else {
      await TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeat(true);
    }
  }

  return (
    <SafeAreaView flex={1}>
      <ImageBackground
        source={{uri: thumbnail}}
        style={styles.imageBackground}
        blurRadius={20}
        resizeMode="cover">
        <View flex={1} width="100%" alignSelf="stretch" alignItems="center">
          <View
            flexDirection="row"
            mb="s"
            style={{width: 100 + '%'}}
            alignSelf="flex-start"
            pt="s"
            mx="m">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{alignSelf: 'flex-start'}}>
              <BackIcon color="#fff" />
            </TouchableOpacity>
          </View>
          <Image
            source={{uri: thumbnail}}
            style={{width: 352, height: 352, borderRadius: 352}}
          />
          <Text color="white" fontSize={32} fontWeight="bold" mt="xl" mb="s">
            {title}
          </Text>
          <TagsList tags={tags} textStyles={{color: 'white', fontSize: 14}} />
          <View
            alignSelf="stretch"
            backgroundColor="white"
            py="xl"
            borderTopEndRadius={50}
            borderTopStartRadius={50}
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="center">
            <TouchableOpacity onPress={() => likeMutation.mutate(id)}>
              <LikePlayIcon fill={isLiked ? '#0B5641' : 'none'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () =>
                await TrackPlayer.seekTo(progress.position - 15)
              }>
              <FifteenBackIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPlayPausePress}
              style={styles.playButtonContainer}>
              <View style={styles.playButton}>
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () =>
                await TrackPlayer.seekTo(progress.position + 15)
              }>
              <FifteenForwardIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={onRepeatToggle}>
              <RepeatIcon
                color={
                  repeat ? BaseTheme.colors.success300 : BaseTheme.colors.grey3
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
