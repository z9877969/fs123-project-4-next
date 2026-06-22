import { Category } from '@/types/category';
import { Ingredient } from '@/types/ingredient';

import { ChangeEvent } from 'react';

interface SelectFiltersProps {
  options: Ingredient[] | Category[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function SelectFilter({
  options,
  placeholder,
  value,
  onChange,
}: SelectFiltersProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };
  return (
    <>
      <div className="filter__field">
        <select
          className="filter__select"
          value={value}
          onChange={handleChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option._id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectFilter;
