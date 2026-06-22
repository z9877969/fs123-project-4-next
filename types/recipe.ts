import { Category } from './category';
import { RecipeIngredient } from './ingredient';

export interface Recipe {
  _id: string;
  title: string;
  category: Category;
  owner: string;
  area?: string;
  instructions: string;
  description: string;
  thumb?: string;
  time: number;
  calories: number;
  ingredients: RecipeIngredient[];
  instructions: string;
  image: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}
