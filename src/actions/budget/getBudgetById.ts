import {salesApi} from '../../config/api/selesApi';
import {ApiResponseBudgetById} from '../../infrastructure/budget.response';

export const getBudgetById = async (id: string) => {
  try {
    const response = await salesApi.get<ApiResponseBudgetById>(
      `/budgetById/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
