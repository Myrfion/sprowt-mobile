import * as React from 'react';
import {Text, View} from 'ui';
import {ITag} from '../../../types';

type Props = {
  tags: Array<ITag>;
};

const TagsList: React.FC<Props> = props => {
  const {tags} = props;

  const slicedTags = tags.slice(0, 3);

  return (
    <View flexDirection="row" mb="xs" flexWrap="wrap">
      {slicedTags.map((tag, index) => {
        console.log(tag.id);
        return (
          <React.Fragment key={tag.id}>
            <Text color="neutral700" fontSize={12} key={tag.id}>
              {tag.name}
            </Text>
            <Text color="black" fontSize={12} style={{marginTop: -3}}>
              {slicedTags.length - 1 !== index && ' . '}
            </Text>
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default TagsList;
