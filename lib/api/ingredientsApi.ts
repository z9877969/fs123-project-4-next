import { Ingredient } from '@/types/ingredient';
import { nextServer } from './api';

export async function getIngredients(): Promise<Ingredient[]> {
  const { data } = await nextServer.get<Ingredient[]>('/ingredients');
  console.log('Ingredients: ', data);

  return data;
}
