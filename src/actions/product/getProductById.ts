import {salesApi} from '../../config/api/selesApi';
import {ApiResponseProductById} from '../../infrastructure/product.response';

export const getProductById = async (id: string) => {
  try {
    const response = await salesApi.get<ApiResponseProductById>(
      `productById/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
