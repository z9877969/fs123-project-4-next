import { create } from 'zustand';
import { Recipe } from '@/types/recipe';
import { SearchFilters } from '@/types/filters';

type FiltrersStore = {
  filters: SearchFilters;
  recipes: Recipe[];
  totalRecipes: number;
  totalPages: number;
  //Стан завантаження. Стає true, коли йде запит з SearchBox або Filters
  //Використовувати для показу лоадера на місці списку рецептів
  isLoading: boolean;

  //Оновлює одне або кілька полів у фільтрах
  filtersChange: (filter: Partial<SearchFilters>) => void;

  //Записує в стор отримані від бекнду результати пошуку
  setRecipesData: (data: {
    recipes: Recipe[];
    totalRecipes: number;
    totalPages: number;
  }) => void;

  //Вмикає фбо вимикає стан глобального завантаження (показ лоадера)
  setIsLoading: (loading: boolean) => void;

  //Скидає всі фільтри (keyword, category, ingredient) до початкових порожніх рядків
  clearFilters: () => void;
};

const initialFilters: SearchFilters = {
  keyword: '',
  category: '',
  ingredient: '',
};

export const useFiltersStore = create<FiltrersStore>()((set) => ({
  filters: initialFilters,
  recipes: [],
  totalRecipes: 0,
  totalPages: 0,
  isLoading: false,
  filtersChange: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  setRecipesData: (data) =>
    set(() => ({
      recipes: data.recipes,
      totalRecipes: data.totalRecipes,
      totalPages: data.totalPages,
    })),
  setIsLoading: (loading) => set(() => ({ isLoading: loading })),
  clearFilters: () => set(() => ({ filters: initialFilters })),
}));
