import {User} from './user.response';

export interface AuthResponse {
  msg: string;
  token: string;
  usuario: User;
}
