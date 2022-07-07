import axios from 'axios';

import {showErrorMessage} from 'ui';

//import {API_URL} from '@env';

export const client = axios.create({
  /*baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000/api'
      : 'http://localhost:3000/api',*/
  baseURL: 'https://sprowt.vercel.app/api',
});

client.interceptors.response.use(
  response => response,
  error => {
    // whatever you want to do with the error
    Object.keys(error);
    showErrorMessage(error.message);
    //navigationWithRef('Home');
    if (error?.errorInfo?.code === 'auth/id-token-expired') {
      console.log('token expired');
    }

    throw error;
  },
);
