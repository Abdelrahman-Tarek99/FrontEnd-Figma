import { useAccordion } from "../hooks/useAccordion";
import { useBuilderStore } from "../store/useBuilderStore";
import { ProductCard } from "./ProductCard";
import type { AccordionStepProps } from "../types";

const STEP_ICON_SRC: Record<string, string> = {
  cameras: "/images/livestream.svg",
  plan: "/images/chosse-plan.svg",
  sensors: "/images/sensor.svg",
  "extra-protection": "/images/extra-proection.svg",
};

function TriangleChevron({ up }: { up: boolean }) {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="#4E2FD2"
      className={`shrink-0 transition-transform duration-200 ${up ? "" : "rotate-180"}`}
    >
      <polygon points="5,0 10,7 0,7" />
    </svg>
  );
}

export function AccordionStep({ step, totalSteps, nextStepId }: AccordionStepProps) {
  const { isOpen, selectedCount, toggle } = useAccordion(step.id);
  const toggleStep = useBuilderStore((s) => s.toggleStep);
  const iconSrc = STEP_ICON_SRC[step.id];

  return (
    <div
      className={`pt-3.75 flex flex-col gap-1.25 ${isOpen ? "bg-step-bg" : "bg-canvas border-b border-stroke"}`}
    >
      {/* Step N of N label */}
      <div className="px-3.75 pb-3.75">
        <span className="text-[12px] font-medium text-ink-label leading-none">
          Step {step.step} of {totalSteps}
        </span>
      </div>

      {/* Content box */}
      <div className="flex flex-col">
        {/* Header */}
        <button
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          className="flex w-full items-center gap-2 px-3.75 py-5 text-left"
        >
          <div className="w-6.5 h-6.5 rounded-full bg-card flex items-center justify-center shrink-0">
            {iconSrc && (
              <img
                src={iconSrc}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
            )}
          </div>

          <span className="flex-1 text-[22px] font-semibold text-ink leading-tight">
            {step.title}
          </span>

          {selectedCount > 0 && (
            <span className="text-[14px] font-medium text-accent shrink-0">
              {selectedCount} selected
            </span>
          )}

          <TriangleChevron up={isOpen} />
        </button>

        {/* Expandable content */}
        {isOpen && (
          <div className="px-3.75 pb-5 flex flex-col gap-3.75">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {step.products.map((product) => (
                <ProductCard key={product.id} product={product} step={step} />
              ))}
            </div>

            {step.nextLabel && nextStepId && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => toggleStep(nextStepId)}
                  className="border border-accent text-accent rounded-lg py-1.25 px-6 text-[18px] font-semibold transition-colors hover:bg-accent hover:text-white"
                >
                  Next: {step.nextLabel}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
