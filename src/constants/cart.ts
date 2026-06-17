import type { CartEntry, ReviewItemData } from '../types';

export const cartKey = (productId: string, variantId?: string): string =>
  `${productId}:${variantId ?? 'default'}`;

export const INITIAL_CART: Record<string, CartEntry> = {
  'plan-home-monitoring:default': {
    productId: 'plan-home-monitoring',
    quantity: 1,
    stepId: 'plan',
  },
  'entry-sensor:default': {
    productId: 'entry-sensor',
    quantity: 3,
    stepId: 'sensors',
  },
  'motion-sensor:default': {
    productId: 'motion-sensor',
    quantity: 1,
    stepId: 'sensors',
  },
  'smart-lock:silver': {
    productId: 'smart-lock',
    variantId: 'silver',
    quantity: 1,
    stepId: 'extra-protection',
  },
};

export const FAST_SHIPPING_ITEM: ReviewItemData = {
  productId: 'fast-shipping',
  name: 'Fast Shipping',
  quantity: 1,
  unitPrice: 0,
  originalPrice: 5.99,
  stepId: 'plan',
  image: undefined,
};
