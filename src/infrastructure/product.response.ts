export interface Product {
  _id?: string;
  name: string;
  state: boolean;
  value: number;
  stock: number;
  description: string;
  user: {
    _id: string;
    name: string;
  };
  category: {
    _id: string;
    name: string;
  };
  createdAt?: string; // ISO date string
  __v?: number;
}
