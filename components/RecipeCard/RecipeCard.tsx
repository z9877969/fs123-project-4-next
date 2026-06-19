import { Recipe } from "@/types/recipe";
import css from './RecipeCard.module.css'
interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const {
    title,
    image = 'https://via.placeholder.com/400x300?text=No+Image',
    description = 'Delicious recipe.',
    time = 10,
    calories = '~150 cals',
  } = recipe;

  return (
    <article className={css.card}>
      

      <div className={css.content}>
        {/* Заголовок та час */}
        <div className={css.header}>
          <h3 className={css.title}>{title}</h3>
          <div className={css.timeBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            <span>{time}</span>
          </div>
        </div>

        {/* Опис */}
        <p className={css.description}>{description}</p>
        
        {/* Калорії */}
        <p className={css.calories}>{calories}</p>

        {/* Кнопки внизу картки */}
        <div className={css.actions}>
          <button className={css.learnMoreBtn}>Learn more</button>
          <button className={css.bookmarkBtn} aria-label="Save recipe">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
