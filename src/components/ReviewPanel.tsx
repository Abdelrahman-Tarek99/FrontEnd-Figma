import { useMemo } from 'react';
import { useCartSummary } from '../hooks/useCartSummary';
import { useSaveSystem } from '../hooks/useSaveSystem';
import { ReviewLineItem } from './ReviewLineItem';
import { GROUP_LABELS, FAST_SHIPPING_ITEM, STEP_IDS } from '../constants';
import type { ReviewItemData } from '../types';

export function ReviewPanel() {
  const { items, equipmentTotal, monthlyItem, isEmpty } = useCartSummary();
  const { saved, handleSave } = useSaveSystem();

  const groups = useMemo(() => {
    const map = new Map<string, ReviewItemData[]>();
    for (const stepId of STEP_IDS) {
      const stepItems = items.filter((i) => i.stepId === stepId);
      if (stepId === 'plan' && stepItems.length > 0) {
        map.set(stepId, [...stepItems, FAST_SHIPPING_ITEM]);
      } else if (stepItems.length > 0) {
        map.set(stepId, stepItems);
      }
    }
    return Array.from(map.entries());
  }, [items]);

  const equipmentOriginalTotal = useMemo(
    () =>
      items
        .filter((i) => !i.priceLabel)
        .reduce((sum, i) => {
          const orig = i.originalPrice ?? i.unitPrice;
          return sum + orig * i.quantity;
        }, 0),
    [items],
  );

  const totalSavings = useMemo(() => {
    const equipSavings = equipmentOriginalTotal - equipmentTotal;
    const shippingSavings = groups.some(([id]) => id === 'plan') ? 5.99 : 0;
    return equipSavings + shippingSavings;
  }, [equipmentOriginalTotal, equipmentTotal, groups]);

  const hasMonthly = Boolean(monthlyItem);

  return (
    <div className="bg-step-bg rounded-xl flex flex-col">
      {/* REVIEW label */}
      <p className="px-5 pt-5 text-[11px] font-semibold tracking-widest text-ink-muted uppercase">
        Review
      </p>

      {/* Header */}
      <div className="px-5 pt-1 pb-4 flex flex-col gap-1">
        <h2 className="text-[22px] font-semibold text-ink-body leading-tight">
          Your security system
        </h2>
        <p className="text-[13px] text-ink-body/70 leading-snug">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="px-5 pb-8 text-center">
          <p className="text-[14px] text-ink-subtle">
            Add cameras, sensors, and more from the steps on the left.
          </p>
        </div>
      )}

      {/* Grouped line items */}
      {groups.map(([stepId, groupItems]) => (
        <div key={stepId} className="flex flex-col gap-2 border-t border-stroke px-5 py-3.5">
          <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-widest">
            {GROUP_LABELS[stepId] ?? stepId}
          </span>
          <div className="flex flex-col gap-3">
            {groupItems.map((item) => (
              <ReviewLineItem
                key={`${item.productId}:${item.variantId ?? 'default'}`}
                item={item}
                static={item.productId === 'fast-shipping'}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Totals + CTA */}
      {!isEmpty && (
        <div className="border-t border-stroke px-5 pt-4 pb-5 flex flex-col gap-3">
          {/* Badge + pricing row */}
          <div className="flex items-center gap-3">
            <img
              src="/images/Satisfaction Badge.svg"
              alt="100% Satisfaction Guarantee"
              className="w-14 h-14 shrink-0"
            />
            <div className="flex flex-col gap-0.5">
              {hasMonthly && monthlyItem && (
                <p className="text-[12px] text-ink-subtle">
                  as low as{' '}
                  <span className="font-semibold text-ink">
                    ${monthlyItem.unitPrice.toFixed(2)}/mo
                  </span>
                </p>
              )}
              <div className="flex items-baseline gap-2">
                {equipmentOriginalTotal > equipmentTotal && (
                  <span className="text-[13px] text-ink-muted line-through">
                    ${equipmentOriginalTotal.toFixed(2)}
                  </span>
                )}
                <span className="text-[22px] font-bold text-ink-body">
                  ${equipmentTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Savings banner */}
          {totalSavings > 0.01 && (
            <p className="text-[13px] font-semibold text-ok">
              Congrats! You&apos;re saving ${totalSavings.toFixed(2)} on your security bundle!
            </p>
          )}

          <button
            type="button"
            className="w-full rounded-sm bg-accent py-3 px-4 text-[17px] font-bold text-white transition-colors hover:bg-accent-hover active:scale-[.98]"
          >
            Checkout
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="text-center text-[14px] italic underline text-ink-label py-1 transition-colors hover:text-accent"
          >
            {saved ? 'System saved!' : 'Save my system for later'}
          </button>
        </div>
      )}
    </div>
  );
}
