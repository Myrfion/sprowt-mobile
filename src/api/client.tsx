import axios from 'axios';
import { Platform } from 'react-native';

//import {API_URL} from '@env';

export const client = axios.create({
 // baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api'
  baseURL: 'https://sprowt.vercel.app/api'
});
