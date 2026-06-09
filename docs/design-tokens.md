# Caloria — Design Tokens

> **Superseded.** Historical wireframe token tables. The canonical, theme-aware token system (greyscale **and** Caloria dark values) now lives in [`design-system.md`](./design-system.md), which wins on any conflict. Kept for reference to the original greyscale mapping.

> Quick-reference token tables for the wireframe system. All tokens map to **Tailwind CSS v3 defaults** — no `tailwind.config.js` extension is required. The **only** intentional arbitrary values are the two device safe-area insets. Companion files: [`design-system.md`](./design-system.md) (foundation), [`implementation-rules.md`](./implementation-rules.md) (rules).

## Color tokens (grayscale — 3-ink text ramp)

| Token | Tailwind | Role |
|---|---|---|
| `ink` | `neutral-900` | Primary/active text, filled buttons/pills, FAB (white text on fill) |
| `body` | `neutral-500` | Body copy, ingredient names, labels, unselected control text |
| `meta` | `neutral-400` | Subtitles, captions, eyebrows, placeholders, inactive nav |
| `border` | `neutral-200` | Card / input / unselected-pill borders |
| `divider` | `neutral-100` | In-card row separators |
| `surface` | `white` | Card surface |
| `page` | `neutral-50` | Page background behind cards |
| `image` | `neutral-200` | Solid image placeholder |
| `overlay` | `neutral-900/40` | Flat scrim over images |

> Three inks only — **`neutral-600` / `neutral-700` are not used for text.** No brand colors.

## Typography tokens

| Token | Tailwind | px |
|---|---|---|
| `size-xs` | `text-xs` | 12 |
| `size-sm` | `text-sm` | 14 |
| `size-base` | `text-base` | 16 |
| `size-2xl` | `text-2xl` | 24 |
| `size-3xl` | `text-3xl` | 30 *(hero value — estimated)* |

| Token | Tailwind |
|---|---|
| `weight-normal` | `font-normal` |
| `weight-medium` | `font-medium` |
| `weight-semibold` | `font-semibold` |
| `weight-bold` | `font-bold` |
| `family` | `font-sans` (UI Sans Serif) |
| `tracking` | `tracking-normal` (0%) |
| `leading` | Tailwind size defaults (no explicit `leading-*`) |

> `text-lg` / `text-xl` are not used.

## Spacing tokens

| Token | Tailwind | px | Use |
|---|---|---|---|
| `space-1` | `1` | 4 | inner icon gaps, bar height |
| `space-2` | `2` | 8 | chip/pill gaps, label → control |
| `space-3` | `3` | 12 | list gaps, compact padding |
| `space-4` | `4` | 16 | page padding, content-card padding, detail stacks |
| `space-6` | `6` | 24 | major section spacing |
| `space-24` | `24` | 96 | bottom scroll padding (clear nav) |

## Radius tokens

| Token | Tailwind | px | Use |
|---|---|---|---|
| `radius-card` | `rounded-2xl` | 16 | Cards, media cards |
| `radius-control` | `rounded-xl` | 12 | Inputs, buttons, tiles, thumbnails, stat boxes |
| `radius-sm` | `rounded-lg` | 8 | Small inner tiles (rare) |
| `radius-pill` | `rounded-full` | — | Pills, chips, FAB, avatars, circular buttons |

## Border tokens

| Token | Tailwind |
|---|---|
| `border-card` | `border border-neutral-200` |
| `border-divider` | `divide-y divide-neutral-100` (or `border-t border-neutral-100`) |
| `border-input` | `border border-neutral-200` |
| `border-nav` | `border-t border-neutral-200` |

## Elevation tokens

| Token | Tailwind |
|---|---|
| `elevation-card` | `shadow-sm` (+ card border) |
| `elevation-raised` | `shadow-lg` (FAB only) |
| `elevation-nav` | none — border only |

## Layout tokens

| Token | Tailwind |
|---|---|
| `safe-top` | `pt-[59px]` (exact device inset) |
| `safe-bottom` | `pb-[34px]` (exact device inset) |
| `page-x` | `px-4` |
| `page-top` | `pt-4` |
| `section-gap` | `space-y-6` |
| `list-gap` | `space-y-3` / `gap-3` |
| `detail-stack-gap` | `space-y-4` |
| `nav-height` | `h-16` |
| `content-bottom` | `pb-24` |

## Icon tokens

| Token | Tailwind | Use |
|---|---|---|
| `icon-nav` | `h-6 w-6` | Bottom-nav tabs |
| `icon-inline` | `h-5 w-5` | Search, chevrons, stat icons |
| `icon-small` | `h-4 w-4` | Mic, badge/meta, rating star |
| `icon-feature` | `h-8 w-8` | Quick-action tiles, hero glyphs |

> Library: **Heroicons v2** (`@heroicons/react`). Outline default; solid for active states only.

## Component dimension tokens

| Token | Tailwind |
|---|---|
| `card-pad-content` | `p-4` |
| `card-pad-compact` | `p-3` |
| `search-height` | `h-12` |
| `pill-height` | `h-9` (segmented) / `h-8` (chip) |
| `thumb` | `h-12 w-12` (list) / `h-[72px]`→use `rounded-xl` tile (recipe) |
| `icon-tile` | `h-12 w-12 rounded-xl` (action) / `h-10 w-10 rounded-xl` (ingredient) |
| `circular-button` | `h-10 w-10 rounded-full` (header) / `h-8 w-8 rounded-full` (inline action) |
| `stepper-button` | `h-9 w-9 rounded-full` |
| `fab` | `h-14 w-14 rounded-full` |
| `bar-track` | `h-1.5 rounded-full` |
| `badge` | `h-6 px-2.5 rounded-full` |
