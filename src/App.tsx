import rawData from './data/products.json';
import type { StepData } from './types';
import { AccordionStep } from './components/AccordionStep';
import { ReviewPanel } from './components/ReviewPanel';

const steps = (rawData as { steps: StepData[] }).steps;

export default function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <main className="mx-auto max-w-350 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">

          {/* LEFT — accordion builder */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {steps.map((step, i) => (
              <AccordionStep
                key={step.id}
                step={step}
                totalSteps={steps.length}
                nextStepId={steps[i + 1]?.id}
              />
            ))}
          </div>

          {/* RIGHT — sticky review panel */}
          <div className="w-full lg:w-97.5 lg:shrink-0 lg:sticky lg:top-6">
            <ReviewPanel />
          </div>

        </div>
      </main>
    </div>
  );
}
