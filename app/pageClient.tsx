'use client'
import css from '@/components/RecipesList/RecipesList.module.css'
import { useEffect } from "react"; // Прибрали useState
import RecipeCard from "@/components/RecipeCard/RecipeCard"; 
import LoadMoreBtn from '@/components/LoadMoreBtn/LoadMoreBtn';
import { fetchRecipes } from '@/lib/api/clientApi';
import { Recipe } from '@/types/recipe';
import 'izitoast/dist/css/iziToast.min.css';

// 1. Обов'язково імпортуємо стор (перевір шлях, можливо він у тебе '@/store/filtersStore')
import { useFiltersStore } from '@/lib/store/filtersStore'; 

interface RecipeListProps {
  initialRecipes: Recipe[];
  totalPages: number;
  totalRecipes: number;
  searchQuery?: string;     
  currentCategory?: string; 
}

export default function RecipesList({
  initialRecipes,
  totalPages: initialTotalPages,
  totalRecipes: initialTotalRecipes,
  searchQuery = "",
  currentCategory = "",
}: RecipeListProps) {

  // 2. Дістаємо всі необхідні дані та функції глобально з Zustand
  const { 
    recipes, 
    totalRecipes, 
    totalPages, 
    page, 
    isLoading, 
    filters,
    setRecipesData, 
    setPage, 
    setIsLoading 
  } = useFiltersStore();

  // 3. Гідратація: записуємо дані від сервера у стор при першому завантаженні
  useEffect(() => {
    setRecipesData({
      recipes: initialRecipes,
      totalRecipes: initialTotalRecipes,
      totalPages: initialTotalPages,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRecipes, initialTotalRecipes, initialTotalPages]);

  // Змінні для відображення, щоб екран не був порожнім доки спрацьовує useEffect
  const displayRecipes = recipes.length > 0 ? recipes : initialRecipes;
  const displayTotal = totalRecipes > 0 || recipes.length > 0 ? totalRecipes : initialTotalRecipes;
  const displayTotalPages = totalPages > 0 || recipes.length > 0 ? totalPages : initialTotalPages;

  const hasMore = page < displayTotalPages;

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return; 

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      
      // 4. Робимо запит до API з поточними фільтрами ЗІ СТОРУ
      const data = await fetchRecipes(
        nextPage, 
        filters.keyword || searchQuery, 
        filters.category || currentCategory
      );
      
      // 5. Об'єднуємо старі рецепти з новими і записуємо в стор
      setRecipesData({
        recipes: [...displayRecipes, ...data.recipes],
        totalRecipes: data.totalRecipes,
        totalPages: data.totalPages,
      });
      
      // 6. Оновлюємо сторінку в сторі
      setPage(nextPage);
    } catch (error) {
        // Динамічний імпорт iziToast
        const iziToast = (await import("izitoast")).default;
        iziToast.error({
          title: "Error",
          message: "Failed to load more recipes. Please try again later.",
          position: "topRight",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.container}>
        <h1 className={css.title}>Recipes</h1>
        <div className={css.meta}>
          <span className={css.count}>{displayTotal} recipes</span>
          <button className={css.filterBtn} aria-label="Filters">
            Filters
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

      <ul className={css.grid}>
        {displayRecipes.map((recipe) => (
        <li key={recipe._id}>
              <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>

      {hasMore && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={isLoading} />
      )}
    </div>
  );
}