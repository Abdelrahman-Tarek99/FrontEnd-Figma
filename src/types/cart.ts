export interface CartEntry {
  productId: string;
  variantId?: string;
  quantity: number;
  stepId: string;
}

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
  image?: string;
}
