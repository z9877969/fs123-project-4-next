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

// Це для форми add-recipes
export interface AddRecipePayload {
  title: string;
  description: string;
  time: number;
  calories: number;
  category: string;
  ingredients: { id: string; measure: string }[];
  instructions: string;
  photo?: File | null;
}

export async function addRecipe(payload: AddRecipePayload): Promise<Recipe> {
  const formData = new FormData();
  formData.append('title', payload.title);
  formData.append('description', payload.description);
  formData.append('time', String(payload.time));
  formData.append('calories', String(payload.calories));
  formData.append('category', payload.category);
  formData.append('ingredients', JSON.stringify(payload.ingredients));
  formData.append('instructions', payload.instructions);
  if (payload.photo) formData.append('photo', payload.photo);

  const { data } = await nextServer.post<Recipe>('/recipes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
