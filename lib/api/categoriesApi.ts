import { Category } from '@/types/recipes';
import { api } from './api';

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>('/categories');
  console.log('Categories: ', data);

  return data;
}
