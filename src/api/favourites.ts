import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {showSuccessMessage} from 'ui';
import {firebaseCollections} from './posts';

export function useLikes() {
  // initialize our default state
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = firebase.auth().currentUser;
      const unsubscribe = firestore()
        .collection(firebaseCollections.likes)
        .where('userId', '==', user?.uid)
        .onSnapshot(
          async snapshot => {
            const likesResult = snapshot.docs
              .filter(doc => doc.exists)
              .map(doc => doc.data())
              .map(item => item.postID);

            setLikes(likesResult);
          },
          err => setError(err.message),
          () => {
            setLoading(false);
          },
        );

      return () => unsubscribe();
    })();
  }, []);

  return {likes, loading, error};
}

export function useLikeMutation() {
  async function updateLike(postID: string) {
    const user = firebase.auth().currentUser;
    const likeRef = firestore().doc(`likes/${user?.uid}_${postID}`);

    const like = await likeRef.get();

    if (like.exists) {
      await likeRef.delete();
    } else {
      await likeRef.set({postID, userId: user?.uid});
      showSuccessMessage('Added to favourites');
    }
  }

  return {
    updateLike,
  };
}
