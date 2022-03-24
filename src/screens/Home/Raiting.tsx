import {useNavigation, useRoute} from '@react-navigation/native';
import {createFeedback} from 'api/useFeedback';
import {useAuth} from 'core';
import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Rating} from 'react-native-ratings';
import {useMutation} from 'react-query';
import {BaseTheme, Button, Text, View} from 'ui';
import TagsList from 'ui/Home/TagList';
import {SafeAreaView} from 'ui/SafeAreaView';
import {IPost} from '../../../types';

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 0,
    width: 100 + '%',
    alignSelf: 'stretch',
    padding: 25 + '%',
  },
  skipButton: {
    width: 100 + '%',
    justifyContent: 'center',
    paddingVertical: 8,
    marginTop: 8,
  },
  starsRaiting: {
    marginTop: 16,
    marginBottom: 24,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: BaseTheme.colors.neutral200,
    width: 100 + '%',
    height: 110,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  tagsList: {
    color: 'white',
    fontSize: 14,
  },
});

const FEEDBACK_RAITING = 3;

export const Raiting = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const {isLoading, mutate} = useMutation(createFeedback, {
    onError(error) {
      console.log('Error feedback mutation: ', error);
    },
    onSuccess() {
      showMessage({
        type: 'success',
        message: 'Thank you for the feedback',
      });
      navigation.navigate('Home');
    },
  });

  const {user} = useAuth();

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const post: IPost = route.params?.post;

  const {thumbnail, title, tags} = post;

  console.log('raiting: ', rating);

  function onSubmit() {
    mutate({
      text,
      raiting: rating,
      userId: user?.uid,
      postId: post.id,
    });
  }

  return (
    <SafeAreaView flex={1}>
      <ImageBackground
        source={{uri: thumbnail}}
        style={styles.imageBackground}
        blurRadius={3}
        resizeMode="cover">
        <View alignItems="center">
          <Text color="white" fontSize={32} fontWeight="bold" mt="xl" mb="s">
            {title}
          </Text>
          <TagsList tags={tags} textStyles={styles.tagsList} />
          <Text textAlign="center" color="white" mt="xl" fontSize={18} mx="l">
            Proven to help alleviate depression and anxiety, gratitude helps you
            live a happier, healthier, more appreciative life.
          </Text>
        </View>
        <View
          borderTopEndRadius={50}
          borderTopStartRadius={50}
          alignItems="center"
          backgroundColor="white"
          width="100%"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          pt="xl"
          px="m">
          <Text fontWeight="700" fontSize={18} mb="s">
            How would you rate this content?
          </Text>
          <Text color="neutral700" fontSize={16}>
            Your feedback helps us improve your experience
          </Text>
          <Rating
            imageSize={32}
            fractions={1}
            style={styles.starsRaiting}
            onFinishRating={setRating}
          />
          {rating <= FEEDBACK_RAITING && (
            <TextInput
              style={styles.feedbackInput}
              multiline
              numberOfLines={4}
              editable
              placeholder="We appreciate your thoughts and suggestions!"
              maxLength={400}
              value={text}
              onChangeText={setText}
            />
          )}

          <Button
            label="Submit"
            variant="primary"
            onPress={onSubmit}
            loading={isLoading}
          />
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.navigate('Home')}>
            <Text fontWeight="700" color="neutral900" textAlign="center">
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
