import type { IngredientOption } from './ingredient';

export interface RecipeIngredientItem {
  ingredientId: string;
  name: string;
  amount: string;
}

export interface AddRecipeFormValues {
  recipeTitle: string;
  recipeDescription: string;
  cookingTime: number;
  calories: number;
  category: string;
  photo: File | null;
  selectedIngredientId: string;
  amount: string;
  ingredientsList: RecipeIngredientItem[];
  instructions: string;
}

export interface AddRecipeFormProps {
  ingredients: IngredientOption[];
}

export interface DynamicIngredientsProps {
  ingredients: IngredientOption[];
}