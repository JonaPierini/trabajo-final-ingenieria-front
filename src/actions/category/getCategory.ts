import {salesApi} from '../../config/api/selesApi';
import {ApiResponseCategory} from '../../infrastructure/category.response';

export const getCategory = async () => {
  try {
    const response = await salesApi.get<ApiResponseCategory>('/allCategory');
    return response.data;
  } catch (error) {
    return null;
  }
};
