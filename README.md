# Wyze Bundle Builder

A multi-step security system bundle builder built with React, matching the provided Figma design.

## Tech Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`) with custom design tokens from Figma
- **Zustand v5** with `persist` middleware for cart state
- **lucide-react** for fallback icons

## Getting Started

### Prerequisites

- Node.js 18+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

The `build` command runs TypeScript type-checking (`tsc -b`) then Vite's production bundler. Output goes to `dist/`.

---

## Project Structure

```
src/
  components/       # Pure UI components (AccordionStep, ProductCard, ReviewPanel, …)
  hooks/            # All business logic (useProductCard, useCartSummary, useReviewItems, …)
  store/
    slices/         # Zustand slices — accordionSlice, cartSlice
    useBuilderStore.ts
  data/
    products.json   # All step/product data (no backend required)
  types/
    index.ts        # Shared TypeScript interfaces
  styles/
    tokens.css      # Figma design tokens via @theme directive
public/
  images/           # Product images and variant thumbnails extracted from Figma
```

---

## Architecture Decisions

**No backend.** All product and step data lives in `src/data/products.json`. The task didn't require a backend, and a static JSON file makes the repo trivially runnable from a clean clone.

**Zustand over Context.** Cart and accordion state are global and need to survive step navigation. Zustand with `persist` gives a clean slice pattern and free localStorage persistence without boilerplate.

**Custom hooks for all logic.** Every component is a pure render function — logic (selection, incrementing quantities, review calculations) lives in hooks (`useProductCard`, `useCartSummary`, `useReviewItems`, etc.). This keeps components readable and logic independently testable.

**Tailwind v4 `@theme`.** Design tokens (colors, radii, spacing) were extracted directly from the Figma file via the REST API and dropped into `src/styles/tokens.css` as CSS custom properties. This means Tailwind classes like `bg-accent`, `text-ink-muted`, `rounded-xl` map 1:1 to Figma values.

**Images from Figma API.** All product photos and variant thumbnails were exported from the Figma file at 2× scale using the `/v1/images` endpoint and stored in `public/images/`.

---

## Tradeoffs & Known Limitations

- **No backend / no checkout.** The Checkout button is a UI stub. A real implementation would POST the cart to an order API.
- **Font fallback.** Figma uses Gilroy (commercial license). The build uses Plus Jakarta Sans from Google Fonts as a free substitute — very close weight and feel.
- **Variant image quality.** Variant chip thumbnails (White / Grey / Black) are sourced from Figma image fills, which are small originals. They display correctly at 20 px but would look soft if enlarged.
- **No tests.** Unit and integration tests were out of scope for this deliverable but the hook-per-feature structure makes them straightforward to add with React Testing Library.
- **Sensors without product photos.** Entry Sensor, Climate Sensor, Leak Sensor, Glass Break Sensor, and Smoke & CO Alarm don't have dedicated product images in the Figma file — they fall back to lucide icons in the product cards.
