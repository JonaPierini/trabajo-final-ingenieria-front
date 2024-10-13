import {User} from './user';

export interface AuthResponse {
  msg: string;
  token: string;
  usuario: User;
}
