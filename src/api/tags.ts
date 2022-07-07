import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {ITag} from '../../types/index';
import {firebaseCollections} from './posts';

export function useTags() {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Array<ITag>>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection(firebaseCollections.tags)
      .onSnapshot(
        snapshot => {
          let tagsResult = snapshot.docs.map(tag => tag.data() as ITag);

          setTags(tagsResult);
        },
        err => {
          setError(err.message);
        },
        () => {
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);
  return {tags, error, loading};
}
