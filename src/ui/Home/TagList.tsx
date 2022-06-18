import * as React from 'react';
import {StyleProp, StyleSheet} from 'react-native';
import {Text, View} from 'ui';
import {ITag} from '../../../types';

type Props = {
  tags: Array<ITag>;
  textStyles?: StyleProp<Text>;
  keyPrefix?: string | '';
};

const styles = StyleSheet.create({
  dot: {marginTop: -3},
});

const TagsList: React.FC<Props> = props => {
  const {tags, textStyles, keyPrefix} = props;

  const slicedTags = tags?.slice(0, 3);

  return (
    <View flexDirection="row" mb="xs" flexWrap="wrap">
      {slicedTags.map((tag, index) => {
        return (
          <React.Fragment key={keyPrefix + tag.name}>
            <Text
              color="neutral700"
              fontSize={12}
              key={tag.id}
              style={textStyles}>
              {tag.name}
            </Text>
            <Text color="black" fontSize={12} style={[textStyles, styles.dot]}>
              {slicedTags.length - 1 !== index && ' . '}
            </Text>
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default TagsList;
