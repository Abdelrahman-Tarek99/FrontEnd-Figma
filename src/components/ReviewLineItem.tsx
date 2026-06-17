import { Truck } from 'lucide-react';
import { useBuilderStore } from '../store/useBuilderStore';
import { QuantityStepper } from './QuantityStepper';
import type { ReviewLineItemProps } from '../types';

export function ReviewLineItem({ item, static: isStatic, customPrice }: ReviewLineItemProps) {
  const increment = useBuilderStore((s) => s.increment);
  const decrement = useBuilderStore((s) => s.decrement);

  const isMonthly = Boolean(item.priceLabel);
  const lineTotal = isMonthly ? item.unitPrice : item.unitPrice * item.quantity;
  const origLineTotal = item.originalPrice
    ? isMonthly
      ? item.originalPrice
      : item.originalPrice * item.quantity
    : undefined;

  const isFree = lineTotal === 0;

  return (
    <div className="flex items-center gap-2.5">
      {/* Thumbnail */}
      <div className="w-9 h-9 shrink-0 flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt="" aria-hidden="true" className="w-full h-full object-contain" />
        ) : item.productId === 'fast-shipping' ? (
          <Truck className="w-5 h-5 text-ink-subtle" />
        ) : null}
      </div>

      {/* Name + variant */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-ink leading-tight">{item.name}</p>
        {item.variantLabel && (
          <p className="text-[11px] text-ink-muted">{item.variantLabel}</p>
        )}
      </div>

      {/* Stepper — only for selectable equipment */}
      {!isMonthly && !isStatic && (
        <QuantityStepper
          quantity={item.quantity}
          onIncrement={() => increment(item.productId, item.variantId, item.stepId)}
          onDecrement={() => decrement(item.productId, item.variantId, item.stepId)}
          compact
        />
      )}

      {/* Price */}
      <div className="shrink-0 text-right min-w-14">
        {customPrice ?? (
          <>
            {origLineTotal !== undefined && (
              <p className="text-[11px] text-ink-muted line-through leading-none">
                ${origLineTotal.toFixed(2)}{item.priceLabel}
              </p>
            )}
            <p className={`text-[13px] font-semibold tabular-nums leading-tight ${
              isFree ? 'text-ok' : isMonthly && origLineTotal ? 'text-accent' : 'text-ink'
            }`}>
              {isFree ? 'FREE' : `$${lineTotal.toFixed(2)}`}
              {!isFree && item.priceLabel && (
                <span className="text-[11px] font-normal text-ink-subtle">{item.priceLabel}</span>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
