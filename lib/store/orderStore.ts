import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cartStore';
import type { DataOrder } from '@/lib/data';

interface CurrentOrder {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  notes: string;
  storeName: string;
  deliveryAddress: string;
}

interface OrderStore {
  currentOrder: CurrentOrder | null;
  activeOrders: DataOrder[];
  pastOrders: DataOrder[];
  setCurrentOrder: (order: CurrentOrder) => void;
  clearCurrentOrder: () => void;
  addActiveOrder: (order: DataOrder) => void;
  removeActiveOrder: (id: string) => void;
  updateActiveOrder: (id: string, updates: Partial<DataOrder>) => void;
  moveToPastOrders: (id: string) => void;
  addPastOrder: (order: DataOrder) => void;
}

function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'DF-';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      currentOrder: null,
      activeOrders: [],
      pastOrders: [],

      setCurrentOrder: (order) => set({ currentOrder: order }),

      clearCurrentOrder: () => set({ currentOrder: null }),

      addActiveOrder: (order) =>
        set((state) => ({ activeOrders: [order, ...state.activeOrders] })),

      removeActiveOrder: (id) =>
        set((state) => ({
          activeOrders: state.activeOrders.filter((o) => o.id !== id),
        })),

      updateActiveOrder: (id, updates) =>
        set((state) => ({
          activeOrders: state.activeOrders.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),

      moveToPastOrders: (id) => {
        const { activeOrders, pastOrders } = get();
        const order = activeOrders.find((o) => o.id === id);
        if (order) {
          set({
            activeOrders: activeOrders.filter((o) => o.id !== id),
            pastOrders: [{ ...order, status: 'مكتمل' }, ...pastOrders],
          });
        }
      },

      addPastOrder: (order) =>
        set((state) => ({ pastOrders: [order, ...state.pastOrders] })),
    }),
    { name: 'dreefree-orders' }
  )
);

export { generateOrderId };
