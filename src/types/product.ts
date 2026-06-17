export interface Variant {
  id: string;
  label: string;
  color?: string;
  variantImage?: string;
}

export interface ProductData {
  id: string;
  name: string;
  price: number;
  priceLabel?: string;
  originalPrice?: number;
  description?: string;
  icon?: string;
  image?: string;
  variants?: Variant[];
  badge?: string;
  features?: string[];
  discount?: string;
}

export interface StepData {
  id: string;
  step: number;
  title: string;
  subtitle?: string;
  nextLabel?: string;
  selectionType: 'single' | 'multi';
  products: ProductData[];
}
