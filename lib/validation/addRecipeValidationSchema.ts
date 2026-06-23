import * as Yup from 'yup';

export const addRecipeValidationSchema = Yup.object({
  recipeTitle: Yup.string().trim().required('Recipe title is required'),
  recipeDescription: Yup.string().trim().required('Recipe description is required'),
  cookingTime: Yup.number()
    .min(1, 'Cooking time must be at least 1 minute')
    .required('Cooking time is required'),
  calories: Yup.number()
    .min(1, 'Calories must be at least 1')
    .required('Calories is required'),
  category: Yup.string().required('Category is required'),
  instructions: Yup.string().trim().required('Instructions are required'),
  ingredientsList: Yup.array()
    .of(
      Yup.object({
        ingredientId: Yup.string().required('Please select an ingredient'),
        amount: Yup.string().trim().required('Please enter the amount'),
      })
    )
    .min(1, 'Please add at least one ingredient'),
});
