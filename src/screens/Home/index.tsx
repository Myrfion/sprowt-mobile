import {useRoute} from '@react-navigation/native';
import {usePosts} from 'api/usePosts';
import {useAuth} from 'core';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Screen, Text} from 'ui';
import PhotoCard from 'ui/Home/PhotoCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {SearchInput} from 'ui/SearchInput';

const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: 16,
  },
});

export const Home = () => {
  const router = useRoute();

  const {signOut, user} = useAuth();
  const [search, setSearch] = useState('');
  const {data, isLoading, error} = usePosts();
  console.log(data?.length, isLoading, error);
  useEffect(() => {}, []);

  const firstName = user?.displayName?.split(' ')[0];

  return (
    <Screen>
      <SafeAreaView style={styles.safeAreaView}>
        <Text
          variant="header"
          textAlign="left"
          fontSize={28}
          paddingBottom="l"
          color="neutral900">
          Good morning, {firstName}
        </Text>
        <SearchInput text={search} onChange={setSearch} />
        <Text
          variant="header"
          textAlign="left"
          fontSize={28}
          marginTop="m"
          color="neutral900">
          Made for you
        </Text>
        <Text fontSize={14} mb="m">
          Recommended for{' '}
          <Text color="primary" fontWeight="bold">
            {router.params?.feeling}
          </Text>
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data?.map(post => {
            return (
              <PhotoCard
                key={post.id}
                rootStyles={{marginRight: 16}}
                isLiked
                onPress={() => console.log('photo-card')}
                {...post}
              />
            );
          })}
        </ScrollView>
        <Button label="LogOut" onPress={signOut} />
      </SafeAreaView>
    </Screen>
  );
};
