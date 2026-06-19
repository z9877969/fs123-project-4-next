import { NewNoteContent, Note } from '@/types/note';
import { api } from './api';
import { cookies } from 'next/headers';
import { FetchNotesResponse } from './clientApi';
import { User } from '@/types/user';

export async function fetchNotes(query: string, page: number, tag?: string) {
  const params = { search: query, page, perPage: 12, tag: tag };
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params,
  });
  return data;
}

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
