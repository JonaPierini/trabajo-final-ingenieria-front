import {create} from 'zustand';
import {authLogin} from '../../actions/auth/auth';
import {StorageAdapter} from '../../config/adapter/storage-adapter';
import {User} from '../../infrastructure/user';

type State = {
  status: string;
  token?: string;
  user?: User;
};

type Action = {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const initialState: State = {
  status: 'unAuthorized',
  token: undefined,
  user: undefined,
};

export const useAuthStore = create<State & Action>()(set => ({
  ...initialState,
  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);

    if (response) {
      await StorageAdapter.setItem('token', response.token);
      set({
        status: 'authorized',
        token: response.token,
        user: response.usuario,
      });
      return true;
    } else {
      set(initialState);
      return false;
    }
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set(initialState);
  },
}));
