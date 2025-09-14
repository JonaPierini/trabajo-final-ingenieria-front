import {salesApi} from '../../config/api/selesApi';
import {ApiResponseDeleteBudgetById} from '../../infrastructure/budget.response';

export const deleteBudgetById = async (id: string) => {
  try {
    const response = await salesApi.delete<ApiResponseDeleteBudgetById>(
      `/deleteBudget/${id}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
