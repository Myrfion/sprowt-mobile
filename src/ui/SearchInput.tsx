import * as React from 'react';
import {TextInput, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import {SearchIcon} from './icons';
import {Text} from './Text';
import {BaseTheme} from './theme';

type Props = {
  text: string;
  onChange: (newText: string) => void;
  onPress?: () => void;
  autoFocus?: boolean;
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#EAEAEA',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 16,

    shadowOffset: {width: 0, height: 0},
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    elevation: 3,
    width: 100 + '%',
  },
  input: {
    paddingVertical: 12,
    paddingLeft: 8,
  },
});

export const SearchInput: React.FC<Props> = ({
  text,
  onChange,
  onPress,
  autoFocus,
}) => {
  return (
    <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
      <SearchIcon />
      {onPress ? (
        <Text color="neutral300" py="s" ml="s">
          Topic, emotion, keyword
        </Text>
      ) : (
        <TextInput
          value={text}
          onChangeText={onChange}
          placeholder="Topic, emotion, keyword"
          style={styles.input}
          placeholderTextColor={BaseTheme.colors.neutral300}
          autoFocus={autoFocus}
          returnKeyType="search"
        />
      )}
    </TouchableOpacity>
  );
};
