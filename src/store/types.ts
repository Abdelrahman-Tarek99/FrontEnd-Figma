import type { CartEntry } from '../types';

// ── Accordion ────────────────────────────────────────────────────────────────
export interface AccordionSlice {
  openStepId: string;
  toggleStep: (stepId: string) => void;
}

// ── Cart ─────────────────────────────────────────────────────────────────────
export interface CartSlice {
  cart: Record<string, CartEntry>;
  savedAt: string | null;
  setQuantity: (
    productId: string,
    variantId: string | undefined,
    stepId: string,
    qty: number,
  ) => void;
  increment: (
    productId: string,
    variantId: string | undefined,
    stepId: string,
  ) => void;
  decrement: (
    productId: string,
    variantId: string | undefined,
    stepId: string,
  ) => void;
  selectPlan: (productId: string, stepId: string) => void;
  saveSystem: () => void;
}

// ── Combined store ────────────────────────────────────────────────────────────
export type BuilderStore = AccordionSlice & CartSlice;
