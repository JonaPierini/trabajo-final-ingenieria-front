import {salesApi} from '../../config/api/selesApi';
import {ApiResponseDeleteClientById} from '../../infrastructure/client.response';

export const deleteClientById = async (id: string) => {
  try {
    const response = await salesApi.delete<ApiResponseDeleteClientById>(
      `/deleteClient/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
