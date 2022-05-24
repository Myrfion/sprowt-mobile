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
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
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
  image: {
    width: 330,
    height: 320,
    borderRadius: 330,

   
  },
});

function convertHMS(value: Number) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds; // Return is HH : MM : SS
}

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

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      console.log('STATE CHANGE: ', event.state);
      if (event.nextTrack === undefined && !repeat) {
        console.log('STATE CHANGE: ', event.state);
        await TrackPlayer.pause();
        navigation.navigate('Raiting', { post });
        
      }
    },
  );

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

    return () => {
      (async () => {
        await TrackPlayer.stop();
        await TrackPlayer.destroy();
      })();
      
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
        blurRadius={3}
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
          <Image source={{uri: thumbnail}} style={styles.image} />
          <Text color="white" fontSize={32} fontWeight="bold" mt="xl" mb="s">
            {title}
          </Text>
          <TagsList tags={tags} textStyles={{color: 'white', fontSize: 14}} />
          <Text color="white" mt="s">
            {convertHMS(progress.position)} / {convertHMS(progress.duration)}
          </Text>
          <Slider
            style={{width: '70%', height: 40}}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor={BaseTheme.colors.primary600}
            maximumTrackTintColor={BaseTheme.colors.white}
            thumbTintColor={BaseTheme.colors.primary600}
            value={progress.position}
            onSlidingComplete={async pos => await TrackPlayer.seekTo(pos)}
          />
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