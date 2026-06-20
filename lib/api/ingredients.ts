import type { IngredientOption } from '@/types/ingredient';
import { nextServer } from './api';

export async function getIngredients(): Promise<IngredientOption[]> {
  const { data } = await nextServer.get<IngredientOption[]>('/ingredients');
  return data;
}
