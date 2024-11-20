export interface Client {
  _id: string;
  name: string;
  email: string;
  address: string;
  location: string;
  provinces: string;
  createdAt: string; // ISO date string
  __v: number;
}

export interface ApiResponseClient {
  msg: string;
  allClient: Client[] | [];
}
