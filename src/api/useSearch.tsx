import {useQuery} from 'react-query';
import {IPost} from '../../types';
import {client} from './client';

const getSearch = async ({queryKey}: any) => {
  const [_key, {text}] = queryKey;

  if (text.length > 0) {
    const {data} = await client.get('/search', {
      params: {
        text,
      },
    });

    return data;
  }

  return [];
};

export function useSearch({text}: {text: string}) {
  return useQuery<IPost[]>(['search', {text}], getSearch);
}
