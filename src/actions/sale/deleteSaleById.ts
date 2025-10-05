import {salesApi} from '../../config/api/selesApi';
import {ApiResponseDeleteSaleById} from '../../infrastructure/sale.response';

export const deleteSaleById = async (id: string) => {
  try {
    const response = await salesApi.delete<ApiResponseDeleteSaleById>(
      `/deleteSale/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
