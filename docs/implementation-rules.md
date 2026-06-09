# Caloria — Implementation Rules

> **Scope note (reconciled).** These rules govern the **greyscale wireframe baseline** (`/wireframe/*`) — the faithful screenshot recreation. The shipped **Caloria** product (`/caloria/*`) layers a dark "Cosmic · Linear" theme (near-black surfaces + a single amber accent + hairline borders + glass elevation) on top of these same components via `src/themes/caloria.css`. That theme is **color/elevation only** and is expressed entirely through the tokens in [`design-system.md`](./design-system.md) — it does not change structure, size, type, or icons. So when a rule below says "grayscale only / no brand color," read it as: *the components and the wireframe stay greyscale; the Caloria accent and dark surfaces are introduced solely by the token theme, never hard-coded in a component or screen.* On any conflict, [`design-system.md`](./design-system.md) is canonical.

> Rules every future wireframe must follow to stay consistent and faithful to the screenshots. Read alongside [`design-system.md`](./design-system.md) (foundation, canonical tokens). The ultimate source of truth for the wireframe is the screenshots and [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md).

## Goal

Faithful **screenshot recreation** as grayscale wireframes. **Not** production code, **not** a redesign, **not** a brand system, **not** a UX improvement.

---

## Must

1. **Preserve the screenshot.** Keep its structure, hierarchy, density, navigation patterns, and layout relationships. The wireframe must read as the same screen.
2. **Use the 375px frame.** All layout is built for a 375px-wide device frame.
3. **Use Tailwind v3 defaults.** Every utility comes from the default theme. The only allowed arbitrary values are the two safe-area insets: `pt-[59px]` and `pb-[34px]`.
4. **Use the 3-ink text ramp only:** `neutral-900` (primary) · `neutral-500` (body) · `neutral-400` (meta). Express emphasis with **weight**, not color.
5. **Use only the observed type sizes:** `text-xs`, `text-sm`, `text-base`, `text-2xl`, `text-3xl`. Always `font-sans` + `tracking-normal`.
6. **Use the card recipe:** `rounded-2xl border border-neutral-200 bg-white shadow-sm`, with `p-4` for content cards and `p-3` for compact rows/tiles.
7. **Use the radius system:** `rounded-2xl` cards, `rounded-xl` controls/tiles, `rounded-full` pills/circles.
8. **Prefer borders over shadows.** Cards get `border + shadow-sm`. Only the FAB is raised (`shadow-lg`). Nav/sticky bars use `border-t` only.
9. **Use Heroicons v2 exclusively** (`@heroicons/react`). Outline by default; solid only for active/selected states. Follow the sizing scale (`h-6`/`h-5`/`h-4`/`h-8`).
10. **Use grayscale placeholders for media:** solid `bg-neutral-200` boxes for images; flat `bg-neutral-900/40` scrim where text overlays an image.
11. **Respect the spacing rhythm:** `px-4` page padding, `space-y-6` between sections, `space-y-3`/`gap-3` between list cards, `gap-2` for chips/pills.
12. **Keep the navigation model:** fixed 5-item bottom nav (`Home · Recipes · Add · Reports · Profile`) with the raised center Add FAB — present on Home / Food Details / Recipes, **absent** on Recipe Detail.

---

## Must Not

1. **Do not introduce brand colors** or any hue. Grayscale only.
2. **Do not use `neutral-600` or `neutral-700` for text.** Three inks only.
3. **Do not invent type sizes** (`text-lg`, `text-xl`) or arbitrary font sizes.
4. **Do not use arbitrary values** beyond the two safe-area insets. No arbitrary spacing, radius, or shadow.
5. **Do not extend `tailwind.config.js`.** Defaults cover everything.
6. **Do not mix icon libraries** (no Lucide / Tabler / Material) and **do not hand-draw SVGs.** If a Heroicon reads wrong, swap for another Heroicon — never leave the library.
7. **Do not apply uniform card padding.** Content cards `p-4`, compact rows `p-3`.
8. **Do not use gradients** — overlays are a flat `neutral-900/40` scrim.
9. **Do not redesign, modernize, or "improve" the UX.** No new flows, no reordering, no added states.
10. **Do not invent values marked *estimated* or *requires verification*** — use the mapped Tailwind step as-is.

---

## Build conventions

- **Stack:** React 18 + Tailwind CSS v3.4 + Heroicons v2.2 (all already installed). No reusable components or screens are built yet — this is foundation only.
- **Imports:** outline `import { XIcon } from '@heroicons/react/24/outline'`; solid (active only) `from '@heroicons/react/24/solid'`.
- **Images:** `<div class="... bg-neutral-200" />` placeholders, never real assets.
- **Bar fills:** use a placeholder proportional width (e.g. `w-3/4`) — not derived from data.
- **Dividers:** `divide-y divide-neutral-100` is canonical; per-row `border-t border-neutral-100` is acceptable and equivalent.

---

## Open verification items (do not guess — keep the inventory default)

These are unresolved in the screenshots. Use the listed default; flag rather than invent if it reads wrong.

| Item | Default to use | Note |
|---|---|---|
| In-page tab active indicator (Recipe Detail) | active `text-neutral-900`, inactive `text-neutral-400` | pill-vs-underline unverified |
| Stepper button radius | `rounded-full` | `rounded-lg` is the alternative |
| In-card divider method | `divide-y divide-neutral-100` | `border-t` equivalent |
| Hero kcal value size | `text-3xl` | could be `text-2xl` |
| Derived Heroicon choices | nearest Heroicon (see inventory) | confirm they read correctly |

---

## Self-check before shipping a wireframe

- [ ] Reads as the same screen as the screenshot (structure / hierarchy / density / navigation preserved).
- [ ] Grayscale only; text uses only `neutral-900/500/400`.
- [ ] Only Tailwind defaults used (plus the two safe-area insets).
- [ ] Type sizes limited to the 5 observed steps; `font-sans` + `tracking-normal`.
- [ ] Cards `rounded-2xl border + shadow-sm`; correct `p-4`/`p-3` padding.
- [ ] Icons are Heroicons v2, correctly sized, outline-by-default.
- [ ] Spacing rhythm (`px-4`, `space-y-6`, `space-y-3`/`gap-3`) applied.
- [ ] Bottom nav present/absent per the screen's navigation rule.
- [ ] No redesign, no invented values, no arbitrary utilities.
