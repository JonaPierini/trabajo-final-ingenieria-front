import {API_URL_ANDROID, API_URL_IOS} from '@env';
import axios from 'axios';
import {StorageAdapter} from '../adapter/storage-adapter';
import {Platform} from 'react-native';

const API_URL = Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID;

const salesApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Con el interceptors no hace falta enviar el token en las peticiones que se necesiten
salesApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export {salesApi};
