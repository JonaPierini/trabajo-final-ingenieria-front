import {Client} from './client.response';
import {Product} from './product.response';
import {User} from './user.response';

// Define el tipo para cada elemento del array 'product'
export interface ProductItem {
  productId: Product; // El producto como tal
  quantity: number; // La cantidad asociada
  _id?: string; // ID único del item (opcional si lo tienes)
}

// Interfaz Budget actualizada
export interface Budget {
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
export interface ApiResponseBudget {
  msg: string;
  allBudget: Budget[] | [];
}

// Lo que ENVIÁS al crear
// Un ítem dentro del array product
export type ProductBudget = {
  productId: string;
  quantity: number;
};

// Payload para crear presupuesto
export type BudgetCreatePayload = {
  client: string;
  product: ProductBudget[]; // 👈 array,
  state: boolean;
};

export interface ApiResponseNewBudget {
  msg: string;
  newBudget: Budget;
}

// DELETE // budgetById
export interface ApiResponseDeleteBudgetById {
  msg: string;
  budget: Budget;
}

// GETBYID // budgetById
export interface ApiResponseBudgetById {
  msg: string;
  budgetById: Budget;
}
