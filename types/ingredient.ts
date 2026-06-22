interface IngredientDetails {
  id: string;
  name: string;
  desc: string;
  img: string;
}

export type IngredientOption = Pick<IngredientDetails, 'id' | 'name'>;

export interface RecipeIngredient {
  id: IngredientDetails; 
  measure: string;
}