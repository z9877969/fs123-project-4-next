import { Ingredient, Category } from '@/types/recipes';

interface SelectFiltersProps {
  options: Ingredient[] | Category[];
  placeholder: string;
}

function SelectFilter({ options, placeholder }: SelectFiltersProps) {
  return (
    <>
      <div className="filter__field">
        <select className="filter__select">
          <option>{placeholder}</option>
          {options.map((option) => (
            <option key={option._id}>{option.name}</option>
          ))}
        </select>
      </div>
    </>
  );
}

export default SelectFilter;
