# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site + online menu for "Dulce Tentación", a fictional Mexican pastry shop/café. Vue 3 + Vite + TypeScript, Tailwind CSS v4, Pinia, Vue Router. No backend: all content comes from JSON files in `src/data/`. UI copy, data fields and many identifiers are in Spanish (`productos`, `nombre`, `precio`, `favoritos`, …) — keep that convention.

## Commands

Node `^22.18.0 || >=24.12.0`.

```sh
npm run dev            # Vite dev server
npm run build          # type-check (vue-tsc --build) + vite build, in parallel
npm run type-check     # vue-tsc only
npm run lint           # oxlint --fix, then eslint --fix (both auto-fix)
npm run format         # prettier on src/ (no semicolons, single quotes, width 100)
npm run test:unit      # vitest (jsdom), watch mode; single run: npx vitest run; one file: npx vitest run src/utils/__tests__/horario.spec.ts
npm run test:e2e       # playwright (e2e/app.spec.ts)
```

Unit tests live in `__tests__/` folders next to the code (that glob is what `tsconfig.vitest.json` type-checks). Components using `useInView` need `IntersectionObserver` stubbed (jsdom lacks it); see `ProductCard.spec.ts`. Keep testable logic in `src/utils/` (e.g. search lives in `utils/buscar.ts`, not in the view).

CI (`.github/workflows/ci.yml`) runs lint without `--fix`, type-check, unit tests, build and Chromium e2e on every push to `main` and on PRs.

E2E notes: locally Playwright runs **headed** against the dev server on :5173. To run headless against a production build: `npm run build && CI=1 npx playwright test --project=chromium --reporter=list` (CI mode uses `vite preview` on :4173).

## Architecture

- **Content is data-driven from `src/data/*.json`**, imported directly into components (no fetch layer):
  - `productos.json` is the product catalog (shape: `Producto` in `src/types/index.ts`). `isTop` → home `TopProducts`, `inGallery` → home `MiniGallery`. `categoria`/`subcategoria` keys must match the hardcoded `categorias` list in `src/views/ProductosView.vue`. `slug` is the `/productos/:slug` param. `precio: 0` renders as "Por cotizar" (`src/utils/formatPrecio.ts`).
  - Many product images referenced in the JSON don't exist yet; `ProductImage.vue` renders a gradient placeholder on missing/failed images, so new photos only need to be dropped into `public/img/products/` with the referenced name.
  - `company.json`: name, slogan, address, contact, map coords, social links and structured `horario` (weekday numbers, `abre`/`cierra` or `null` = closed). `src/utils/horario.ts` derives "open now" from it; used by `OpenBadge.vue` in Contact and Footer.
  - `historia.json` feeds the `/historia` timeline. `faq.json`, `reviews.json` feed home sections.
- **Routing** (`src/router/index.ts`): `/`, `/productos`, `/productos/:slug`, `/historia`, catch-all 404 (`NotFoundView`, also reused by the detail view for unknown slugs). Page titles come from `meta.title` via `afterEach`; the detail view sets its own title.
  - `App.vue` wraps `RouterView` in a keyed page `Transition`; `scrollBehavior` delays 150ms to match it, restores `savedPosition` on back, and returns `false` for same-path navigations (query changes).
- **Menu page** keeps search (`q`) and favorites filter (`fav=1`) in the URL query, synced both ways with `router.replace`. Search is accent-insensitive.
- **Animations**: `useInView` (`src/composables/useInView.ts`, IntersectionObserver, fires once) drives scroll reveals via `target`/`isVisible`. In `ProductCard`, an outer wrapper handles the (staggered) reveal and the inner `article` handles hover, so `transition-delay` doesn't affect hover. A global `prefers-reduced-motion` override lives in `src/assets/main.css`; use `scrollToId` (`src/utils/scrollToId.ts`) for smooth scrolling so it respects it too.
- **State**: `stores/favoritos.ts` persists favorite ids to `localStorage`; toggle via `FavoriteButton.vue`.
- **Styling**: Tailwind v4 via `@tailwindcss/vite`; theme tokens (`cream`, `chocolate-dark`, `chocolate-medium`, `rose`, `toffee`, `font-display`, `font-body`) are defined in `@theme` in `src/assets/main.css`. Use these tokens rather than raw colors.
- `@` aliases `src/` (both `@/...` and relative imports are used).
