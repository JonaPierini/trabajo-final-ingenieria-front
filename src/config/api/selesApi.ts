import {API_URL} from '@env';
import axios from 'axios';

const salesApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {salesApi};
