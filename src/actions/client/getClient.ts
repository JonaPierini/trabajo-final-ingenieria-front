import {salesApi} from '../../config/api/selesApi';
import {ApiResponseClient} from '../../infrastructure/client.response';

export const getClient = async () => {
  try {
    const response = await salesApi.get<ApiResponseClient>('/allClient');
    return response.data;
  } catch (error) {
    return null;
  }
};
