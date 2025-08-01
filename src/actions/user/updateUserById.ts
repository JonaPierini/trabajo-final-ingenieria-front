import {AxiosError} from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {
  ApiResponseUpdateUserById,
  User,
} from '../../infrastructure/user.response';

export const updateUserById = async (id: string, userData: Partial<User>) => {
  try {
    const response = await salesApi.put<ApiResponseUpdateUserById>(
      `putUser/${id}`,
      userData, // Aquí pasamos el cuerpo de la solicitud
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
        // Error personalizado como "Ya existe un usuario con ese email"
        throw new Error(msg);
      }
    } else {
      throw new Error('Error al actualizar el usuario');
    }
  }
};

export const updateSelfUserById = async (
  id: string,
  userData: Partial<User>,
) => {
  try {
    const response = await salesApi.patch<ApiResponseUpdateUserById>(
      `patchUser/${id}`,
      userData, // Aquí pasamos el cuerpo de la solicitud
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const {msg, errors} = error.response.data;

      if (errors) {
        // Errores con estructura tipo express-validator
        throw new Error(errors.map((err: any) => err.msg).join(', '));
      }

      if (msg) {
        // Error personalizado como "Ya existe un usuario con ese email"
        throw new Error(msg);
      }
    } else {
      throw new Error('Error al actualizar el usuario');
    }
  }
};
