import {salesApi} from '../../config/api/selesApi';
import {ApiResponseDeleteUserById} from '../../infrastructure/user.response';

export const deleteUserById = async (id: string) => {
  try {
    const response = await salesApi.delete<ApiResponseDeleteUserById>(
      `/deleteUser/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
