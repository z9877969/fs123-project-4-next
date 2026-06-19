import AddRecipeForm from '@/components/AddRecipeForm/AddRecipeForm';
import { getIngredients } from '@/lib/api/ingredientsApi'; // TODO: створити цей файл

export default async function AddRecipePage() {
  const ingredients = await getIngredients().catch(() => []);

  return (
    <>
      <h2>Add Recipe</h2>
      <AddRecipeForm ingredients={ingredients} />
    </>
  );
}
