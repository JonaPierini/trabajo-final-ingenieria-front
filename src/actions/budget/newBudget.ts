import axios, {AxiosError} from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {
  ApiResponseNewBudget,
  BudgetCreatePayload,
} from '../../infrastructure/budget.response';

export const newBudget = async (budget: BudgetCreatePayload) => {
  try {
    const res = await salesApi.post<ApiResponseNewBudget>(
      `/newBudget/`,
      budget,
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const data = error.response.data as any;

      if (data.errors?.length) {
        // Caso 1: array de errores
        throw new Error(data.errors.map((e: any) => e.msg).join(', '));
      }

      if (data.msg) {
        // Caso 2: un solo mensaje con "msg"
        throw new Error(data.msg);
      }

      if (data.message) {
        // Caso 3: un solo mensaje con "message"
        throw new Error(data.message);
      }
    }

    // Si no vino nada reconocible
    throw new Error('Error al crear el producto');
  }
};
