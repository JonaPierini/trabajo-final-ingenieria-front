import {salesApi} from '../../config/api/selesApi';
import {ApiResponseDeleteProductById} from '../../infrastructure/product.response';

export const deleteProductById = async (id: string) => {
  try {
    const response = await salesApi.delete<ApiResponseDeleteProductById>(
      `/deleteProduct/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
