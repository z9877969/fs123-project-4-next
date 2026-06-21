import { Category } from '@/types/category';
import { nextServer } from './api';

export async function getCategories(): Promise<Category[]> {
  const { data } = await nextServer.get<Category[]>('/categories');
  console.log('Categories: ', data);

  return data;
}
