import {navigationWithRef} from 'navigation';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  AdaptyProduct,
  AdaptySubscriptionsInfo,
  adapty,
} from 'react-native-adapty';
import {showErrorMessage, showSuccessMessage} from 'ui';
import {usePremiumStore} from '../core/Premium';

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
  // const [hasPremium, setHasPremium] = useState(false);
  const {hasPremium, setPremium} = usePremiumStore();

  function makePurchase(product: AdaptyProduct) {
    adapty.purchases
      .makePurchase(product)
      .then(() => {
        showSuccessMessage('Subscription upgraded!');
        setPremium(true);
        navigationWithRef('Home', {hasPremium: true});
      })
      .catch(() => {
        showErrorMessage('It has been an error');
      });
  }

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
            setPremium(true);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setPremium]);

  return {
    availableSubscriptions,
    purchasedSubscription,
    hasPremium,
    isLoading,
    makePurchase,
  };
};

export default usePremium;
