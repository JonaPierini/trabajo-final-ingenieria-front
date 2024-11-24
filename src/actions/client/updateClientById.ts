import {AxiosError} from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {
  ApiResponseUpdateClientById,
  Client,
} from '../../infrastructure/client.response';

export const updateClientById = async (
  id: string,
  clientData: Partial<Client>,
) => {
  try {
    const response = await salesApi.put<ApiResponseUpdateClientById>(
      `putClient/${id}`,
      clientData, // Aquí pasamos el cuerpo de la solicitud
    );
    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response &&
      error.response.data.errors
    ) {
      throw new Error(
        error.response.data.errors.map((err: any) => err.msg).join(', '),
      );
    } else {
      throw new Error('Error al actualizar el cliente');
    }
  }
};
