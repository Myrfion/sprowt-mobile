import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';

type Keys = 'hadOnboarding';

interface IStorage {
  hadOnboarding: boolean;
  setValue: (key: Keys, value: string) => any;
}

function useAsyncStorage(): IStorage {
  const [hadOnboarding, setHadOnboarding] = useState<boolean>(false);

  async function setValue(key: Keys, value: string) {
    return AsyncStorage.setItem(key, value);
  }

  useEffect(() => {
    (async () => {
      setHadOnboarding((await AsyncStorage.getItem('hadOnboarding')) === 'yes');
    })();
  }, []);

  return {
    hadOnboarding,
    setValue,
  };
}

export default useAsyncStorage;
