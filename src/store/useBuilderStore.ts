import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BuilderStore } from './types';
import { createAccordionSlice } from './slices/accordionSlice';
import { createCartSlice } from './slices/cartSlice';

export { cartKey } from '../constants';
export type { BuilderStore } from './types';

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (...a) => ({
      ...createAccordionSlice(...a),
      ...createCartSlice(...a),
    }),
    { name: 'bundle-builder-v2' },
  ),
);
