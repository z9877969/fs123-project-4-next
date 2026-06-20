import { Category } from "./category";
import { RecipeIngredient } from "./ingredient";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: number;
  calories: number;
  category: Category;
  ingredients: RecipeIngredient[];
  instructions: string;
  image?: string;
  owner: string;
  createdAt: string; 
  updatedAt: string; 
}