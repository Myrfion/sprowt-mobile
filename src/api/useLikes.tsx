import {useMutation, useQuery, useQueryClient} from 'react-query';
import {client} from './client';

const getLikes = async () => {
  const response = await client.get('/likes');
  console.log(response.data);
  return response.data;
};

export function useLikes() {
  return useQuery('likes', getLikes);
}

const toggleTweet = (postId: string) => {
  return client.post('/likes', {postId});
};

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(toggleTweet, {
    onMutate: async postId => {
      await queryClient.cancelQueries('likes');

      const snapshotOfPrevLikes = queryClient.getQueriesData('likes');
      console.log('likes snapshot: ', snapshotOfPrevLikes[0][1]);
      const isLiked = snapshotOfPrevLikes[0][1].includes(postId);

      queryClient.setQueriesData('likes', prevLikes =>
        isLiked
          ? prevLikes.filter(like => {
              return like !== postId;
            })
          : [...prevLikes, postId],
      );

      return {
        snapshotOfPrevLikes,
      };
    },
    onError: error => {
      console.log('Error like: ', error);
    },
    onSuccess() {
      console.log('success');
      queryClient.invalidateQueries('likes');
    },
  });
};
