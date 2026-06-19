'use client';

import { getCategories } from '@/lib/api/categoriesApi';
import SelectFilter from '../SelectFilter/SelectFilter';
import { getIngredients } from '@/lib/api/ingredientsApi';
import { useEffect, useState } from 'react';
import { Category, Ingredient } from '@/types/recipes';
import { useCategories } from '@/hooks/useCategories';
import { useIngredients } from '@/hooks/useIngredients';

function Filters() {
  const { data: categories = [] } = useCategories();
  const { data: ingredients = [] } = useIngredients();

  console.log('categories: ', categories);

  return (
    <>
      <button>Reset filters</button>
      <SelectFilter options={categories} placeholder="Category" />
      <SelectFilter options={ingredients} placeholder="Ingredient" />
    </>
  );
}

export default Filters;
