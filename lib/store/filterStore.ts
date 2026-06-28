import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterStore {
  selectedArea: string | null;
  selectedSort: string;
  setSelectedArea: (area: string | null) => void;
  setSelectedSort: (sort: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      selectedArea: null,
      selectedSort: 'nearest',
      setSelectedArea: (area) => set({ selectedArea: area }),
      setSelectedSort: (sort) => set({ selectedSort: sort }),
      resetFilters: () => set({ selectedArea: null, selectedSort: 'nearest' }),
    }),
    { name: 'dreefree-filter' }
  )
);
