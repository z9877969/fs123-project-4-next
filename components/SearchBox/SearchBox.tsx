'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  onSearch: (value: string) => void;
}
function SearchBox({ onSearch }: SearchBoxProps) {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;
    console.log('Serch: ', query);

    if (query.trim()) {
      onSearch(query);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="query"
          type="text"
          placeholder="Search recipes"
        />
        <button type="submit">search</button>
      </form>
    </>
  );
}

export default SearchBox;
