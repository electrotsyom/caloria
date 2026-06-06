# Caloria — Wireframe Design System

> **Purpose:** the shared foundation for faithfully recreating the 4 source screenshots as **high-fidelity grayscale wireframes** in React + Tailwind CSS v3.
> **This is NOT** a production design system, a redesign, or a brand system. The single goal is **faithful screenshot recreation**.
> **Source of truth for visuals = the screenshots.** Source of truth for values = [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md). This file consolidates that inventory into a usable foundation; the companion files are [`design-tokens.md`](./design-tokens.md) (the raw token tables) and [`implementation-rules.md`](./implementation-rules.md) (the rules future wireframes must follow).

## Principles (non-negotiable)

- Preserve screenshot **structure, hierarchy, density, navigation, and layout relationships**.
- **Grayscale only** — no brand colors are introduced.
- **Tailwind defaults whenever possible** — the only intentional arbitrary values in the entire system are the two device safe-area insets (`pt-[59px]` / `pb-[34px]`).
- **Consistency over pixel-perfect measurements.** Where the inventory marks a value *estimated*, use the mapped Tailwind step — do not invent a replacement.
- Target frame width: **375px**. No `tailwind.config.js` extension is required.

---

## 1. Typography

Font family is **`font-sans`** (UI Sans Serif — Tailwind's default `font-sans` stack) everywhere. Letter-spacing is **`tracking-normal`** (0%) everywhere, including the uppercase eyebrow. Color always follows the 3-ink ramp (§5): primary `neutral-900` · body `neutral-500` · meta `neutral-400`.

### Type scale (the only sizes used)

| Tailwind size | px | Where it appears |
|---|---|---|
| `text-xs` | 12 | eyebrows, captions, meta, macro/nav/badge labels |
| `text-sm` | 14 | body, card titles, links, list kcal, inline values, tab labels |
| `text-base` | 16 | section headers, stat-box values |
| `text-2xl` | 24 | screen / page titles |
| `text-3xl` | 30 | hero kcal value *(estimated — could be `text-2xl`)* |

> `text-lg` and `text-xl` are **not** observed — do not invent them.

### Font weights & line heights

- Weights used: `font-normal` · `font-medium` · `font-semibold` · `font-bold`. Hierarchy is expressed through **weight**, not hue.
- Line height: use Tailwind's **default leading** for each size. Do not set explicit `leading-*` utilities — none were derived from the screenshots.

### Named styles (usage guidelines)

| Style | Role | Tailwind classes |
|---|---|---|
| **Eyebrow / overline** | `LOG FOOD`, `DISCOVER`, `FEATURED` | `text-xs font-semibold uppercase text-neutral-400` |
| **Screen / page title** | "What did you eat?", "Recipes" | `text-2xl font-bold text-neutral-900` |
| **Section title** | "Meal Time", "Popular Foods" | `text-base font-semibold text-neutral-900` |
| **Card title / inline value** | "Greek Yogurt", "31g", "130 kcal" | `text-sm font-semibold text-neutral-900` |
| **Action / link / tab** | "See all", "Today", tab labels | `text-sm font-medium` (active `text-neutral-900`, inactive `text-neutral-400`) |
| **Body** | ingredient names, row labels | `text-sm text-neutral-500` |
| **Caption / meta** | "1 cup · 150g", "per 100g serving" | `text-xs text-neutral-400` |
| **Label** | macro labels, nav labels, badge text | `text-xs` (macro `font-medium text-neutral-500`; nav `font-medium`; badge `font-semibold`) |
| **Hero value** | "165 kcal", "640 kcal" | `text-3xl font-bold text-neutral-900` *(estimated)* |
| **Stat-box value** | "31g" in nutrition stat boxes | `text-base font-bold text-neutral-900` |

---

## 2. Spacing

Use Tailwind spacing tokens only — **no arbitrary values** (except the two safe-area insets).

### Spacing scale (used subset)

| Token | px | Primary use |
|---|---|---|
| `1` | 4 | inner icon gaps, thin bar heights |
| `2` | 8 | chip/pill gaps, label → control |
| `3` | 12 | list-card gaps, compact card padding, 3-up action-card gap |
| `4` | 16 | page padding, content-card padding, detail card stacks |
| `6` | 24 | between major sections |
| `24` | 96 | bottom scroll padding to clear the nav |

### Layout spacing

| Between | Tailwind |
|---|---|
| Major sections | `space-y-6` |
| Section header → its content | `mt-3` |
| Stacked list cards (food / recipe rows) | `space-y-3` / `gap-3` |
| Cards in a detail stack (Food Details) | `space-y-4` |

### Component spacing

| Between | Tailwind |
|---|---|
| Chips in a chip cloud | `gap-2` (both axes) |
| Pills in a segmented row | `gap-2` |
| Quick-action cards (3-up) | `gap-3` |
| Form label → control | `mt-2` |
| Divided rows inside a card | `py-3` per row |

---

## 3. Radius

Two radii do ~90% of the work; a third covers all circular shapes.

| Tailwind | px | Use |
|---|---|---|
| `rounded-2xl` | 16 | **Cards** — food row, recipe row, action card, media card |
| `rounded-xl` | 12 | **Controls/tiles** — search field, buttons, stat boxes, icon tiles, thumbnails |
| `rounded-lg` | 8 | Small inner tiles **only if needed** (rare) |
| `rounded-full` | — | Pills, chips, FAB, avatars, circular icon buttons |

> Prefer `rounded-2xl` for cards and `rounded-xl` for inputs/controls. No custom radius.

---

## 4. Borders

- **Card border:** `border border-neutral-200` (hairline).
- **Divider (in-card row separators):** `divide-y divide-neutral-100` (canonical; per-row `border-t border-neutral-100` is an equivalent choice).
- **Input / unselected pill border:** `border border-neutral-200`.
- **Bottom nav & sticky action bar:** top border only — `border-t border-neutral-200`.

---

## 5. Elevation

Keep elevation **flat and subtle** — prefer borders over shadows.

| Element | Treatment |
|---|---|
| Default card | `border border-neutral-200` + `shadow-sm` |
| Bottom nav / sticky action bar | `border-t border-neutral-200` (no shadow) |
| FAB (Add) | `shadow-lg` (the only raised element; no ring) |
| Image overlay (legible text) | flat scrim `bg-neutral-900/40` (no gradient) |

> Never use a shadow heavier than `shadow-sm` on inline cards. No arbitrary shadow values.

---

## 6. Grayscale Palette

**No brand colors.** Exactly **three text inks** — do not introduce `neutral-600`/`neutral-700` for text.

| Role | Token |
|---|---|
| Ink — primary/active text, filled buttons/pills, FAB | `neutral-900` (white text on fill) |
| Body — body copy, ingredient names, labels, unselected control text | `neutral-500` |
| Meta — subtitles, captions, eyebrows, placeholders, inactive nav | `neutral-400` |
| Card border | `neutral-200` |
| Divider | `neutral-100` |
| Surface | `white` |
| Page background | `neutral-50` |
| Image placeholder | `neutral-200` (solid gray box) |
| Image overlay | `neutral-900/40` (flat scrim) |

Emphasis (kcal numbers, "See all", links) that was green in the screenshots becomes `neutral-900 font-semibold` — emphasis via weight, not hue. Category/emoji color blobs flatten to `bg-neutral-100 text-neutral-500`.

---

## 7. Icons

**Heroicons v2 only** — `@heroicons/react` (installed, v2.2.0). No other icon library, no custom SVGs.

- **Outline by default:** `@heroicons/react/24/outline`.
- **Solid only for active/selected states:** `@heroicons/react/24/solid` (active nav tab, favorited heart, filled rating star).

### Sizing

| Role | Tailwind | Examples |
|---|---|---|
| Navigation icons | `h-6 w-6` | Bottom-nav tabs |
| Inline icons | `h-5 w-5` | Search magnifier, chevrons, stat icons |
| Small supporting | `h-4 w-4` | Mic, badge/meta icons, rating star |
| Feature icons | `h-8 w-8` | Quick-action tiles, hero glyphs |

Icon color follows the text ramp: default `neutral-400`/`neutral-500`; active `neutral-900` or white-on-dark.

### Name mappings (see inventory §Iconography for the full table)

`HomeIcon` · `BookOpenIcon` (Recipes) · `PlusCircleIcon` (Add concept) · `ChartBarIcon` (Reports) · `UserCircleIcon` (Profile) · `MagnifyingGlassIcon` · `MicrophoneIcon` · `ChevronLeftIcon` (back) · `ViewfinderCircleIcon` (scan) · `CameraIcon` (snap) · `PencilSquareIcon` (manual) · `AdjustmentsHorizontalIcon` (filter) · `ShareIcon` · `HeartIcon` · `StarIcon` · `FireIcon` (kcal) · `ClockIcon` (time) · `PlusIcon` / `MinusIcon` (steppers).

> Steppers and the inline quick-add button render `PlusIcon`/`MinusIcon` glyphs (the button supplies the circle). The Add **action** (nav FAB) maps to the `PlusCircleIcon` concept.

---

## 8. Layout Rules

All estimates are at the **375px** target frame.

| Region | Value | Tailwind |
|---|---|---|
| Top safe area (status bar / island) | 59pt (exact) | `pt-[59px]` |
| Bottom safe area (home indicator) | 34pt (exact) | `pb-[34px]` |
| Header top padding (below safe area) | ~12–16px | `pt-3`–`pt-4` |
| Header → first content block | ~16–20px | `mt-4`–`mt-5` |
| Horizontal page padding | 16px | `px-4` |
| Vertical page padding (scroll top) | 16px | `pt-4` |
| Section spacing | 24px | `space-y-6` |
| List/card spacing | 12px | `space-y-3` / `gap-3` |
| Bottom nav height | ~64px | `h-16` (sits above the 34pt inset) |
| Content bottom padding (clear nav) | ~80–96px | `pb-24` |
| Full-bleed media (heroes) | edge-to-edge | `-mx-4` in a padded container, or an unpadded section |

### Card padding rule (canonical)

- **Content card** (full-width, multi-element): `p-4` — Serving & Quantity, Nutrition Summary, Impact-on-Goal.
- **List row / compact tile:** `p-3` — food row, recipe row, action card, media card, stat box.

> Do **not** apply uniform padding to all cards.

---

## 9. Component Foundations

> **No reusable React components are created yet.** These are the rules future components must follow.

- **Cards** — `rounded-2xl border border-neutral-200 bg-white shadow-sm`; padding `p-4` (content) or `p-3` (compact). White surface on a `neutral-50` page.
- **List rows** — `flex items-center gap-3`: leading thumbnail/icon tile (`h-12 w-12 rounded-xl`, image = `bg-neutral-200`) + title/subtitle stack (`min-w-0 flex-1`) + trailing value + optional trailing circular action (`h-8 w-8 rounded-full bg-neutral-100`).
- **Search inputs** — `h-12 rounded-xl border border-neutral-200 bg-white px-4`, leading `MagnifyingGlassIcon` (`h-5 w-5 text-neutral-400`) + input (`placeholder:text-neutral-400`) + trailing mic in a soft circle.
- **Pills / chips / tabs** — `rounded-full`, single-select. **Selected** = `bg-neutral-900 text-white`; **unselected** = `border border-neutral-200 text-neutral-500`. Segmented pills `h-9 px-4`; chips `h-8 px-3`. In-page tabs share the active/inactive ink rule (active indicator style — pill vs underline — is an open verification item).
- **Navigation items** — bottom nav is a fixed 5-item bar (`Home · Recipes · Add · Reports · Profile`) with a raised center **Add FAB** (`h-14 w-14 rounded-full bg-neutral-900 text-white shadow-lg -translate-y-1/2`). Each tab = stacked `h-6 w-6` icon + `text-xs` label; active = `neutral-900` + solid icon, inactive = `neutral-400` + outline icon. Present on Home / Food Details / Recipes; **absent** on Recipe Detail.
- **Steppers** — `[−] [value] [+]`, minus ghost (`border border-neutral-200`), plus filled (`bg-neutral-900 text-white`), buttons `h-9 w-9 rounded-full`, value `text-sm font-semibold`. *(Button radius is an open verification item.)*
- **Badges** — `rounded-full h-6 px-2.5 text-xs font-semibold`; on-image `bg-white text-neutral-900`, solid `bg-neutral-900 text-white`.
- **Bars (macro / progress)** — track `h-1.5 rounded-full bg-neutral-200`, fill `bg-neutral-900` with a **placeholder** proportional width.

See [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md) §Phase 4 for full per-component anatomy and reference markup.
