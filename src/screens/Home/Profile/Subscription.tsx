import {useNavigation} from '@react-navigation/native';
import usePremium from 'api/usePremium';
import React, {useState} from 'react';
import {Platform, SafeAreaView, Linking} from 'react-native';
import {adapty} from 'react-native-adapty';

import {
  BaseTheme,
  Button,
  showErrorMessage,
  showSuccessMessage,
  Text,
  View,
} from 'ui';
import PlanCard from 'ui/Home/PlanCard';
import ProfileHeader from 'ui/Profile/ProfileHeader';
import {ScrollView} from 'ui/ScrollView';
import SubscriptionInfoPanel from 'ui/Subscription/SubscriptionInfoPanel';

const cancelIntructionLink = Platform.select({
  ios: 'https://apple.co/2Th4vqI',
  android: 'https://support.google.com/googleplay/workflow/9827184',
});

export const Subscription = () => {
  const navigation = useNavigation();

  const [plan, setPlan] = useState(0); // 0 - none selected, 1 - yearly, 2 - monthly
  const {
    hasPremium,
    purchasedSubscription,
    availableSubscriptions,
    setHasPremium,
  } = usePremium();

  const onPurchase = () => {
    adapty.purchases
      .makePurchase(availableSubscriptions[plan - 1])
      .then(value => {
        console.log('purchase message', value);
        showSuccessMessage('Subscription upgraded!');

        console.log('premium set');
        setHasPremium(true);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        showErrorMessage('It has been an error');
      });
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
