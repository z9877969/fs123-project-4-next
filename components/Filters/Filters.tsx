'use client';

import SelectFilter from '../SelectFilter/SelectFilter';
import { useCategories } from '@/hooks/useCategories';
import { useIngredients } from '@/hooks/useIngredients';
import { fetchRecipes } from '@/lib/api/recipesApi';
import { useFiltersStore } from '@/lib/store/filtersStore';
import { SearchFilters } from '@/types/filters';
import iziToast from 'izitoast';

function Filters() {
  const { data: categories = [] } = useCategories();
  const { data: ingredients = [] } = useIngredients();

  const filters = useFiltersStore((state) => state.filters);
  const filtersChange = useFiltersStore((state) => state.filtersChange);
  const clearFilters = useFiltersStore((state) => state.clearFilters);
  const setRecipesData = useFiltersStore((state) => state.setRecipesData);
  const setIsLoading = useFiltersStore((state) => state.setIsLoading);
  const totalRecipes = useFiltersStore((state) => state.totalRecipes);

  const updateFilters = async (newFilters: SearchFilters) => {
    setIsLoading(true);
    try {
      const query = {
        keyword: newFilters.keyword,
        category: newFilters.category,
        ingredient: newFilters.ingredient,
      };
      const data = await fetchRecipes(query);

      console.log('--- РЕЗУЛЬТАТ ЗАПИТУ З ФІЛЬТРАМИ ---', {
        відправлені_параметри: query,
        що_повернув_бекенд: data,
        де_брати_рецепти: 'useFiltersStore((state) => state.recipes)',
        де_драти_кількість: 'useFiltersStore((state) => state.totalRecipes)',
      });

      setRecipesData({
        recipes: data.recipes,
        totalRecipes: data.totalRecipes,
        totalPages: data.totalPages,
      });
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch filtered recipes.',
        position: 'topRight',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    const moreFilters = { ...filters, category: value };
    filtersChange({ category: value });
    updateFilters(moreFilters);
  };

  const handleIngredientChange = (value: string) => {
    const moreFilters = { ...filters, ingredient: value };
    filtersChange({ ingredient: value });
    updateFilters(moreFilters);
  };

  const handleReset = () => {
    clearFilters();
    updateFilters({ keyword: '', category: '', ingredient: '' });
  };

  console.log('filters store: ', filters);

  return (
    <>
      <span className="filters__count">{totalRecipes} recipes</span>
      <button onClick={handleReset}>Reset filters</button>
      <SelectFilter
        options={categories}
        placeholder="Category"
        value={filters.category}
        onChange={handleCategoryChange}
      />
      <SelectFilter
        options={ingredients}
        placeholder="Ingredient"
        value={filters.ingredient}
        onChange={handleIngredientChange}
      />
      {/* <button className={css.filterBtn} aria-label="Filters">
        Filters
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button> */}
    </>
  );
}

export default Filters;
