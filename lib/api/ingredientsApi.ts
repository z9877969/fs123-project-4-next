import { Ingredient } from '@/types/recipes';
import { api } from './api';

export async function getIngredients(): Promise<Ingredient[]> {
  const { data } = await api.get<Ingredient[]>('/ingredients');
  console.log('Ingredients: ', data);

  return data;
}
