export interface Variant {
  id: string;
  label: string;
  color?: string;
  variantImage?: string;   // small thumbnail shown inside the variant chip
}

export interface ProductData {
  id: string;
  name: string;
  price: number;
  priceLabel?: string;     // "/mo" for plans
  originalPrice?: number;  // for displaying crossed-out plan price
  description?: string;
  icon?: string;           // lucide icon name
  image?: string;          // product photo path (under /public)
  variants?: Variant[];
  badge?: string;          // "Most Popular"
  features?: string[];     // bullet list for plan cards
  discount?: string;       // "22%" → shows "Save 22%" badge on image
}

export interface StepData {
  id: string;
  step: number;
  title: string;
  subtitle?: string;
  nextLabel?: string;      // label shown in "Next: {nextLabel}" button
  selectionType: 'single' | 'multi';
  products: ProductData[];
}

export interface CartEntry {
  productId: string;
  variantId?: string;
  quantity: number;
  stepId: string;
}
