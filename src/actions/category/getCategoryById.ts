import {salesApi} from '../../config/api/selesApi';
import {ApiResponseCategoryById} from '../../infrastructure/category.response';

export const getCategoryById = async (id: string) => {
  try {
    const response = await salesApi.get<ApiResponseCategoryById>(
      `/categoryById/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
