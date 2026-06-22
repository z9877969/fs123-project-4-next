import { FilterParams } from '@/types/recipes';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '@/lib/api/recipesApi';

export function useRecipes(filters: FilterParams) {
  return useQuery({
    queryKey: ['recipes', filters],
    queryFn: () => fetchRecipes(filters),
    enabled:
      filters.keyword.trim() !== '' ||
      filters.category !== '' ||
      filters.ingredient !== '',
  });
}
