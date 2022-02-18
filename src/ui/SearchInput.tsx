import * as React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {SearchIcon} from './icons';
import {View} from './View';

type Props = {
  text: string;
  onChange: (newText: string) => void;
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
  },
  input: {
    paddingVertical: 12,
    paddingLeft: 8,
  },
});

export const SearchInput: React.FC<Props> = ({text, onChange}) => {
  return (
    <View style={styles.inputContainer}>
      <SearchIcon />
      <TextInput
        value={text}
        onChangeText={onChange}
        placeholder="Topic, emotion, keyword"
        style={styles.input}
      />
    </View>
  );
};
