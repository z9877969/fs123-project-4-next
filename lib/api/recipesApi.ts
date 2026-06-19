import { FilterParams, Recipes } from '@/types/recipes';
import { api } from './api';

export interface FetchNotesResponse {
  recipes: Recipes[];
  totalPages: number;
}

export async function fetchRecipes({
  keyword,
  category,
  ingredient,
}: FilterParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>('/recipes', {
    params: {
      keyword,
      category,
      ingredient,
    },
  });
  // console.log('Recipes: ', data);

  return data;
}
