import {format} from 'date-fns';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {AdaptyProduct, AdaptySubscriptionsInfo} from 'react-native-adapty';
import {Text, View} from 'ui';

const styles = StyleSheet.create({
  paymentCard: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    backgroundColor: '#FBFBFB',
  },
});

type Props = {
  purchasedSubscription: AdaptySubscriptionsInfo | null | undefined;
  subscriptions: Array<AdaptyProduct>;
};

const SubscriptionInfoPanel: FC<Props> = ({
  purchasedSubscription,
  subscriptions,
}) => {
  const subscriptionInfo = subscriptions.find(
    s => s.vendorProductId === purchasedSubscription?.vendorProductId,
  );

  return (
    <View
      backgroundColor="primary50"
      width="100%"
      borderRadius={8}
      style={styles.paymentCard}>
      <View
        backgroundColor="primary600"
        p="m"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        width="100%"
        justifyContent="space-between"
        flexDirection="row">
        <View flexDirection="row" alignItems="center">
          <View py="xs" px="s" backgroundColor="white" borderRadius={3}>
            <Text color="success300" fontWeight="bold">
              Grow
            </Text>
          </View>
          <Text ml="xs" color="white">
            Monthly
          </Text>
        </View>
        <View flexDirection="row">
          <Text fontSize={24} color="white" fontWeight="bold" mr="xs">
            {subscriptionInfo?.localizedPrice}
          </Text>
          <Text color="white">/ month</Text>
        </View>
      </View>
      <View
        flexDirection="row"
        mx="m"
        pt="l"
        pb="m"
        justifyContent="space-between"
        borderBottomColor="neutral100"
        borderBottomWidth={1}>
        <Text color="neutral700">Next Payment</Text>
        <Text pr="s">
          {purchasedSubscription?.expiresAt &&
            format(new Date(purchasedSubscription?.expiresAt), 'MMMM d yyyy')}
        </Text>
      </View>
      <View
        flexDirection="row"
        mx="m"
        pt="l"
        pb="m"
        justifyContent="space-between">
        <Text color="neutral700">Member Since</Text>
        <Text pr="s">
          {purchasedSubscription?.activatedAt
            ? format(
                new Date(purchasedSubscription?.activatedAt),
                'MMMM d yyyy',
              )
            : ''}
        </Text>
      </View>
    </View>
  );
};

export default SubscriptionInfoPanel;
