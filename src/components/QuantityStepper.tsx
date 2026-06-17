import { Minus, Plus } from 'lucide-react';
import type { QuantityStepperProps } from '../types';

export function QuantityStepper({ quantity, onIncrement, onDecrement, compact = false }: QuantityStepperProps) {
  const size = compact ? 'h-8 w-8' : 'h-[35px] w-[35px]';
  const iconSize = compact ? 'w-3 h-3' : 'w-3.5 h-3.5';
  const numW = compact ? 'w-6' : 'w-8';
  const textSz = compact ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center rounded-sm border border-stroke overflow-hidden">
      <button
        type="button"
        onClick={onDecrement}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className={`${size} flex items-center justify-center border-r border-stroke text-ink-subtle transition-colors hover:bg-step-bg disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <Minus className={iconSize} />
      </button>

      <span className={`${numW} text-center ${textSz} font-semibold text-ink select-none tabular-nums`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        aria-label="Increase quantity"
        className={`${size} flex items-center justify-center border-l border-stroke text-ink-subtle transition-colors hover:bg-step-bg`}
      >
        <Plus className={iconSize} />
      </button>
    </div>
  );
}
