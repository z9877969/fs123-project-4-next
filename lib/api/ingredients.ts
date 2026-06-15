import { nextServer } from './api';

export interface Ingredient {
  id: string;
  name: string;
}

export async function getIngredients(): Promise<Ingredient[]> {
  const { data } = await nextServer.get<Ingredient[]>('/ingredients');
  return data;
}
