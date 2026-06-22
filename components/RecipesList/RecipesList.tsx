'use client';

import css from './RecipesList.module.css';
import { useState } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import { fetchRecipes } from '@/lib/api/clientApi';
import { Recipe } from '@/types/recipe';
// import iziToast from 'izitoast';
import Filters from '../Filters/Filters';

interface RecipeListProps {
  initialRecipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
  searchQuery?: string;
  currentCategory?: string;
}

export default function RecipeList({
  initialRecipes,
  totalPages,
  totalRecipes,
  searchQuery = '',
  currentCategory = '',
}: RecipeListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = page < totalPages;

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;

      const data = await fetchRecipes(nextPage, searchQuery, currentCategory);

      setRecipes((prevRecipes) => [...prevRecipes, ...data.recipes]);

      setPage(nextPage);
    } catch (error) {
      const iziToast = (await import('izitoast')).default;
      iziToast.error({
        title: 'Error',
        message: 'Failed to load more recipes. Please try again later.',
        position: 'topRight',
        timeout: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Recipes</h1>
        <div className={css.meta}>
          <Filters />
        </div>
      </div>

      <ul className={css.grid}>
        {recipes.map((recipe) => (
          <li key={recipe._id} className={css.gridItem}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className={css.loadMoreWrapper}>
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
        </div>
      )}
    </div>
  );
}
