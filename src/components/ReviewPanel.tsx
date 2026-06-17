import { useMemo } from 'react';
import { useCartSummary } from '../hooks/useCartSummary';
import { useSaveSystem } from '../hooks/useSaveSystem';
import { ReviewLineItem } from './ReviewLineItem';
import type { ReviewItemData } from '../hooks/useReviewItems';

const STEP_ORDER = ['cameras', 'plan', 'sensors', 'extra-protection'];

const GROUP_LABELS: Record<string, string> = {
  cameras: 'Cameras',
  sensors: 'Sensors',
  'extra-protection': 'accessories',
  plan: 'plan',
};

export function ReviewPanel() {
  const { items, equipmentTotal, monthlyItem, isEmpty } = useCartSummary();
  const { saved, handleSave } = useSaveSystem();

  const groups = useMemo(() => {
    const map = new Map<string, ReviewItemData[]>();
    for (const stepId of STEP_ORDER) {
      const stepItems = items.filter((i) => i.stepId === stepId);
      if (stepItems.length > 0) map.set(stepId, stepItems);
    }
    return Array.from(map.entries());
  }, [items]);

  const savings = useMemo(
    () =>
      items.reduce((sum, i) => {
        if (i.originalPrice && i.originalPrice > i.unitPrice) {
          return sum + (i.originalPrice - i.unitPrice);
        }
        return sum;
      }, 0),
    [items],
  );

  return (
    <div className="bg-step-bg rounded-xl p-5 flex flex-col gap-3">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[22px] font-semibold text-ink-body leading-tight">
          Your security system
        </h2>
        <p className="text-[14px] font-medium text-ink-body/75">
          Review your personalized protection system
        </p>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div className="py-8 text-center">
          <p className="text-[14px] text-ink-subtle">
            Add cameras, sensors, and more from the steps on the left.
          </p>
        </div>
      )}

      {/* Grouped line items */}
      {groups.map(([stepId, groupItems]) => (
        <div key={stepId} className="flex flex-col gap-2 border-t border-stroke pt-3.75">
          <span className="text-[12px] text-ink-muted font-normal uppercase tracking-wide">
            {GROUP_LABELS[stepId] ?? stepId}
          </span>
          <div className="flex flex-col gap-2.5">
            {groupItems.map((item) => (
              <ReviewLineItem
                key={`${item.productId}:${item.variantId ?? 'default'}`}
                item={item}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Totals + CTA */}
      {!isEmpty && (
        <div className="flex flex-col gap-2 border-t border-stroke pt-3">
          {equipmentTotal > 0 && (
            <div className="flex justify-between text-[13px]">
              <span className="text-ink-subtle">Equipment subtotal</span>
              <span className="font-semibold text-ink">${equipmentTotal.toFixed(2)}</span>
            </div>
          )}
          {monthlyItem && (
            <div className="flex justify-between text-[13px]">
              <span className="text-ink-subtle">Monitoring</span>
              <span className="font-semibold text-ink">
                ${monthlyItem.unitPrice.toFixed(2)}
                <span className="text-[11px] font-normal text-ink-subtle">/mo</span>
              </span>
            </div>
          )}

          {savings > 0 && (
            <p className="text-[12px] font-semibold text-ok">
              Congrats! You're saving ${savings.toFixed(2)}/mo on your plan
            </p>
          )}

          <button
            type="button"
            className="mt-1 w-full rounded-sm bg-accent py-3 px-4 text-[17px] font-bold text-white transition-colors hover:bg-accent-hover active:scale-[.98]"
          >
            Checkout
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="text-center text-[14px] italic text-ink-label py-1 transition-colors hover:text-accent"
          >
            {saved ? 'System saved!' : 'Save my system for later'}
          </button>
        </div>
      )}
    </div>
  );
}
