"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],
      addToCart: (product: Omit<CartItem, "quantity">) => {
        const state = get();
        const existing = state.items.find((item) => item._id === product._id);
        if (existing) {
          set({
            items: state.items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...state.items, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (id: string) => {
        const state = get();
        set({ items: state.items.filter((item) => item._id !== id) });
      },
      updateQuantity: (id: string, quantity: number) => {
        const state = get();
        if (quantity <= 0) {
          set({ items: state.items.filter((item) => item._id !== id) });
        } else {
          set({
            items: state.items.map((item) =>
              item._id === id ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.quantity, 0);
      },
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: "lustrae-cart",
    }
  )
);
