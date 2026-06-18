import { Recipe } from "@/types/recipe";
import { nextServer } from "./api";
import { User } from "@/types/user";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  name: string;
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
  const res = await nextServer.patch<User>('/users/current/', payload);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/current/');
  return data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params = { search: query, page, perPage: 12, tag: tag };
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
  });
  return data;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export async function createNote(newNote: NewNoteContent): Promise<Note> {
  const { data } = await nextServer.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

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
  query: string = "",
  category?: string
): Promise<FetchRecipesResponse> {
  const params = { 
    search: query, 
    page, 
    perPage: 12, 
    category 
  };

  const { data } = await nextServer.get<FetchRecipesResponse>("/api/recipes", {
    params,
  });

  return data;
}
