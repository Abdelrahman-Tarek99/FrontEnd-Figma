import { useState } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import { cartKey } from '../constants';
import type { ProductData } from '../types';

export function useProductCard(product: ProductData, stepId: string) {
  const firstVariantId = product.variants?.[0]?.id;
  const [activeVariantId, setActiveVariantId] = useState<string | undefined>(firstVariantId);

  const increment = useBuilderStore((s) => s.increment);
  const decrement = useBuilderStore((s) => s.decrement);
  const selectPlan = useBuilderStore((s) => s.selectPlan);

  // Fine-grained subscriptions — only re-render when the specific quantity or selection changes
  const quantity = useBuilderStore(
    (s) => s.cart[cartKey(product.id, activeVariantId)]?.quantity ?? 0,
  );
  const isSelected = useBuilderStore((s) =>
    Object.values(s.cart).some((e) => e.productId === product.id && e.quantity > 0),
  );

  return {
    activeVariantId,
    setActiveVariantId,
    quantity,
    isSelected,
    handleIncrement: () => increment(product.id, activeVariantId, stepId),
    handleDecrement: () => decrement(product.id, activeVariantId, stepId),
    handlePlanSelect: () => selectPlan(product.id, stepId),
  };
}
