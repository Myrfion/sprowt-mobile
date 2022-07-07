import {useMutation, useQuery} from 'react-query';
import {ProfileData} from '../screens/Home/Profile/Account';
import {client} from './client';

type MutationActions = {
  onSuccess?: any;
  onError?: any;
};

const changeProfile = (profile: ProfileData) => client.put('/profile', profile);

const creatProfile = ({
  firstName,
  lastName,
  email,
}: {
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  email: string | undefined | null;
}) => client.post('/profile', {firstName, lastName, email});

const getProfile = () => client.get('/profile');

export const useProfileCreate = (actions: MutationActions) =>
  useMutation(creatProfile, {
    onSuccess: actions.onSuccess,
    onError: actions.onError,
  });

export const useProfileMutation = (actions: MutationActions) =>
  useMutation(changeProfile, {
    onSuccess: actions.onSuccess,
    onError: actions.onError,
  });

export const useProfile = () => useQuery('profile', getProfile);
