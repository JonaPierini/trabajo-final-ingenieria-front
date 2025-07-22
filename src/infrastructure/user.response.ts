export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  rol: string;
  state?: boolean;
  createdAt?: string; // ISO date string
  __v?: number;
}

export interface ApiResponseUser {
  msg: string;
  allUser: User[] | [];
}

export interface ApiResponseUserById {
  msg: string;
  userById: User;
}

export interface ApiResponseDeleteUserById {
  msg: string;
  user: User;
}

export interface ApiResponseUpdateUserById {
  msg: string;
  user: User;
}

export interface ApiResponseNewUser {
  msg: string;
  user: User;
}
