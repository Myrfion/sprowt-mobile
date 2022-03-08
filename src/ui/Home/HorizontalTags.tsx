import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity, StyleProp} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'ui';

import {ITag} from '../../../types';

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  tagButton: {
    borderRadius: 20,
    marginRight: 8,
    height: 32,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  tags: Array<ITag> | undefined;
  selectedTag: ITag | undefined;
  onSelect: (tag: ITag) => void;
};

const HorizontalTags: FC<Props> = ({tags, selectedTag, onSelect}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollView}>
      {tags &&
        tags.map((tag: ITag) => {
          const isSelected = tag === selectedTag;

          const textStyles: StyleProp<Text> = {
            color: isSelected ? '#0B5641' : '#2D2D2D',
            fontWeight: isSelected ? '700' : '400',
          };

          return (
            <TouchableOpacity
              style={[
                styles.tagButton,
                {backgroundColor: isSelected ? '#EAF6EF' : '#F8F8F8'},
              ]}
              onPress={() => onSelect(tag)}
              key={tag.id}>
              <Text style={textStyles}>{tag.name}</Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

export default HorizontalTags;
