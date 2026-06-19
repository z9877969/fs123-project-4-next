import { NewNoteContent, Note } from '@/types/note';
import { api } from './api';
import { User } from '@/types/user';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

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
  const res = await api.patch<User>('/users/me', payload);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export async function fetchNotes(
  query: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params = { search: query, page, perPage: 12, tag: tag };
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
  });
  return data;
}

export async function fetchNoteById(id: string) {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(newNote: NewNoteContent): Promise<Note> {
  const { data } = await api.post<Note>('/notes', newNote);
  return data;
}

export async function deleteNote(id: Note['id']): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};
