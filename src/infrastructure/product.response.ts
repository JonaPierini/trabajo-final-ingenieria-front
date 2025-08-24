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

// GET /product
export interface ApiResponseProduct {
  msg: string;
  total: number;
  allProduct: Product[] | [];
}

// Lo que ENVIÁS al crear
export type ProductCreatePayload = {
  name: string;
  state: boolean;
  value: number;
  stock: number;
  description: string;
  category: string;
};

export interface ApiResponseNewProduct {
  msg: string;
  product: Product;
}
