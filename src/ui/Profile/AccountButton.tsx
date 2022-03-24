import React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RightArrowIcon} from 'ui/icons/Profile';
import {Text} from 'ui/Text';
import {View} from 'ui/View';

type Props = {
  text: string;
  icon: React.ReactElement;
  onPress: () => void;
  rootStyles: StyleProp<ViewStyle> | null;
  isLogOut?: boolean | false;
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: '#DFF5EF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const AccountButton: React.FC<Props> = props => {
  const {text, icon, onPress, rootStyles, isLogOut} = props;

  return (
    <TouchableOpacity style={[styles.root, rootStyles]} onPress={onPress}>
      <View
        width={32}
        height={32}
        borderRadius={32}
        style={[
          styles.iconContainer,
          {backgroundColor: isLogOut ? '#FFFBFB' : '#EDFCF8'},
        ]}>
        {icon}
      </View>
      <Text color={isLogOut ? 'red' : 'neutral900'} ml="m">
        {text}
      </Text>
      <View
        width={24}
        height={24}
        justifyContent="center"
        alignItems="center"
        style={{marginLeft: 'auto'}}>
        <RightArrowIcon />
      </View>
    </TouchableOpacity>
  );
};

export default AccountButton;
