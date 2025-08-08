export interface User {
  _id: string;
  name: string;
}
export interface Category {
  _id: string;
  name: string;
  user: User;
  state: boolean;
}

export interface ApiResponseCategory {
  msg: string;
  allCategory: Category[];
  total: number;
}

export interface ApiResponseCategoryById {
  msg: string;
  categoryById: Category;
}
