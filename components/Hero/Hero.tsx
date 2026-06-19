'use client';

import { fetchRecipes } from '@/lib/api/recipesApi';
import SearchBox from '../SearchBox/SearchBox';
import css from './Hero.module.css';

function Hero() {
  const handleSearch = (value: string) => {
    fetchRecipes({ keyword: value });
  };
  return (
    <div className={css.hero}>
      <h1 className={css.hero__title}>Plan, Cook, and Share Your Flavors</h1>
      <SearchBox onSearch={handleSearch} />
    </div>
  );
}

export default Hero;
