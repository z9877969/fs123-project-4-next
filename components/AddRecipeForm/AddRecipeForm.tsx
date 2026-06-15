'use client';

import { Formik, Form, Field, FieldArray } from 'formik';
import { useId } from 'react';
import s from './AddRecipesForm.module.css';

interface AddRecipeFormProps {
  ingredients: { id: string; name: string }[];
}

const initialValues = {
  recipeTitle: '',
  recipeDescription: '',
  cookingTime: 10,
  calories: 150,
  category: 'Soup',
  photo: null,
  nameIngredients: '',
  amount: '',
};

export default function AddRecipeForm({ ingredients }: AddRecipeFormProps) {
  const fieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className={s.form}>
        <section className={s.mainSection}>
          <h3 className={s.sectionTitle}>General Information</h3>

          <div className={s.fieldGroup}>
            <label className={s.label} htmlFor={`${fieldId}-recipeTitle`}>
              Recipe Title
            </label>
            <Field
              className={s.input}
              name="recipeTitle"
              id={`${fieldId}-recipeTitle`}
              type="text"
              placeholder="Enter the name of your recipe"
            />
          </div>

          <div className={s.fieldGroup}>
            <label className={s.label} htmlFor={`${fieldId}-recipeDescription`}>
              Recipe Description
            </label>
            <Field
              className={s.textarea}
              name="recipeDescription"
              id={`${fieldId}-recipeDescription`}
              as="textarea"
              placeholder="Enter a brief description of your recipe"
            />
          </div>

          <div className={s.ingredientRow}>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-cookingTime`}>
                Cooking time (min)
              </label>
              <Field
                className={s.input}
                name="cookingTime"
                id={`${fieldId}-cookingTime`}
                type="number"
              />
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-calories`}>
                Calories
              </label>
              <Field
                className={s.input}
                name="calories"
                id={`${fieldId}-calories`}
                type="number"
              />
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-category`}>
                Category
              </label>
              <Field
                className={s.select}
                name="category"
                id={`${fieldId}-category`}
                as="select"
              >
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
                <option value="Dessert">Dessert</option>
              </Field>
            </div>
          </div>

          <h3 className={s.sectionTitle}>Ingredients</h3>

          <div className={s.ingredientRow}>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-nameIngredients`}>
                Name
              </label>
              <Field
                className={s.select}
                name="nameIngredients"
                id={`${fieldId}-nameIngredients`}
                as="select"
              >
                {ingredients.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Field>
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-amount`}>
                Amount
              </label>
              <Field
                className={s.input}
                name="amount"
                id={`${fieldId}-amount`}
                type="text"
                placeholder="e.g. 100g"
              />
            </div>
            <button type="button" className={s.btnSecondary}>
              Add
            </button>
          </div>

          <FieldArray name="ingredientsList">
            {({ remove, form }) => (
              <div className={s.ingredientList}>
                {form.values.ingredientsList?.map(
                  (item: { name: string; amount: string }, index: number) => (
                    <div key={index} className={s.ingredientItem}>
                      <span>{item.name}</span>
                      <span>{item.amount}</span>
                      <button
                        type="button"
                        className={s.btnDanger}
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </FieldArray>

          <h3 className={s.sectionTitle}>Instructions</h3>

          <div className={s.fieldGroup}>
            <label className={s.label} htmlFor={`${fieldId}-instructions`}>
              Instructions
            </label>
            <Field
              className={s.textarea}
              name="instructions"
              id={`${fieldId}-instructions`}
              as="textarea"
              placeholder="Enter a text"
            />
          </div>

          <button type="submit" className={s.btnPrimary}>
            Publish Recipe
          </button>
        </section>

        <section className={s.photoSection}>
          <div className={s.photoUpload}>
            <span>📷</span>
            <span>Upload photo</span>
            <input name="photo" type="file" accept="image/*" />
          </div>
        </section>
      </Form>
    </Formik>
  );
}
