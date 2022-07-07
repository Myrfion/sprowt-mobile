import firestore, {firebase} from '@react-native-firebase/firestore';
import {useState} from 'react';
import {showSuccessMessage} from 'ui';
import {IFeedback} from '../../types/index';
import {firebaseCollections} from './posts';

export function useFeedbackMutation() {
  const [loading, setLoading] = useState(false);

  async function addFeedback(newFeedback: IFeedback) {
    setLoading(true);
    const user = firebase.auth().currentUser;
    const feedbackRef = firestore().collection(firebaseCollections.feedbacks);

    await feedbackRef.add({
      ...newFeedback,
      created: new Date().toISOString(),
      userId: user?.uid,
    });
    setLoading(false);
    showSuccessMessage('We appreciate your feedback :)');
  }

  return {addFeedback, loading};
}
