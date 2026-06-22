import { Recipe } from '@/types/recipe';
import { nextServer } from './api';
import { User } from '@/types/user';

export type RegisterRequest = {
  email: string;
  password: string;
};
export type LoginRequest = {
  email: string;
  password: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export type UpdateUserRequest = {
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export interface FetchRecipesResponse {
  page: number;
  perPage: number;
  totalRecipes: number;
  totalPages: number;
  recipes: Recipe[];
}

export async function fetchRecipes(
  page: number = 1,
  query: string = '',
  category?: string,
  ingredient?: string
): Promise<FetchRecipesResponse> {
  const params = {
    keyword: query,
    page,
    perPage: 12,
    category,
    ingredient,
  };

  const { data } = await nextServer.get<FetchRecipesResponse>('/api/recipes', {
    params,
  });

  return data;
}

export async function fetchRecipeById(recipeId: string): Promise<Recipe> {
  const { data } = await fetch(`/api/recipes/${recipeId}`).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch recipe');
    return res.json();
  });
  return data.data;
}

export interface AddFavoriteResponse {
  status: number;
  message: string;
  data: string[];
}

export interface RemoveFavoriteResponse {
  status: number;
  message: string;
  data: {
    recipeId: string;
  };
}

export async function fetchRecipeById(recipeId: string): Promise<Recipe> {
  const { data } = await fetch(`/api/recipes/${recipeId}`).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch recipe');
    return res.json();
  });
  return data.data;
}

export async function addToFavorites(
  recipeId: string
): Promise<AddFavoriteResponse> {
  const { data } = await nextServer.post(`/recipes/${recipeId}/favorite`);
  return data;
}

export async function removeFromFavorites(
  recipeId: string
): Promise<RemoveFavoriteResponse> {
  const { data } = await nextServer.delete(`/recipes/${recipeId}/favorite`);
  return data;
}
