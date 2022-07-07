import firestore from '@react-native-firebase/firestore';
import {compareAsc} from 'date-fns';
import {useEffect, useState} from 'react';

import {IPost, ITag} from '../../types';

export const firebaseCollections = {
  posts: 'posts',
  profiles: 'profiles',
  likes: 'likes',
  feedbacks: 'feedbacks',
  tags: 'tags',
};

function convertFirebasePostToPost(post: any): IPost {
  return {
    ...post.data(),
    id: post.id,
  };
}

function doesTagsIncludeTag(tags: Array<ITag>, tagName: string) {
  return tags.find((tag: ITag) => tag.name.includes(tagName));
}

export const filterPosts = (posts: Array<IPost>, queryText: string) => {
  return posts.filter((post: IPost) => {
    return (
      post.title.includes(queryText as string) ||
      post.description.includes(queryText as string) ||
      doesTagsIncludeTag(post.tags, queryText as string)
    );
  });
};

export const sortPostsByQuery = (posts: Array<IPost>, queryText: string) => {
  return posts.sort((a: IPost, b: IPost) => {
    if (
      a.title.includes(queryText as string) &&
      !b.title.includes(queryText as string)
    ) {
      return -1;
    } else if (
      !a.title.includes(queryText as string) &&
      b.title.includes(queryText as string)
    ) {
      return 1;
    }

    return 0;
  });
};

export const sortPostsByDate = (posts: Array<IPost>) => {
  return posts.sort((a: IPost, b: IPost) => {
    return compareAsc(
      new Date(b.created as string),
      new Date(a.created as string),
    );
  });
};

/*

Places where we show posts: 
Discover posts:
Posts by tag (so bascially the same as discover)

Explore posts: 
If no tag, show most recent, otherwise, show by tag

Search screen:
Most relative posts (so filtered and sorted)
*/

export async function getPostsList(query = '') {
  let postsRef = firestore().collection(firebaseCollections.posts);

  const result = await postsRef.get();

  let posts: Array<IPost> = [];

  result.forEach(document => {
    posts.push(convertFirebasePostToPost(document));
  });

  if (query) {
    posts = filterPosts(posts, query);
    posts = sortPostsByQuery(posts, query);
  } else {
    posts = sortPostsByDate(posts);
  }

  return posts;
}

export async function getPostsById(postID: string) {
  const doc = await firestore()
    .collection(firebaseCollections.posts)
    .doc(postID)
    .get();

  return doc.data() as IPost;
}

export function usePosts(query = '') {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Array<IPost>>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection(firebaseCollections.posts)
      .onSnapshot(
        snapshot => {
          let postsResult = snapshot.docs.map(document =>
            convertFirebasePostToPost(document),
          );

          /*if (query) {
            postsResult = filterPosts(posts, query);
            postsResult = sortPostsByQuery(posts, query);
          } else {
            postsResult = sortPostsByDate(posts);
          }*/
          console.log('postsResult: ', postsResult);
          setPosts(postsResult);
          setLoading(false);
        },
        err => {
          setError(err);
        },
        () => {
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [query]);

  return {
    error,
    loading,
    posts,
  };
}
