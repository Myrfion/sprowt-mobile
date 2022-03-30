import * as React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BackIcon, BaseTheme, Text, View} from 'ui';
import MediumCard from 'ui/Home/MediumCard';
import {SafeAreaView} from 'ui/SafeAreaView';
import {SearchInput} from 'ui/SearchInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSearch} from 'api/useSearch';

const styles = StyleSheet.create({
  backButton: {
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    elevation: 3,
    backgroundColor: 'white',
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
  },
  scrollView: {
    overflow: 'visible',
  },
  mediumCard: {
    marginTop: 16,
  },
});

const Search = () => {
  const [query, setQuery] = React.useState('');
  const {data, isLoading, error} = useSearch({text: query});
  const route = useRoute();
  const text = route?.params?.text;

  const navigation = useNavigation();

  React.useEffect(() => {
    if (text) {
      setQuery(text);
    }
  }, [text]);

  console.log('Error: ', error);

  return (
    <View flex={1} backgroundColor="background">
      <SafeAreaView paddingHorizontal="m" pt="m">
        <View flexDirection="row" zIndex={10}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <BackIcon color={BaseTheme.colors.neutral900} />
          </TouchableOpacity>
          <View flexDirection="row" flex={1}>
            <SearchInput autoFocus text={query} onChange={setQuery} />
          </View>
        </View>
        <ScrollView style={styles.scrollView}>
          {isLoading && <ActivityIndicator />}
          {data?.length === 0 && !isLoading && query.length > 0 && (
            <Text mt="xl" variant="header" textAlign="center">
              Looks like there is no content that matches your search
            </Text>
          )}
          {data?.map(post => {
            return (
              <MediumCard
                isLiked
                onLike={() => console.log('like')}
                onPress={() => console.log('press')}
                key={post.id}
                rootStyles={styles.mediumCard}
                {...post}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Search;
