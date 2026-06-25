'use client';

import { useState } from 'react';
import css from './SearchBox.module.css';
import Loader from '../Loader/Loader';
import style from '@/app/Home.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
  isLoading: boolean;
}
function SearchBox({ onSearch, isLoading }: SearchBoxProps) {
  const [error, setError] = useState<string>('');
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = (formData.get('query') as string) || '';
    // console.log('Serch: ', query);

    if (!query.trim()) {
      setError('Please enter a recipe name to search!');
      return;
    }

    setError('');
    onSearch(query.trim());
  };
  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="query"
          type="text"
          placeholder="Search recipes"
        />
        <button className={css.submit__btn} type="submit" disabled={isLoading}>
          {isLoading ? <Loader variant="button" size="small" /> : 'Search'}
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </>
  );
}

export default SearchBox;
