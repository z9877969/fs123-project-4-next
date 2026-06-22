import { Recipe } from '@/types/recipe';
import { nextServer } from './api';
import { SearchFilters } from '@/types/filters';

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  recipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
}

export async function fetchRecipes({
  keyword,
  category,
  ingredient,
}: SearchFilters): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    perPage: 12,
  };

  //так як на беку немає перевірки на пусту строку в запиті з фільтрами, то додала умову при якій фільтри до запиту додаються тільки, коли не пусті
  if (keyword && keyword.trim() !== '') params.keyword = keyword.trim();
  if (category && category.trim() !== '') params.category = category.trim();
  if (ingredient && ingredient.trim() !== '')
    params.ingredient = ingredient.trim();

  const { data } = await nextServer.get<FetchNotesResponse>('/recipes', {
    params,
  });

  return data;
}
