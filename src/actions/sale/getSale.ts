import {salesApi} from '../../config/api/selesApi';
import {ApiResponseSale} from '../../infrastructure/sale.response';

export const getSale = async () => {
  try {
    const response = await salesApi.get<ApiResponseSale>('/allSale');
    return response.data;
  } catch (error) {
    return null;
  }
};
