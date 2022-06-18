import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  AdaptyProduct,
  AdaptySubscriptionsInfo,
  adapty,
} from 'react-native-adapty';

const subscriptionsSkus = Platform.select({
  ios: ['com.premium.monthly', 'com.premium.annualy'],
});

async function getProducts() {
  const {products} = await adapty.paywalls.getPaywalls();

  //console.log(paywalls, products);

  return products;
}

const usePremium = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [availableSubscriptions, setAvailableSubscriptions] = useState<
    Array<AdaptyProduct>
  >([]);
  const [purchasedSubscription, setPurchasedSubscription] =
    useState<AdaptySubscriptionsInfo | null>();
  const [hasPremium, setHasPremium] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts().then(fetchedProducts =>
      setAvailableSubscriptions(fetchedProducts),
    );
    adapty.purchases
      .getInfo()
      .then(fetchedProfile => {
        if (
          Object.keys(fetchedProfile.subscriptions ?? {}).length > 0 &&
          subscriptionsSkus?.includes(
            Object.keys(fetchedProfile.subscriptions ?? {})[0],
          )
        ) {
          const subscription = Object.values(
            fetchedProfile.subscriptions ?? {},
          )[0];

          setPurchasedSubscription(subscription);

          if (subscription?.isActive) {
            setHasPremium(true);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    availableSubscriptions,
    purchasedSubscription,
    hasPremium,
    isLoading,

    setHasPremium,
  };
};

export default usePremium;
