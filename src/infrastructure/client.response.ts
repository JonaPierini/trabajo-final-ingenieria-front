export interface Client {
  _id?: string;
  name: string;
  email: string;
  address: string;
  location: string;
  provinces: string;
  createdAt?: string; // ISO date string
  __v?: number;
}

export interface ApiResponseClient {
  msg: string;
  allClient: Client[] | [];
}

export interface ApiResponseClientById {
  msg: string;
  clientById: Client;
}

export interface ApiResponseDeleteClientById {
  msg: string;
  client: Client;
}

export interface ApiResponseUpdateClientById {
  msg: string;
  client: Client;
}
