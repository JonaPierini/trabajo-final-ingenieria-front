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
    console.log('pepepepeppe');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
