'use client';

import { Formik, Form, Field, useFormikContext } from 'formik';
import { useId, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { addRecipeValidationSchema } from '@/lib/validation/addRecipeValidationSchema';
import DynamicIngredients from './DynamicIngredients/DynamicIngredients';
import s from './AddRecipesForm.module.css';
import { AddRecipeFormValues, AddRecipeFormProps } from '@/types/addRecipe';

function PhotoUpload() {
  const { setFieldValue } = useFormikContext<AddRecipeFormValues>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    if (file) {
      const url = URL.createObjectURL(file);
      prevUrlRef.current = url;
      setPreviewUrl(url);
      setFieldValue('photo', file);
    } else {
      prevUrlRef.current = null;
      setPreviewUrl(null);
      setFieldValue('photo', null);
    }
  }

  return (
    <div className={s.photoUpload} onClick={() => inputRef.current?.click()}>
      {previewUrl ? (
        <Image
          src={previewUrl}
          alt="Recipe preview"
          fill
          className={s.photoPreview}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <svg
          width="44"
          height="38"
          viewBox="0 0 38 32"
          aria-hidden="true"
          className={s.photoIcon}
        >
          <use href="/icons/icons.svg#icon-photo" />
        </svg>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={s.photoInput}
        onChange={handleChange}
      />
    </div>
  );
}

const initialValues: AddRecipeFormValues = {
  recipeTitle: '',
  recipeDescription: '',
  cookingTime: 10,
  calories: 150,
  category: 'Soup',
  photo: null,
  selectedIngredientId: '',
  amount: '',
  ingredientsList: [],
  instructions: '',
};

export default function AddRecipeForm({ ingredients }: AddRecipeFormProps) {
  const fieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addRecipeValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className={s.form}>
        <h2 className={s.pageTitle}>Add Recipe</h2>

        <section className={s.mainSection}>
          <div className={s.generalGrid}>
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
              <label
                className={s.label}
                htmlFor={`${fieldId}-recipeDescription`}
              >
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

            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-cookingTime`}>
                Cooking time in minutes
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

          <DynamicIngredients ingredients={ingredients} />

          <div className={s.fieldGroup}>
            <label
              className={s.instructionTitle}
              htmlFor={`${fieldId}-instructions`}
            >
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
          <h3 className={s.photoLabel}>Upload Photo</h3>
          <PhotoUpload />
        </section>
      </Form>
    </Formik>
  );
}
