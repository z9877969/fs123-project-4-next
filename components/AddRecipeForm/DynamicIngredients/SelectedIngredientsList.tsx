import s from './DynamicIngredients.module.css';
import type { RecipeIngredientItem } from '@/types/addRecipe';

interface SelectedIngredientsListProps {
  ingredientsList: RecipeIngredientItem[];
  onRemove: (index: number) => void;
}

export default function SelectedIngredientsList({
  ingredientsList,
  onRemove,
}: SelectedIngredientsListProps) {
  return (
    <>
      <div className={s.listHeader}>
        <span>Name:</span>
        <span>Amount:</span>
      </div>

      <ul className={s.ingredientList}>
        {ingredientsList.map((item, index) => (
          <li
            key={`${item.ingredientId}-${index}`}
            className={s.ingredientItem}
          >
            <span className={s.ingredientName}>{item.name}</span>
            <span className={s.ingredientAmount}>{item.amount}</span>

            <button
              type="button"
              className={s.removeButton}
              onClick={() => onRemove(index)}
              aria-label={`Remove ${item.name}`}
            >
              <svg className={s.deleteIcon} aria-hidden="true">
                <use href="/icons/icons.svg#icon-delete" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
