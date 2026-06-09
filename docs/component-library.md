# Caloria — Component Library

> Per-component reference for the reusable React + Tailwind building blocks in `src/components/`. Foundations and tokens: [`design-system.md`](./design-system.md). The same components render both prototypes — greyscale under `/wireframe/*`, dark "Caloria" under `/caloria/*` (the `.theme-caloria` recolor). **No component hard-codes a Caloria color**; it emits a neutral Tailwind utility the theme remaps.

**Import surface** — one path for everything:
```jsx
import {
  Text, Icon, PlantIcon, Card, Divider, Button, IconButton, Badge, Pill, Thumbnail,
  ScreenHeader, TabBar, TabItem, BottomNav,
  SearchInput,
  SectionHeader, ListRow, DetailRow, DetailList,
  ProgressBar, StatCard, MacroSummary, Stepper, MediaCard, Toast,
  Screen, ScreenSection, ScrollRow, MobileFrame,
} from '../components'
```

**Global conventions** (every component):
- Visual content slots (`leading`, `trailing`, `action`, `meta`, `badge`) accept React nodes.
- Every component merges a trailing `className` (via `lib/cn.js`) for one-off tweaks.
- No component holds state or data — pass `value` + handlers (controlled & presentational).
- Icons are Heroicons v2 passed by reference (`icon={HeartIcon}`); outline default, solid for active.
- Typography only via `Text`; color only via neutral Tailwind utilities (never a raw hex).

**Status legend:** ✅ implemented · 🟡 spec only (no prototype reference yet — needs design before building).

---

## Category → component map

| Requested component | Implemented as | Status |
|---|---|---|
| Buttons | `Button`, `IconButton` | ✅ |
| Inputs | `SearchInput`, `Stepper` (numeric) | ✅ |
| Search bars | `SearchInput` | ✅ |
| Filter chips | `Pill` | ✅ |
| Cards | `Card`, `MediaCard` | ✅ |
| Recipe cards | `ListRow` (recipe row), `MediaCard` (featured) | ✅ |
| Stats cards | `StatCard`, `MacroSummary` | ✅ |
| Progress indicators | `ProgressBar` | ✅ |
| Charts | — | 🟡 spec only |
| Bottom navigation | `BottomNav` | ✅ |
| Tabs | `TabBar` + `TabItem` | ✅ |
| Modals | — | 🟡 spec only |
| Toasts | `Toast` | ✅ |
| Empty states | — | 🟡 spec only |
| Success states | `Toast` (success) | ✅ |
| Profile elements | — | 🟡 spec only |

Supporting primitives/layout (`Text`, `Icon`, `Thumbnail`, `Badge`, `Divider`, `ScreenHeader`, `SectionHeader`, `ListRow`, `DetailRow`/`DetailList`, `Screen`, `ScreenSection`, `ScrollRow`, `MobileFrame`) are documented at the end.

---

## Buttons

### Button ✅

**Purpose** — Full-width text action (Record, Cancel, Load More).

**Anatomy** — `[leadingIcon?] label [trailingIcon?]` in an `h-12 rounded-xl` bar; `inline-flex items-center justify-center gap-2 text-sm font-semibold`.

**Variants** — `primary` (`bg-neutral-900 text-white` → amber fill in wireframe / **glass pill** in Caloria detail footers) · `secondary` (`border border-neutral-200 bg-white text-neutral-500`).

**States** — default · hover (theme accent-hover on primary) · disabled (apply `disabled` + `opacity` at call site). `fullWidth` defaults `true`; pass `fullWidth={false}` for intrinsic width (e.g. footer Cancel).

**Usage rules** — One primary action per view. In Caloria, the footer Record button is lifted to a floating glass pill by the theme — keep it the only primary in the footer. Label is a verb ("Record", "Load More").

**When not to use** — For an icon-only circular control use `IconButton`. For a selectable option use `Pill`. For navigation between tabs use `TabBar`.

### IconButton ✅

**Purpose** — Every circular icon control: header back, hero overlay controls, inline row `+`/heart, stepper −/+.

**Anatomy** — `rounded-full grid place-items-center` square holding one `Icon`; glyph size auto-paired to button size.

