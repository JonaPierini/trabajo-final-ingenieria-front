import {salesApi} from '../../config/api/selesApi';
import {ApiResponseUser} from '../../infrastructure/user.response';

export const getUser = async () => {
  try {
    const response = await salesApi.get<ApiResponseUser>('/allUsers');
    return response.data;
  } catch (error) {
    return null;
  }
};
