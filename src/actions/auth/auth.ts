import {salesApi} from '../../config/api/selesApi';

export const authLogin = async (email: string, password: string) => {
  email = email.toLowerCase();

  try {
    const response = await salesApi.post('/login', {
      email,
      password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