**Variants** — `soft` (`bg-neutral-100`) · `overlay` (`bg-white/80` → **glass** in Caloria) · `filled` (`bg-neutral-900 text-white`) · `outline` (`border bg-white`) · `ghost` (transparent). **Sizes:** `header` 40px · `stepper` 36px · `inline` 32px · `inlineSm` 20px.

**States** — default · hover · pressed (`aria-pressed` when toggling, e.g. favorite). `label` is **required** → `aria-label`.

**Usage rules** — Always pass a descriptive `label` that names the target ("Add Greek Yogurt", not "Add"). Hero controls use `overlay`; stepper minus uses `outline`, plus uses `outline`/`filled` per screen.

**When not to use** — When a text label is needed (use `Button`). When the control selects from a set (use `Pill`/`TabItem`).

---

## Inputs & search

### SearchInput ✅

**Purpose** — The search field (Recipes, Log Food). The **only** free-text input in the product.

**Anatomy** — `h-12 rounded-full border border-neutral-200 bg-white px-4`: leading `MagnifyingGlassIcon` (meta ink) + `<input>` (`placeholder:text-neutral-400`) + trailing mic in an `h-8 w-8 rounded-full bg-neutral-100` circle.

**Variants** — single visual style; the trailing control is configurable (`trailingIcon={null}` drops the mic).

**States** — empty (placeholder) · focused (`focus:outline-none` — no ring styled) · filled. Controlled via `value` / `onChange`.

**Usage rules** — Provide a real `placeholder` describing scope ("Search food, brand, or dish…"). Give the trailing button a `trailingLabel`.

**When not to use** — There is no generic `TextInput`; do **not** repurpose this for non-search fields. A new input type needs a design pass first.

### Stepper ✅

**Purpose** — `[−] value [+]` numeric control for quantity / servings.

**Anatomy** — `flex items-center gap-3`: minus `IconButton` + editable numeric `<input>` + plus `IconButton`, buttons `h-9 w-9 rounded-full`.

**Variants** — value can be read-only (omit `onValueChange`) or editable. `inputClassName` styles the field (the detail screens use a bordered `h-12 w-16` field, pilled to `rounded-full` by the Caloria theme).

**States** — default · editing (input focused) · min-clamped (call site enforces `Math.max(1, …)`).

**Usage rules** — Provide `decrementLabel` / `incrementLabel` / `valueLabel` for a11y. Clamp the value in the handler, not the component.

**When not to use** — For non-numeric selection (use `Pill`/`TabBar`). For a continuous range (no slider exists yet — would need design).

---

## Filter chips

### Pill ✅

**Purpose** — The single selectable rounded-full chip: meal segments, filter chips, serving-size pills, removable active filters.

**Anatomy** — `inline-flex items-center whitespace-nowrap rounded-full shrink-0` with `leading` / `children` / `trailing`.

**Variants** — **state:** `selected` (`bg-neutral-900 text-white` → in Caloria *detail* screens, amber label on a surface chip, not a fill) · `filled` (static grey chip `bg-neutral-100`, e.g. a removable active filter) · unselected (`border bg-white text-neutral-500`). **Sizes:** `md` (h-9) · `sm` (h-8) · `xs` (h-6) · `2xs` (h-4).

**States** — selected / unselected (single-select managed by the screen) · with `trailing` `XMarkIcon` for removable filters · with `leading` chevron for a dropdown-trigger pill.

**Usage rules** — Render exactly one `selected` pill per single-select group; keep the selected index in the screen. Use `ScrollRow` to make a long row scroll and clip at the edge.

**When not to use** — For a primary action (use `Button`). For page-level section switching (use `TabBar`). For a non-interactive status label (use `Badge`).

---

## Cards

### Card ✅

**Purpose** — The canonical surface: `rounded-2xl border border-neutral-200 bg-white shadow-sm`.

**Anatomy** — A bordered rounded container with `content` (`p-4`), `compact` (`p-3`), or `none` padding.

**Variants** — `content` (full-width multi-element cards: Nutrition Summary, Impact-on-Goal) · `compact` (rows/tiles) · `none` (wraps full-bleed media or supplies own padding).

