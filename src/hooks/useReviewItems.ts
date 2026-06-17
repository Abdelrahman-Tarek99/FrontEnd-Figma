import { useMemo } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import rawData from '../data/products.json';
import type { StepData } from '../types';

const stepsData = (rawData as { steps: StepData[] }).steps;

const STEP_ORDER: Record<string, number> = {
  cameras: 0,
  plan: 1,
  sensors: 2,
  'extra-protection': 3,
};

export interface ReviewItemData {
  productId: string;
  variantId?: string;
  name: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: number;
  originalPrice?: number;
  priceLabel?: string;
  stepId: string;
}

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

        for (const step of stepsData) {
          const product = step.products.find((p) => p.id === entry.productId);
          if (product) {
            name = product.name;
            unitPrice = product.price;
            originalPrice = product.originalPrice;
            priceLabel = product.priceLabel;
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
        };
      })
      .sort((a, b) => (STEP_ORDER[a.stepId] ?? 9) - (STEP_ORDER[b.stepId] ?? 9));
  }, [cart]);
}
