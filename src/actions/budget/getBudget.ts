import {salesApi} from '../../config/api/selesApi';
import {ApiResponseBudget} from '../../infrastructure/budget.response';

export const getBudget = async () => {
  try {
    const response = await salesApi.get<ApiResponseBudget>('/allBudget');
    return response.data;
  } catch (error) {
    return null;
  }
};
