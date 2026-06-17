import type { StateCreator } from 'zustand';
import type { CartEntry } from '../../types';
import type { BuilderStore, CartSlice } from '../types';
import { cartKey, INITIAL_CART } from '../../constants';

export const createCartSlice: StateCreator<
  BuilderStore,
  [['zustand/persist', unknown]],
  [],
  CartSlice
> = (set, get) => ({
  cart: INITIAL_CART,
  savedAt: null,

  setQuantity: (productId, variantId, stepId, qty) =>
    set((s) => {
      const key = cartKey(productId, variantId);
      if (qty <= 0) {
        const next = { ...s.cart };
        delete next[key];
        return { cart: next };
      }
      return {
        cart: { ...s.cart, [key]: { productId, variantId, quantity: qty, stepId } },
      };
    }),

  increment: (productId, variantId, stepId) => {
    const current = get().cart[cartKey(productId, variantId)]?.quantity ?? 0;
    get().setQuantity(productId, variantId, stepId, current + 1);
  },

  decrement: (productId, variantId, stepId) => {
    const current = get().cart[cartKey(productId, variantId)]?.quantity ?? 0;
    get().setQuantity(productId, variantId, stepId, Math.max(0, current - 1));
  },

  selectPlan: (productId, stepId) =>
    set((s) => {
      const next: Record<string, CartEntry> = {};
      for (const [k, v] of Object.entries(s.cart)) {
        if (v.stepId !== stepId) next[k] = v;
      }
      const key = cartKey(productId, undefined);
      if (s.cart[key]?.quantity) return { cart: next };
      next[key] = { productId, quantity: 1, stepId };
      return { cart: next };
    }),

  saveSystem: () => set({ savedAt: new Date().toISOString() }),
});
