export enum MediaTypes {
  video = 'video',
  podcast = 'podcast',
  meditation = 'meditation',
}

export interface IUser {
  firstName: string;
  lastName: string;
  birthday: Date;
  trialExpiration: Date;
  profilePicture: Date;
  favourites: Array<string>;
}

export interface IPost {
  title: string;
  description: string;
  tags: Array<ITag>;
  mediaPath: string;
  mediaType: MediaTypes;
  thumbnail: string;
  id?: string;
  isPremium: boolean;
  feedbacksNum?: number;
  raiting?: number;
  created?: string;
  duration?: number;
}

export interface ITag {
  id?: string;
  name: string;
}

export interface IFeedback {
  id?: string;
  raiting: number;
  text?: string;
  userId: string | undefined;
  postId: string | undefined;
}

export interface IInvite {
  id?: string;
  created?: string;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
}
