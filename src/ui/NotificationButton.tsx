import React, {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from './Text';
import {BaseTheme} from './theme';
import {View} from './View';

type Props = {
  message: string;
  onPress: () => void;
  color: string;
  buttonText: string;
};

const NotificationButton: FC<Props> = ({
  message,
  onPress,
  color,
  buttonText,
}) => {
  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: color,
      flexDirection: 'row',
      borderRadius: 30,
      width: 'auto',
    },
  });

  return (
    <View mt="xs">
      <Text color="neutral800" my="m">
        {message}
      </Text>
      <View flexDirection="row">
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text color="white" fontWeight="bold">
            {buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationButton;
