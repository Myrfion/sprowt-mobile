import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'ui/Text';
import {View} from 'ui/View';

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,

    borderRadius: 8,
    padding: 16,
    width: 100 + '%',
  },
});

type Props = {
  title: string;
  price: string;
  rootStyles: any;
  period: string;
  active: boolean;
  onPress: () => void;
};

const PlanCard: FC<Props> = ({
  title,
  price,
  rootStyles,
  active,
  period,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.root, rootStyles]} onPress={onPress}>
      <View flexDirection="row" justifyContent="space-between" mb="m">
        <View flexDirection="row" alignItems="center">
          <View backgroundColor="primary50" py="xs" px="s" borderRadius={3}>
            <Text color="success300" fontWeight="bold">
              {title}
            </Text>
          </View>
          <Text ml="xs">
            {period.charAt(0).toUpperCase() + period.slice(1)}ly
          </Text>
        </View>
        <View flexDirection="row">
          <Text fontSize={18} fontWeight="bold" mr="xs">
            {price}
          </Text>
          <Text color="neutral400">/ {period}</Text>
          <View
            width={20}
            height={20}
            borderRadius={20}
            borderColor={active ? 'primary700' : 'neutral200'}
            borderWidth={2}
            ml="m"
            justifyContent="center"
            alignItems="center">
            {active && (
              <View
                style={{width: 10, height: 10, borderRadius: 10}}
                backgroundColor="primary700"></View>
            )}
          </View>
        </View>
      </View>

      <Text>
        Share the love by adding up to 4 members to your account {'\n'}
        Learn EQ for a happier, healthier life{'\n'}Access all premium content
        with new content
      </Text>
    </TouchableOpacity>
  );
};

export default PlanCard;
