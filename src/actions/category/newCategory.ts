import axios from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {
  ApiResponseNewCategory,
  Category,
  CategoryCreatePayload,
} from '../../infrastructure/category.response';

export const newCategory = async (category: CategoryCreatePayload) => {
  try {
    const res = await salesApi.post<ApiResponseNewCategory>(
      `/newCategory/`,
      category,
    );
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err;
    }
    throw err;
  }
};
