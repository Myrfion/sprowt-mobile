import {useMutation, useQuery, useQueryClient} from 'react-query';
import {IFeedback} from '../../types';
import {client} from './client';

export const createFeedback = (feedback: IFeedback) => {
  return client.post('/feedbacks', feedback);
};

export const useFeedbackMutation = () => {
  return useMutation(createFeedback, {
    onError(error) {
      console.log('Error feedback mutation: ', error);
    },
    onSuccess() {
      console.log('feedback mutation');
    },
  });
};
