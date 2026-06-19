export interface Ingredient {
  _id: string;
  name: string;
  desc: string;
  img: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface Recipes {
  _id: string;
  title: string;
  category: string;
  owner: string;
  area: string;
  instructions: string;
  description: string;
  thumb: string;
  time: string;
  ingredients: Ingredient[];
  createdAt: string;
  updatedAt: string;
}

export interface FilterParams {
  keyword: string;
  category?: string;
  ingredient?: string;
}
