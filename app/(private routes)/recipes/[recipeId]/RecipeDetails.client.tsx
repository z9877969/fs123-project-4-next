'use client';

import { fetchRecipeById } from '@/lib/api/clientApi';
import css from './RecipeDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const RecipeDetailsClient = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipeById(recipeId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !recipe) return <p>Something went wrong.</p>;

  const formattedDate = recipe.updatedAt
    ? `Updated at: ${recipe.updatedAt}`
    : `Created at: ${recipe.createdAt}`;

  return (
    <div className={css.container}>
      {/* Шапка з зображенням та базовою інформацією */}
      <div className={css.header}>
        <div className={css.imageWrapper}>
          <Image
            src={
              recipe.thumb ||
              'https://via.placeholder.com/600x400?text=No+Image'
            }
            width={600}
            height={400}
            alt={recipe.title}
            className={css.image}
          />
        </div>
        <div className={css.info}>
          <h1 className={css.title}>{recipe.title}</h1>
          <button className={css.saveButton}>
            <span>Save</span>
            <span className={css.saveMark}>✓</span>
          </button>
        </div>
      </div>

      {/* Основний контент */}
      <div className={css.content}>
        <div className={css.mainContent}>
          {/* Про рецепт */}
          <section className={css.section}>
            <h2 className={css.sectionTitle}>About recipe</h2>
            <p className={css.description}>{recipe.description}</p>
          </section>

          {/* Інгредієнти */}
          <section className={css.section}>
            <h2 className={css.sectionTitle}>Ingredients:</h2>
            <ul className={css.ingredientsList}>
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className={css.ingredientItem}>
                  {ingredient.id.name} — {ingredient.measure}
                </li>
              ))}
            </ul>
          </section>

          {/* Кроки приготування */}
          <section className={css.section}>
            <h2 className={css.sectionTitle}>Preparation Steps:</h2>
            <p className={css.instructions}>{recipe.instructions}</p>
          </section>
        </div>

        {/* Бічна панель */}
        <aside className={css.sidebar}>
          <div className={css.infoBox}>
            <h3 className={css.infoBoxTitle}>General informations</h3>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Category:</span>
              <span className={css.infoValue}>{recipe.category}</span>
            </div>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Cooking time:</span>
              <span className={css.infoValue}>{recipe.time} minutes</span>
            </div>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Calorie content:</span>
              <span className={css.infoValue}>
                Approximately {recipe.calories} kcal per serving
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default RecipeDetailsClient;
