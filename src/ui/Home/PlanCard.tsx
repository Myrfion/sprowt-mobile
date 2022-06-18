import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CheckmarkIcon} from 'ui/icons/Subscription';
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
  crossedPrice?: string;
  features: Array<string>;
};

const PlanCard: FC<Props> = ({
  title,
  price,
  rootStyles,
  active,
  period,
  onPress,
  crossedPrice,
  features,
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
        <View flexDirection="row" alignItems="center">
          {crossedPrice ? (
            <Text
              fontSize={16}
              fontWeight="bold"
              color="red"
              textDecorationLine="line-through"
              mr="xs">
              {crossedPrice}
            </Text>
          ) : null}
          <Text fontSize={16} fontWeight="bold" mr="xs">
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

      {features.map(feature => {
        return (
          <View flexDirection="row" alignItems="center" key={feature}>
            <CheckmarkIcon />
            <Text ml="xs">{feature}</Text>
          </View>
        );
      })}
    </TouchableOpacity>
  );
};

export default PlanCard;
