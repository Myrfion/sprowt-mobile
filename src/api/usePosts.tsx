import {useQuery} from 'react-query';
import {IPost} from '../../types';
import {client} from './client';

const getPosts = async () => {
  const {data} = await client.get('/posts');
  return data;
};

export function usePosts() {
  return useQuery<IPost[]>('posts', getPosts);
}
