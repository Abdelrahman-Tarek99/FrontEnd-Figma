import type { ReactNode } from 'react';
import type { Variant, ProductData, StepData } from './product';
import type { ReviewItemData } from './cart';

export interface AccordionStepProps {
  step: StepData;
  totalSteps: number;
  nextStepId?: string;
}

export interface ProductCardProps {
  product: ProductData;
  step: StepData;
}

export interface VariantSelectorProps {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  compact?: boolean;
}

export interface ReviewLineItemProps {
  item: ReviewItemData;
  static?: boolean;
  customPrice?: ReactNode;
}
