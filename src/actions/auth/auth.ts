import {salesApi} from '../../config/api/selesApi';
import {AuthResponse} from '../../infrastructure/auth.response';

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const response = await salesApi.post<AuthResponse>('/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
