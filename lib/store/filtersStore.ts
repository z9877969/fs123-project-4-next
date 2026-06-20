import { create } from 'zustand';

type FiltrersStore = {
  recipe: string;
  category: string;
  ingredient: string;
  filtersChange: () => void;
};

export const useFiltersStore = create<FiltrersStore>()((set) => ({
  recipe: '',
  category: '',
  ingredient: '',
  filtersChange: () => set((state) => ({})),
}));
