import {useNavigation, useRoute} from '@react-navigation/native';
import {createFeedback} from 'api/useFeedback';
import {useAuth} from 'core';
import React, {useEffect, useRef, useState} from 'react';
import {
  EmitterSubscription,
  ImageBackground,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useMutation} from 'react-query';
import {BaseTheme, Button, showSuccessMessage, Text, View} from 'ui';
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

export const Raiting = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event: {
    endCoordinates: {height: React.SetStateAction<number>};
  }) => setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardShow,
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardHide,
    );

    return () => {
      keyboardDidShowListener?.current?.remove();
      keyboardDidHideListener?.current?.remove();
    };
  }, []);

  const {isLoading, mutate} = useMutation(createFeedback, {
    onError(error) {
      console.log('Error feedback mutation: ', error);
    },
    onSuccess() {
      showSuccessMessage('We appreciate your feedback :)');
      navigation.navigate('Home');
    },
  });

  const {user} = useAuth();

  const [rating, setRating] = useState(4.5);
  const [text, setText] = useState('');

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  const {post} = route.params as {post: IPost};

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
          <Text
            color="white"
            fontSize={32}
            fontWeight="bold"
            mt="xl"
            mb="s"
            variant="header">
            {title}
          </Text>
          <TagsList tags={tags} textStyles={styles.tagsList} />
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
          px="m"
          style={{paddingBottom: keyboardOffset}}>
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
            startingValue={4.5}
          />

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
