import axios from 'axios';

import {API_URL} from '@env';

export const client = axios.create({
  baseURL: `http://localhost:3000/api`,
});
