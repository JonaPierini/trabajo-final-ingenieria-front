import {salesApi} from '../../config/api/selesApi';
import {ApiResponseSaleById} from '../../infrastructure/sale.response';

export const getSaleById = async (id: string) => {
  try {
    const response = await salesApi.get<ApiResponseSaleById>(`/saleById/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};
