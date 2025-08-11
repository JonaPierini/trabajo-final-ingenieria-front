export interface User {
  _id: string;
  name: string;
}
export interface Category {
  _id?: string;
  name: string;
  user: User;
  state: boolean;
}

// GET /categories
export interface ApiResponseCategory {
  msg: string;
  allCategory: Category[];
  total: number;
}

// GET /categoryById/:id
export interface ApiResponseCategoryById {
  msg: string;
  categoryById: Category;
}

// POST /category
export interface ApiResponseNewCategory {
  msg: string;
  newCategory: Category;
}

// DELETE /category/:id
export interface ApiResponseDeleteCategoryById {
  msg: string;
  category: Category;
}

// PUT /category/:id
export interface ApiResponseUpdateCategoryById {
  category: Category;
}

// Lo que ENVIÁS al crear
export type CategoryCreatePayload = {
  name: string;
  state: boolean;
};
