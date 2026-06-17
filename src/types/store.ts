import type { CartEntry } from './cart';

export interface AccordionSlice {
  openStepId: string;
  toggleStep: (stepId: string) => void;
}

export interface CartSlice {
  cart: Record<string, CartEntry>;
  savedAt: string | null;
  setQuantity: (productId: string, variantId: string | undefined, stepId: string, qty: number) => void;
  increment: (productId: string, variantId: string | undefined, stepId: string) => void;
  decrement: (productId: string, variantId: string | undefined, stepId: string) => void;
  selectPlan: (productId: string, stepId: string) => void;
  saveSystem: () => void;
}

export type BuilderStore = AccordionSlice & CartSlice;
