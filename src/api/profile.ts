import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {firebaseCollections} from './posts';
import {IProfile} from '../../types/index';
import {useEffect, useState} from 'react';

export type ProfileData = {
  firstName: string;
  lastName: string;
  birthDay: Date;
  profilePicture: string;
};

interface CreateProfileData {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
}

export async function getProfile(): Promise<IProfile> {
  const user = firebase.auth().currentUser;
  console.log('user: ', user);
  const profileRef = await firestore()
    .collection(firebaseCollections.profiles)
    .doc(user?.uid)
    .get();

  console.log('profileRef.data(): ', profileRef.data());

  return profileRef.data() as IProfile;
}

export function useProfile() {
  // initialize our default state
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<IProfile>();

  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.
  useEffect(() => {
    setLoading(true);
    const user = firebase.auth().currentUser;
    const unsubscribe = firebase
      .firestore()
      .collection(firebaseCollections.profiles)
      .doc(user?.uid)
      .onSnapshot(
        doc => {
          setProfile(doc.data() as IProfile);
        },
        err => {
          setError(err?.message);
        },
        () => {
          setLoading(false);
        },
      );

    // we unsubscribe from document changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, []);

  return {
    error,
    loading,
    profile,
  };
}

export function useProfileUpdate() {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  function updateProfile(updatedProfile: any) {
    console.log('updatedProfile: ', updatedProfile);
    setLoading(true);
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection(firebaseCollections.profiles)
      .doc(user?.uid)
      .update(updatedProfile)
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return {error, loading, updateProfile};
}

export function useProfileCreate() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function createProfile(profileData: CreateProfileData) {
    const {firstName, lastName, email} = profileData;
    setLoading(true);
    const user = firebase.auth().currentUser;
    const profileRef = firebase
      .firestore()
      .collection(firebaseCollections.profiles)
      .doc(user?.uid);

    profileRef.get().then(value => {
      if (!value.exists) {
        console.log('user?.uid: ', user?.uid);
        firebase
          .firestore()
          .collection(firebaseCollections.profiles)
          .doc(user?.uid)
          .set({firstName, lastName, email, joinDate: new Date()})
          .catch(err => {
            setError(err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
  }

  return {createProfile, error, loading};
}
