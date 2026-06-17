import {
  Camera, Video, Bell,
  Shield, ShieldCheck, ShieldPlus,
  DoorOpen, Activity, Zap, Flame, Wind, Droplets,
  Lock, Volume2, Hash, KeyRound, Check, Wifi, HardDrive,
  type LucideIcon,
} from 'lucide-react';
import { useProductCard } from '../hooks/useProductCard';
import { VariantSelector } from './VariantSelector';
import { QuantityStepper } from './QuantityStepper';
import type { ProductCardProps } from '../types';

const ICON_MAP: Record<string, LucideIcon> = {
  Camera, Video, Bell,
  Shield, ShieldCheck, ShieldPlus,
  DoorOpen, Activity, Zap, Flame, Wind, Droplets,
  Lock, Volume2, Hash, KeyRound, Wifi, HardDrive,
};

export function ProductCard({ product, step }: ProductCardProps) {
  const {
    activeVariantId,
    setActiveVariantId,
    quantity,
    isSelected,
    handleIncrement,
    handleDecrement,
    handlePlanSelect,
  } = useProductCard(product, step.id);

  const Icon = ICON_MAP[product.icon ?? ''] ?? Shield;
  const isSingle = step.selectionType === 'single';

  if (isSingle) {
    return (
      <div
        role="radio"
        aria-checked={isSelected}
        onClick={handlePlanSelect}
        className={`
          relative flex flex-col gap-3 rounded-xl bg-card p-4 cursor-pointer
          select-none transition-all border-2
          ${isSelected ? 'border-accent' : 'border-transparent ring-1 ring-stroke'}
        `}
      >
        {product.badge && (
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-0.5 text-[11px] font-semibold text-white">
            {product.badge}
          </span>
        )}

        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-accent/10' : 'bg-step-bg'}`}>
          <Icon className={`w-5 h-5 ${isSelected ? 'text-accent' : 'text-ink-subtle'}`} />
        </div>

        <div>
          <p className="text-[15px] font-semibold text-ink-body leading-tight">{product.name}</p>
          {product.originalPrice ? (
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-[13px] font-medium text-ink-price line-through">
                ${product.originalPrice.toFixed(2)}{product.priceLabel}
              </span>
              <span className="text-[14px] font-semibold text-accent">
                ${product.price.toFixed(2)}{product.priceLabel}
              </span>
            </div>
          ) : (
            <p className="mt-0.5 font-semibold text-accent text-[14px]">
              ${product.price.toFixed(2)}
              {product.priceLabel && <span className="text-[12px] font-normal text-ink-subtle">{product.priceLabel}</span>}
            </p>
          )}
          {product.description && (
            <p className="mt-1 text-[12px] leading-snug text-ink-body/75 font-medium">
              {product.description}
            </p>
          )}
        </div>

        {product.features && (
          <ul className="flex flex-col gap-1.5">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-1.5 text-[12px] text-ink-body/75">
                <Check className="mt-0.5 w-3 h-3 shrink-0 text-ok" />
                {f}
              </li>
            ))}
          </ul>
        )}

        {isSelected && (
          <span className="flex items-center gap-1 text-[12px] font-semibold text-accent">
            <Check className="w-3.5 h-3.5" /> Selected
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`
        flex flex-row rounded-xl bg-card
        border-2 transition-all overflow-hidden
        ${isSelected ? 'border-accent' : 'border-transparent ring-1 ring-stroke/60'}
      `}
    >
      {/* Image area — full-width strip on mobile/desktop, sidebar on tablet */}
      <div className="relative bg-canvas overflow-hidden flex items-center justify-center shrink-0 w-28 self-stretch">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-3"
          />
        ) : (
          <Icon className="w-14 h-14 text-ink-muted/40" />
        )}
        {product.discount && (
          <span className="absolute top-2 left-2 rounded-full bg-accent px-1.5 py-0.5 text-[12px] font-semibold text-white leading-none">
            Save {product.discount}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 p-3">
        <div>
          <p className="text-[15px] font-semibold text-ink-body leading-tight">
            {product.name}
          </p>
          {product.description && (
            <p className="mt-0.5 text-[12px] font-medium leading-snug text-ink-body/75">
              {product.description}
            </p>
          )}
        </div>

        {product.variants && product.variants.length > 0 && (
          <VariantSelector
            variants={product.variants}
            activeVariantId={activeVariantId!}
            onSelect={setActiveVariantId}
          />
        )}

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex flex-col leading-tight">
            {product.originalPrice && (
              <span className="text-[11px] text-ink-muted line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <p className="font-bold text-ink-price text-[14px]">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <QuantityStepper
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        </div>

      </div>
    </div>
  );
}
