export interface Ingredient {
  _id: string;
  name: string;
  desc: string;
  img: string;
}

export type IngredientOption = Pick<Ingredient, '_id' | 'name'>;

export interface RecipeIngredient {
  id: Ingredient;
  measure: string;
}
