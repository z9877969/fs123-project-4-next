import RecipeList from '@/components/RecipesList/RecipesList';
import Hero from '@/components/Hero/Hero';
import { useState } from 'react';

export default function App() {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    ingredient: '',
  });
  return (
    <>
      <Hero />
      <RecipeList
        initialRecipes={[]}
        totalPages={1}
        totalRecipes={12}
        searchQuery=""
        currentCategory=""
      />
    </>
  );
}
