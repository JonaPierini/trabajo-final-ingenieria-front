import {Client} from './client.response';
import {Product} from './product.response';
import {User} from './user.response';

// Define el tipo para cada elemento del array 'product'
export interface ProductItem {
  productId: Product; // El producto como tal
  quantity: number; // La cantidad asociada
  _id?: string; // ID único del item (opcional si lo tienes)
}

// Interfaz Sale actualizada
export interface Sale {
  _id?: string;
  user: User;
  client: Client;
  product: ProductItem[]; // Ahora es un array de ProductItem
  state: boolean;
  total: number;
  createdAt?: string; // ISO date string
  __v?: number;
}

// Respuesta de la API sin cambios
export interface ApiResponseSale {
  msg: string;
  allSale: Sale[] | [];
}

// Lo que ENVIÁS al crear
// Un ítem dentro del array product
export type ProductSale = {
  productId: string;
  quantity: number;
};

// Payload para crear la venta
export type SaleCreatePayload = {
  client: string;
  product: ProductSale[]; // 👈 array,
  state: boolean;
};

export interface ApiResponseNewSale {
  msg: string;
  newSale: Sale;
}

// DELETE // saleById
export interface ApiResponseDeleteSaleById {
  msg: string;
  sale: Sale;
}

// GETBYID // saleById
export interface ApiResponseSaleById {
  msg: string;
  saleById: Sale;
}
