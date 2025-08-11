import {salesApi} from '../../config/api/selesApi';
import {ApiResponseDeleteCategoryById} from '../../infrastructure/category.response';

export const deleteCategoryById = async (id: string) => {
  try {
    const response = await salesApi.delete<ApiResponseDeleteCategoryById>(
      `/deleteCategory/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
