'use client';

import { strict } from 'assert';
import { Formik, Form, Field } from 'formik';

import { useId } from 'react';

interface Props {
  ingredients: { id: string, name: string };
}

const validationSchema = yup.object({});

const initialValues = {
  recipeTitle: '',
  recipeDescription: '',
  cookingTime: 10,
  calories: 150,
  category: 'Soup',
  photo: null,
  nameIngredients: 'Broccoli',
  amount: '100g',
};

export default function addRecipeForm({ ingredients }: Props) {
  const fieldId = useId();


  return (
    <Formik
      initialValues={initialValues}
    // validationSchema={ }
    // onSubmit={ }
    >
      <Form>
        <section>
          <h3>General Information</h3>

          <label htmlFor={`${fieldId}-recipeTitle`}>Recipe Title</label>
          <Field
            name="recipeTitle"
            id={`${fieldId}-recipeTitle`}
            type="text"
            placeholder="Enter the name of your recipe"
          />

          <label htmlFor={`${fieldId}-recipeDescription`}>Recipe Description</label>
          <Field
            name="recipeDescription"
            id={`${fieldId}-recipeDescription`}
            type="text"
            as="textarea"
            placeholder="Enter a brief description of your recipe"
          />

          <label htmlFor={`${fieldId}-cookingTime`}>Cooking time in minutes</label>
          <Field name="cookingTime" id={`${fieldId}-cookingTime`} type="number" />

          <label htmlFor={`${fieldId}-calories`}>Calories</label>
          <Field name="calories" id={`${fieldId}-calories`} type="number" />

          <label htmlFor={`${fieldId}-category`}>Category</label>
          <Field name="category" id={`${fieldId}-category`} as="select" />

          <h3>Ingredients</h3>
          <label htmlFor={`${fieldId}-nameIngredients`}>Name</label>
          <Field name="nameIngredients" id={`${fieldId}-nameIngredients`} as="select">
            { //тут випадаючий спиоск інгредієнтів з БД
              ingredients.map( //це рендеримо за допомогою пропсів, інфа в пропс передається
                // з app\(private routes)\add-recipe\page.tsx
                // <option value="">1</option>
                // <option value="morning">12</option>
                // <option value="afternoon">15</option>
              ) //Потрібно дописати  )
            }
          </Field>

          <label htmlFor={`${fieldId}-amount`}>Amount</label>
          <Field name="amount" id={`${fieldId}-amount`} type="text" />

          <button type="button" onClick={'handleFunction'}>Add new Ingredient
          </button>

          
          <FieldArray name="ingredients">
{/* Тут має відоображатись список інгредієнтів які ми додали в полях вище  */}
          </FieldArray>

          <h3>Instructions</h3>
          <Field
            name="instructions"
            type="text"
            as="textarea"
            placeholder="Enter a text"
          />
          <button type="submit" onClick={'handleFunction'}>
            Publish Recipe
          </button>
        </section>

        <section >
          <input name="photo" type="file" />
        </section>

      </Form>
    </Formik>
  );
}
