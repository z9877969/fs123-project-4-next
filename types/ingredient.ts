interface IngredientDetails {
  id: string;
  name: string;
  desc: string;
  img: string;
}

export interface RecipeIngredient {
  id: IngredientDetails; 
  measure: string;
}