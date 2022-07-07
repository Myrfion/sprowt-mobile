import usePremium from 'api/usePremium';
import {usePremiumStore} from 'core/Premium';
import React, {useState} from 'react';
import {Platform, SafeAreaView, Linking} from 'react-native';

import {BaseTheme, Button, Text, View} from 'ui';
import PlanCard from 'ui/Home/PlanCard';
import ProfileHeader from 'ui/Profile/ProfileHeader';
import {ScrollView} from 'ui/ScrollView';
import SubscriptionInfoPanel from 'ui/Subscription/SubscriptionInfoPanel';

const cancelIntructionLink = Platform.select({
  ios: 'https://apple.co/2Th4vqI',
  android: 'https://support.google.com/googleplay/workflow/9827184',
});

export const Subscription = () => {
  const [plan, setPlan] = useState(0); // 0 - none selected, 1 - yearly, 2 - monthly
  const {purchasedSubscription, availableSubscriptions, makePurchase} =
    usePremium();

  const {hasPremium} = usePremiumStore();

  const onPurchase = () => {
    makePurchase(availableSubscriptions[plan - 1]);
  };

  return (
    <View flex={1} pb="xl">
      <SafeAreaView>
        <ProfileHeader title="Subscription" />
      </SafeAreaView>
      <ScrollView>
        {hasPremium ? (
          <>
            <Text
              color="neutral800"
              fontWeight="bold"
              mb="s"
              mt="s"
              fontSize={16}>
              Your Plan
            </Text>
            <SubscriptionInfoPanel
              purchasedSubscription={purchasedSubscription}
              subscriptions={availableSubscriptions}
            />
            <Text textAlign={'center'} color="grey1" mt="m">
              If you would like to update or cancel your subscription, please do
              so{' '}
              <Text
                fontWeight="bold"
                onPress={() => Linking.openURL(cancelIntructionLink as string)}>
                here.
              </Text>
              We are unable to adjust this on your behalf.
            </Text>
          </>
        ) : (
          <>
            <Text
              color="neutral800"
              fontWeight="bold"
              mb="s"
              mt="l"
              fontSize={16}>
              Content Subscription
            </Text>
            <PlanCard
              title="GROW 🌱"
              price={
                availableSubscriptions.length > 0
                  ? availableSubscriptions[0].localizedPrice
                  : ''
              }
              rootStyles={{
                marginBottom: 26,
                borderColor: '#1A7056',
                borderStyle: 'dashed',
              }}
              period="year"
              active={plan === 1}
              onPress={() => setPlan(1)}
              crossedPrice={
                availableSubscriptions.length > 0
                  ? availableSubscriptions[1].currencySymbol +
                    availableSubscriptions[1].price * 12
                  : ''
              }
              features={[
                'Access all premium content',
                'New content added weekly',
                'Learn emotional intelligence for a happier, healthier life',
              ]}
            />
            <PlanCard
              title="GROW"
              price={
                availableSubscriptions.length > 0
                  ? availableSubscriptions[1].localizedPrice
                  : ''
              }
              period="month"
              rootStyles={{borderColor: BaseTheme.colors.neutral100}}
              active={plan === 2}
              onPress={() => setPlan(2)}
              features={[
                'Access all premium content',
                'New content added weekly',
                'Learn emotional intelligence for a happier, healthier life',
              ]}
            />

            <Button
              label="Purchase"
              onPress={onPurchase}
              disabled={plan === 0}
            />
            <Text color="neutral400" textAlign="center">
              Cancel anytime. Tax additional
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
};
