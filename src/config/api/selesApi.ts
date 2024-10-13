import {API_URL} from '@env';
import axios from 'axios';
import {StorageAdapter} from '../adapter/storage-adapter';

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