**States** — static surface (Flat elevation). No hover/selected state — selection lives on inner controls.

**Usage rules** — Use `content` vs `compact` deliberately; never uniformly pad. White surface (`--clr-surface` in Caloria) on the sunken page.

**When not to use** — For floating controls over content (that's **Glass**, applied by the theme to `IconButton`/footer, not `Card`). For an image-led promo (use `MediaCard`).

### MediaCard ✅ (also: Recipe cards)

**Purpose** — Image-led card. Two layouts: `horizontal` (Suggested carousel item) and `featured` (Recipes hero promo / recipe card).

**Anatomy** — `horizontal`: `w-40` card, `h-24` image, title + meta + `action` below. `featured`: full-width `h-44` image under a flat `--clr-scrim`, `badge` top-left, title + meta overlaid bottom in white.

**Variants** — `horizontal` · `featured`. Both take an optional `image` URL (Caloria) and fall back to the `bg-neutral-200` placeholder (wireframe).

**States** — static; the optional `action` button has its own states. Failed image load degrades to the placeholder tone.

**Usage rules** — Featured is the one place white-on-scrim text is allowed (legibility). Reuse the same food photo across the row and the detail hero for cohesion (see [[linear-screens-imagery]]).

**When not to use** — For a text-led list item (use `ListRow`). For a plain content panel (use `Card`).

---

## Stats cards

### StatCard ✅

**Purpose** — Compact 3-up macro stat box inside Nutrition Summary.

**Anatomy** — `rounded-xl bg-neutral-50 p-3 text-center`: optional `icon` + `label` (caption) on top, big `value` (stat) below.

**Variants** — with/without leading icon. Always grouped 3-up in a `grid grid-cols-3 gap-3`.

**States** — static display.

**Usage rules** — Use for boxed, emphasized single values. Keep to 3 across at 375px.

**When not to use** — For an unboxed macro row (use `MacroSummary`). For a label↔value pair (use `DetailRow`).

### MacroSummary ✅

**Purpose** — Unboxed 4-column macro row (Carbs / Protein / Fat / Fiber): dot + value + label.

**Anatomy** — `grid grid-cols-4 gap-2 text-center`; each column = `h-2 w-2` dot (`bg-neutral-300`) + value (`cardTitle`) + label (`caption`).

**Variants** — single layout; `items` array drives the columns.

**States** — static display.

**Usage rules** — Exactly the 4 macros; no bars/boxes (that distinguishes it from `StatCard`/`ProgressBar`).

**When not to use** — When each macro needs a progress bar (use `ProgressBar` rows) or a boxed emphasis (use `StatCard`).

---

## Progress indicators

### ProgressBar ✅

**Purpose** — Thin track + fill (macro bars, Impact-on-Goal).

**Anatomy** — `h-1.5 rounded-full bg-neutral-200` track + `bg-neutral-900` fill at an inline `width:%`.

**Variants** — single style; `value` (0–100) sets the fill.

**States** — `role="progressbar"` with `aria-valuenow/min/max`. The fill is a **placeholder proportion**, not live data.

**Usage rules** — Pair with a label↔value row above it. Keep the fill a representative width.

**When not to use** — For multi-series or categorical data (use a Chart — see below). For a numeric stepper (use `Stepper`).

---

## Charts 🟡 (spec only — not implemented)

**Purpose** — Trend / breakdown visualization for the (not-yet-designed) Reports screen.

**Status** — **No chart appears in the current prototype.** This is a forward spec built from existing tokens; do not build until a Reports design exists.

**Proposed anatomy** — Within a `content` Card: a `section` title + optional `link` action; the plot area on `--clr-sunken`; gridlines as `--clr-border-subtle`; series in `--clr-ink` with the single highlighted series/bar in `--clr-accent`; axis labels in `caption`.

**Proposed variants** — sparkline (inline, no axes) · bar (weekly intake) · ring/progress (goal completion, reuse `ProgressBar` tokens).

**Usage rules (when built)** — One accent series max (the focus metric); everything else neutral. No new colors — encode categories by ink weight/position, matching the "emphasis via weight, not hue" rule.

**Open question for review** — chart library vs hand-rolled SVG; whether multi-hue categorical encoding is ever permitted (currently forbidden by the single-accent rule).

---

## Bottom navigation

### BottomNav ✅

**Purpose** — The app-level tab bar: a floating glass pill (`Home · Recipes · Reports · Profile`) plus a detached circular Add FAB.

**Anatomy** — `pointer-events-none` nav over the scroll area; a `rounded-full bg-white/90` pill of four tabs + a separate `h-16 w-16` Add FAB. In Caloria the pill shrinks to 56px, the FAB to 56px, and icons to 20px.

**Variants** — `basePath` scopes the in-prototype destinations (Recipes tab → `${basePath}/recipes`, Add → `${basePath}/log`) so each prototype stays self-contained; Home/Reports/Profile remain global placeholders.

**States** — active tab (`text-neutral-900` + solid icon) vs inactive (`text-neutral-400` + outline). Active state via `react-router` `NavLink`.

**Usage rules** — Pass `basePath` matching the prototype (`/caloria` or `/wireframe`). Shown on the Recipes hub only; pushed/detail screens omit it and use a back control.

**When not to use** — For in-page section switching (use `TabBar`). On deep/detail screens (omit it).

---

## Tabs

### TabBar + TabItem ✅

**Purpose** — In-page section switcher (Recipe Detail: Nutrition / Ingredients / Instructions).

**Anatomy** — `TabBar` is a `flex` row (`role="tablist"`); each `TabItem` is an equal-width (`flex-1`) `role="tab"` button.

**Variants** — `underline` (ink-only: active `text-neutral-900`, inactive `text-neutral-400`; pair with a `border-b`) · `pills` (grey `bg-neutral-100` track, active = filled `bg-neutral-900` pill → in Caloria, transparent chip with amber label).

**States** — `active` per item (`aria-selected`); inactive.

**Usage rules** — Set `variant` once on `TabBar`; switch panels in screen state with no route change. Pair the visible panel with `role="tabpanel"`.

**When not to use** — For navigating between screens (use `BottomNav`/router). For selecting filters (use `Pill`).

---

## Modals 🟡 (spec only — not implemented)

**Purpose** — Blocking overlay for a focused task or confirmation.

**Status** — **No modal appears in the current prototype** (confirmations use the non-blocking `Toast`; detail screens are full pushed routes). Forward spec only.

**Proposed anatomy** — A `--clr-scrim` backdrop (click-to-dismiss) + a centered/bottom-sheet `Card` (`content` padding, `--clr-surface`, hairline border) with: header (`section` title + close `IconButton`), body, and a footer `Button` row. The sheet may adopt the **Glass** treatment if it floats.

**Proposed variants** — center dialog · bottom sheet · confirm (title + body + Cancel/Confirm).

**Usage rules (when built)** — Trap focus, restore on close, `role="dialog"` + `aria-modal`, Esc to dismiss. Reuse `Button`/`Card`/`IconButton` — invent no new surface.

**When not to use** — For a transient confirmation (use `Toast`). For a full content view (use a pushed route like the detail screens).

---

## Toasts & success states

### Toast ✅

**Purpose** — Transient confirmation pill (the Record / Record Food success message). Also serves as the **success state**.

**Anatomy** — A centered `rounded-full bg-neutral-900 px-4 py-2.5 text-white shadow-lg` pill with a leading `CheckCircleIcon` (solid) + message, floating `bottom-full` above its positioned ancestor. In Caloria it recolors to the surface tone + ink to match the hero badges.

**Variants** — single style; `icon` overridable. Presentational — the caller owns `show` and any auto-dismiss timer.

**States** — hidden (`show=false` → renders nothing) · shown. `pointer-events-none` so it never blocks taps.

**Usage rules** — Wrap in a `relative` container (the sticky footer is the intended anchor). Keep messages short and past-tense ("Food recorded to your log"). Auto-dismiss ~2.5s.

**When not to use** — For errors needing acknowledgement or actions (use a Modal — spec above). For persistent status (use inline text/`Badge`).

---

## Empty states 🟡 (spec only — not implemented)

**Purpose** — Placeholder when a list/search has no results.

**Status** — The only empty-ish UI is the route `Placeholder` (emoji tile + title + "coming soon") in `App.jsx`. No designed empty state exists; forward spec only.

**Proposed anatomy** — Centered stack: a `Thumbnail`-sized `tone="icon"` tile with a Heroicon (`feature` size), a `section` title, a `body` line of guidance, and an optional `Button` ("Add food"). Vertically centered in the scroll area.

**Proposed variants** — no-results (search) · empty-list (no logged foods) · error/offline.

**Usage rules (when built)** — One sentence of guidance + one clear action. Reuse `Thumbnail`/`Text`/`Button`; no illustrations beyond a Heroicon (icon rule).

**When not to use** — While loading (use a skeleton/spinner — also undesigned). When content exists.

---

## Profile elements 🟡 (spec only — not implemented)

**Purpose** — Avatar, identity header, and settings rows for the Profile tab.

**Status** — Profile is a route `Placeholder`. No avatar or profile UI is designed; forward spec only.

**Proposed anatomy** — **Avatar:** reuse `Thumbnail` (`rounded-full` via `className`) or an `IconButton`-style circle with `UserCircleIcon`. **Identity header:** avatar + `title` name + `caption` meta. **Settings rows:** `ListRow card={false}` in a `DetailList`, leading icon tile + label + trailing chevron/value.

**Proposed variants** — avatar (image / initials / icon) · stat summary header · settings list.

**Usage rules (when built)** — Compose entirely from `Thumbnail` / `ListRow` / `DetailList` / `Text`; introduce no new row pattern.

**When not to use** — Don't fork a new `Avatar`/`SettingsRow` component until the Profile screen is designed and proves the existing primitives insufficient.

---

## Supporting primitives & layout

These underpin everything above; full anatomy lives in source comments.

| Component | Purpose | Key API | When not to use |
|---|---|---|---|
| **Text** ✅ | The only typography primitive | `variant`, `as` | Never write raw `text-*`/`font-*`; add a variant instead |
| **Icon** ✅ | Heroicon sizing wrapper | `as`, `size` (`nav`/`feature`/`inline`/`small`/`tiny`) | For an interactive glyph use `IconButton` |
| **PlantIcon** ✅ | Custom leaf glyph (carbs macro) | `className`, `size` | The one sanctioned non-Heroicon; don't add more custom SVGs |
| **Thumbnail** ✅ | Leading image/icon tile | `size` (sm/md/lg), `tone`, `src` | For a full media promo use `MediaCard` |
| **Badge** ✅ | Small status label | `variant` (`onImage`/`solid`/`soft`), `leadingIcon` | For a selectable chip use `Pill` |
| **Divider** ✅ | Standalone hairline | `className` | Inside label↔value lists use `DetailList`'s `divide-y` |
| **ScreenHeader** ✅ | Top header `[back?] title [action]` | `title`, `action`, `onBack` | Hero overlay header is composed inline, not this |
| **SectionHeader** ✅ | Section title + action | `title`, `action` | — |
| **ListRow** ✅ | Generic row (food/recipe/ingredient) | `leading`,`title`,`subtitle`,`trailing`,`action`,`card` | For a boxed media promo use `MediaCard` |
| **DetailRow / DetailList** ✅ | Label↔value rows + dividers | `label`,`value` / wrapper | For 3-up stats use `StatCard` |
| **Screen** ✅ | Scroll column (`space-y-6` + `pb-24`) | `safeTop` | — |
| **ScreenSection** ✅ | Titled padded block | `title`,`action`,`bleed` | — |
| **ScrollRow** ✅ | Horizontal scroll track | `bleed`,`className` | For a wrapping group use a flex-wrap div |
| **MobileFrame** ✅ | 375px phone shell | `children`,`bottomNav` | — |

---

## Build / verification

- All components bundle cleanly; `vite build` succeeds. No `tailwind.config.js` change needed.
- The Caloria look comes entirely from `src/themes/caloria.css` (tokenized). Components stay theme-neutral.
- Dependencies: `react`, `react-router-dom`, `@heroicons/react` v2. No new packages.
