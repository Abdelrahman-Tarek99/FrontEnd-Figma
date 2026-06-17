import rawData from '../data/products.json';
import type { StepData } from '../types';

export const stepsData = (rawData as { steps: StepData[] }).steps;

export const STEP_IDS = ['cameras', 'plan', 'sensors', 'extra-protection'] as const;

export const STEP_ORDER: Record<string, number> = {
  cameras: 0,
  plan: 1,
  sensors: 2,
  'extra-protection': 3,
};

export const GROUP_LABELS: Record<string, string> = {
  cameras: 'Cameras',
  plan: 'Plan',
  sensors: 'Sensors',
  'extra-protection': 'Accessories',
};

export const STEP_ICON_SRC: Record<string, string> = {
  cameras: '/images/livestream.svg',
  plan: '/images/chosse-plan.svg',
  sensors: '/images/sensor.svg',
  'extra-protection': '/images/extra-proection.svg',
};
