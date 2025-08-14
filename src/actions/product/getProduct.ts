import {salesApi} from '../../config/api/selesApi';
import {ApiResponseProduct} from '../../infrastructure/product.response';
import {ApiResponseUser} from '../../infrastructure/user.response';

export const getProduct = async () => {
  try {
    const response = await salesApi.get<ApiResponseProduct>('/allProduct');
    return response.data;
  } catch (error) {
    return null;
  }
};
