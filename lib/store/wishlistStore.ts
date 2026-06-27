import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: string;
  storeName?: string;
}

interface WishlistStore {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isFavorite: (id: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => set((state) => {
        const exists = state.items.find(i => i.id === item.id);
        if (exists) return { items: state.items.filter(i => i.id !== item.id) };
        return { items: [...state.items, item] };
      }),
      isFavorite: (id) => get().items.some(i => i.id === id),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'dreefree-wishlist' }
  )
);
