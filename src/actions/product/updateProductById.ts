import {AxiosError} from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {
  ApiResponseUpdateProductById,
  Product,
} from '../../infrastructure/product.response';

export const updateProductById = async (
  id: string,
  category: Partial<Product>,
) => {
  try {
    const response = await salesApi.put<ApiResponseUpdateProductById>(
      `putProduct/${id}`,
      category, // Aquí pasamos el cuerpo de la solicitud
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const {msg, errors} = error.response.data;

      if (errors) {
        // Errores con estructura tipo express-validator
        throw new Error(errors.map((err: any) => err.msg).join(', '));
      }

      if (msg) {
        // Error personalizado
        throw new Error(msg);
      }
    } else {
      throw new Error('Error al actualizar la categoria');
    }
  }
};
