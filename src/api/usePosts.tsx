import {useQuery} from 'react-query';
import {IPost} from '../../types';
import {client} from './client';

type PostFilters = {
  tag?: string;
};

const getPosts = async ({queryKey}: any) => {
  const [_key, {tag}] = queryKey;

  console.log('tag: ', tag);

  const {data} = await client.get('/posts', {
    params: {
      tag,
    },
  });
  return data;
};

export function usePosts(filters: PostFilters) {
  return useQuery<IPost[]>(['posts', {tag: filters.tag}], getPosts);
}
