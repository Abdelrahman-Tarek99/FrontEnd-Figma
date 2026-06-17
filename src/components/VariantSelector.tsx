import type { Variant } from '../types';

interface Props {
  variants: Variant[];
  activeVariantId: string;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, activeVariantId, onSelect }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {variants.map((v) => {
        const isActive = v.id === activeVariantId;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => onSelect(v.id)}
            aria-pressed={isActive}
            className={`
              inline-flex items-center gap-1.25
              h-[26px] pl-0.75 pr-1.5 rounded-xs text-[12px] font-medium
              border transition-all leading-none
              ${isActive
                ? 'border-ok/80 text-ok'
                : 'border-stroke-light text-ink-subtle hover:border-stroke'
              }
            `}
            style={isActive ? { background: 'rgba(29,240,187,0.04)' } : undefined}
          >
            {v.variantImage && (
              <img
                src={v.variantImage}
                alt=""
                aria-hidden="true"
                className="w-5 h-5 object-contain rounded-xs shrink-0"
              />
            )}
            {v.label}
          </button>
        );
      })}
    </div>
  );
}
