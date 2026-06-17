import { useMemo } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';

export function useAccordion(stepId: string) {
  const isOpen = useBuilderStore((s) => s.openStepId === stepId);
  const toggleStep = useBuilderStore((s) => s.toggleStep);
  const cart = useBuilderStore((s) => s.cart);

  const selectedCount = useMemo(() => {
    const ids = new Set(
      Object.values(cart)
        .filter((e) => e.stepId === stepId && e.quantity > 0)
        .map((e) => e.productId),
    );
    return ids.size;
  }, [cart, stepId]);

  return {
    isOpen,
    selectedCount,
    toggle: () => toggleStep(stepId),
  };
}
