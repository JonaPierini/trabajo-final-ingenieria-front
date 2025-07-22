import {AxiosError} from 'axios';
import {salesApi} from '../../config/api/selesApi';
import {ApiResponseNewUser, User} from '../../infrastructure/user.response';

export const newUser = async (usertData: User) => {
  try {
    const response = await salesApi.post<ApiResponseNewUser>(
      `newUser`,
      usertData, // Aquí pasamos el cuerpo de la solicitud
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
      throw new Error(`Error al crear el usuario, ${error}`);
    }
  }
};
