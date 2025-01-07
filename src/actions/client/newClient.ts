import {AxiosError} from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {
  ApiResponseNewClient,
  Client,
} from '../../infrastructure/client.response';

export const newClient = async (clientData: Client) => {
  try {
    const response = await salesApi.post<ApiResponseNewClient>(
      `newClient`,
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
      throw new Error(`Error al crear el cliente, ${error}`);
    }
  }
};
