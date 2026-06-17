import { useMemo } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import type { ReviewItemData } from '../types';
import { stepsData, STEP_ORDER } from '../constants';

export type { ReviewItemData } from '../types';

export function useReviewItems(): ReviewItemData[] {
  const cart = useBuilderStore((s) => s.cart);

  return useMemo(() => {
    return Object.values(cart)
      .filter((e) => e.quantity > 0)
      .map((entry) => {
        let name = entry.productId;
        let unitPrice = 0;
        let originalPrice: number | undefined;
        let priceLabel: string | undefined;
        let variantLabel: string | undefined;

        let image: string | undefined;

        for (const step of stepsData) {
          const product = step.products.find((p) => p.id === entry.productId);
          if (product) {
            name = product.name;
            unitPrice = product.price;
            originalPrice = product.originalPrice;
            priceLabel = product.priceLabel;
            image = product.image;
            variantLabel = entry.variantId
              ? product.variants?.find((v) => v.id === entry.variantId)?.label
              : undefined;
            break;
          }
        }

        return {
          productId: entry.productId,
          variantId: entry.variantId,
          name,
          variantLabel,
          quantity: entry.quantity,
          unitPrice,
          originalPrice,
          priceLabel,
          stepId: entry.stepId,
          image,
        };
      })
      .sort((a, b) => (STEP_ORDER[a.stepId] ?? 9) - (STEP_ORDER[b.stepId] ?? 9));
  }, [cart]);
}
