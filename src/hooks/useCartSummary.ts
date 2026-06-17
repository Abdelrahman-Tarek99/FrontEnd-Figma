import { useReviewItems } from './useReviewItems';

export function useCartSummary() {
  const items = useReviewItems();

  const equipmentTotal = items
    .filter((i) => !i.priceLabel)
    .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const monthlyItem = items.find((i) => Boolean(i.priceLabel));

  return {
    items,
    equipmentTotal,
    monthlyItem,
    isEmpty: items.length === 0,
    totalItems: items.length,
  };
}
