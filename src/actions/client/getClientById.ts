import {salesApi} from '../../config/api/selesApi';
import {ApiResponseClientById} from '../../infrastructure/client.response';

export const getClientById = async (id: string) => {
  try {
    const response = await salesApi.get<ApiResponseClientById>(
      `clientById/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
