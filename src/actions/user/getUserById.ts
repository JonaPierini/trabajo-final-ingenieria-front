import {salesApi} from '../../config/api/selesApi';
import {ApiResponseUserById} from '../../infrastructure/user.response';

export const getUserById = async (id: string) => {
  try {
    const response = await salesApi.get<ApiResponseUserById>(`userById/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
