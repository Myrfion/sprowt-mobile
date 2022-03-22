import {showMessage} from 'react-native-flash-message';
import {useMutation, useQuery} from 'react-query';
import {client} from './client';

export function useProfilePicture() {
  return useQuery('profilePicture', () => client.get('/profile/picture'));
}

type MutationActions = {
  onSuccess?: () => void;
  onError?: () => void;
};

export function useProfilePictureAdd(actions: MutationActions) {
  return useMutation(
    profilePicture => client.post('/profile/picture', {profilePicture}),
    {
      onSuccess: () => {
        if (actions.onSuccess) {
          actions.onSuccess();
        }

        showMessage({
          type: 'success',
          message: 'Profile picture was succesfully updated',
        });
      },
    },
  );
}
