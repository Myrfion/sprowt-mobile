import create from 'zustand';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {getToken} from './utils';
import {SingInFormData} from 'screens';
import {client} from 'api/client';
import {showErrorMessage} from 'ui';
import {useProfileCreate} from 'api/useProfile';

type Status = 'success' | 'loading' | 'error' | 'idle';

interface AuthState {
  token: string | null | undefined;
  user: FirebaseAuthTypes.User | null;
  loginErrors: {
    login: string | null;
    password: string | null;
  };
  resetPassowordErrors: {
    email: string | null;
  };
  resetPasswordStatus: Status;
  signIn: (user: SingInFormData) => void;
  signOut: () => void;
  signUp: (newUser, onCreateHandler: any) => void;
  hydrate: () => void;
  getUser: () => void;
  resetPassword: (email: string) => void;
  updateUser: () => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  loginErrors: {
    password: null,
    login: null,
  },
  resetPassowordErrors: {
    email: null,
  },
  resetPasswordStatus: 'idle',
  signUp: async (newUser, onCreateHandler) => {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password,
      );

      await user.updateProfile({
        displayName: `${newUser.firstName} ${newUser.lastName}`,
      });

      await user.sendEmailVerification();

      set({user: auth().currentUser});

      onCreateHandler({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    } catch (error: any) {
      showErrorMessage(error.message);
    }
  },
  updateUser: () => {
    const user = auth().currentUser;

    set({user});
  },
  getUser: () => {
    return auth().currentUser;
  },
  signIn: async (user: SingInFormData) => {
    try {
      await auth().signInWithEmailAndPassword(user.email, user.password);
    } catch (error: any) {
      console.log(error);
      showErrorMessage(error.message);
      if (error.code === 'auth/wrong-password') {
        set({loginErrors: {password: 'Wrong password', login: null}});
      }
    }
  },
  signOut: async () => {
    await auth().signOut();
    set({token: null, user: null});
  },
  resetPassword: async email => {
    try {
      set({
        resetPasswordStatus: 'loading',
      });
      await auth().sendPasswordResetEmail(email);

      set({
        resetPasswordStatus: 'success',
      });
    } catch (error: any) {
      set({
        resetPasswordStatus: 'error',
        resetPassowordErrors: {
          email: error.code,
        },
      });
    }
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      console.log({userToken});
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const signOut = () => useAuth.getState().signOut();
export const hydrateAuth = () => useAuth.getState().hydrate();

auth().onUserChanged(async user => {
  console.log('auth state changed');
  try {
    if (user) {
      const token = await user.getIdToken();

      useAuth.setState(prev => ({...prev, token, user}));
      client.interceptors.request.use(config => {
        return {
          ...config,
          headers: {...config.headers, Authorization: `Bearer ${token}`},
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
});

auth().onAuthStateChanged(async user => {
  console.log('auth state changed');
  try {
    if (user) {
      const token = await user.getIdToken();

      useAuth.setState(prev => ({...prev, token, user}));
      client.interceptors.request.use(config => {
        return {
          ...config,
          headers: {...config.headers, Authorization: `Bearer ${token}`},
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
});
