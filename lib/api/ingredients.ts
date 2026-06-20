import type { IngredientOption } from '@/types/ingredient';
import { nextServer } from './api';

interface BackendIngredient {
  _id: string;
  id?: string;
  name: string;
  desc?: string;
  img?: string;
}

export async function getIngredients(): Promise<IngredientOption[]> {
  const { data } = await nextServer.get<BackendIngredient[]>('/ingredients');
  return data.map((ingredient) => ({
    id: ingredient.id ?? ingredient._id,
    name: ingredient.name,
  }));
}
