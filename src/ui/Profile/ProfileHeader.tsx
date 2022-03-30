import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BackIcon} from 'ui/icons';
import {Text} from 'ui/Text';
import {View} from 'ui/View';

type Props = {
  title: string;
  hideBack?: boolean;
};

const ProfileHeader: FC<Props> = ({title, hideBack}) => {
  const navigation = useNavigation();

  return (
    <View
      flexDirection="row"
      alignItems="center"
      justifyContent={hideBack ? 'center' : 'space-between'}
      py="s"
      px="m">
      {!hideBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color="#424242" />
        </TouchableOpacity>
      )}
      <Text fontWeight="600" fontSize={18}>
        {title}
      </Text>
      {!hideBack && <View width={24}></View>}
    </View>
  );
};

export default ProfileHeader;
