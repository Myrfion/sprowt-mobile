import {useNavigation} from '@react-navigation/native';
import usePremium from 'api/usePremium';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  adapty,
  AdaptyProduct,
  AdaptyProfile,
  AdaptySubscriptionsInfo,
} from 'react-native-adapty';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

const styles = StyleSheet.create({
  paymentCard: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    backgroundColor: '#FBFBFB',
  },
  planCard: {
    borderColor: '#1A7056',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    width: 100 + '%',
  },
  cancelSubscription: {
    paddingVertical: 8,
  },
});

async function getProducts() {
  const {products} = await adapty.paywalls.getPaywalls();

  //console.log(paywalls, products);

  return products;
}

export const Subscription = () => {
  const navigation = useNavigation();

  const [plan, setPlan] = useState(0); // 0 - none selected, 1 - yearly, 2 - monthly
  const [profileSubscriptions, setProfileSubscriptions] =
    useState<
      {[vendorProductId: string]: AdaptySubscriptionsInfo} | undefined
    >();

  const [products, setProducts] = useState<Array<AdaptyProduct>>([]);

  const {hasPremium, purchasedSubscription} = usePremium();

  useEffect(() => {
    getProducts().then(fetchedProducts => setProducts(fetchedProducts));
    (async () => {
      const fetchedProfile = await adapty.purchases.getInfo();

      setProfileSubscriptions(fetchedProfile.subscriptions);
    })();
  }, []);

  const onPurchase = () => {
    adapty.purchases
      .makePurchase(products[plan - 1])
      .then(value => {
        console.log(value);
        showSuccessMessage('Subscription upgraded!');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
        showErrorMessage('It has been an error');
      });
  };
  console.log('plan: ', plan);
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
              subscriptions={products}
            />
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
              price={products.length > 0 ? products[0].localizedPrice : ''}
              rootStyles={{
                marginBottom: 26,
                borderColor: '#1A7056',
                borderStyle: 'dashed',
              }}
              period="year"
              active={plan === 1}
              onPress={() => setPlan(1)}
            />
            <PlanCard
              title="GROW"
              price={products.length > 0 ? products[1].localizedPrice : ''}
              period="month"
              rootStyles={{borderColor: BaseTheme.colors.neutral100}}
              active={plan === 2}
              onPress={() => setPlan(2)}
            />
            <Text color="neutral400" mt="xl" textAlign="center">
              Cancel anytime. Tax additional
            </Text>
            <Button
              label="Purchase Plan"
              onPress={onPurchase}
              disabled={plan === 0}
            />
            <TouchableOpacity
              onPress={() => console.log('cancel subscription')}
              style={styles.cancelSubscription}>
              <Text color="red" fontWeight="bold" textAlign={'center'}>
                Cancel Subscription{' '}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};
