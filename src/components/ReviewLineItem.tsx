import type { ReviewItemData } from '../hooks/useReviewItems';
import { useBuilderStore } from '../store/useBuilderStore';
import { QuantityStepper } from './QuantityStepper';

interface Props {
  item: ReviewItemData;
}

export function ReviewLineItem({ item }: Props) {
  const increment = useBuilderStore((s) => s.increment);
  const decrement = useBuilderStore((s) => s.decrement);

  const isMonthly = Boolean(item.priceLabel);
  const lineTotal = isMonthly ? item.unitPrice : item.unitPrice * item.quantity;

  return (
    <div className="flex items-center gap-3">
      {/* Name + variant */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-ink leading-tight truncate">{item.name}</p>
        {item.variantLabel && (
          <p className="text-[11px] text-ink-muted">{item.variantLabel}</p>
        )}
      </div>

      {/* Inline stepper — only for one-time equipment */}
      {!isMonthly && (
        <QuantityStepper
          quantity={item.quantity}
          onIncrement={() => increment(item.productId, item.variantId, item.stepId)}
          onDecrement={() => decrement(item.productId, item.variantId, item.stepId)}
          compact
        />
      )}

      {/* Price */}
      <div className="shrink-0 text-right">
        {isMonthly && item.originalPrice && (
          <p className="text-[11px] text-ink-subtle line-through leading-none">
            ${item.originalPrice.toFixed(2)}{item.priceLabel}
          </p>
        )}
        <p className={`text-[14px] font-semibold tabular-nums leading-tight ${
          isMonthly && item.originalPrice ? 'text-accent' : 'text-ink'
        }`}>
          ${lineTotal.toFixed(2)}
          {item.priceLabel && (
            <span className="text-[11px] font-normal text-ink-subtle">{item.priceLabel}</span>
          )}
        </p>
      </div>
    </div>
  );
}
