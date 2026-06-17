import type { StateCreator } from 'zustand';
import type { BuilderStore, AccordionSlice } from '../types';

export const createAccordionSlice: StateCreator<
  BuilderStore,
  [['zustand/persist', unknown]],
  [],
  AccordionSlice
> = (set) => ({
  openStepId: 'cameras',
  toggleStep: (stepId) =>
    set((s) => ({ openStepId: s.openStepId === stepId ? '' : stepId })),
});
