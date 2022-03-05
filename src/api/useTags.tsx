import {useQuery} from 'react-query';
import {ITag} from '../../types';
import {client} from './client';

const getTags = async () => {
  try {
    const response = await client.get('/tags');

    return response.data;
  } catch (error) {
    console.log('Error: ', error);
  }
};

export function useTags() {
  return useQuery<ITag[]>('tags', getTags);
}
