# Caloria Wireframe — Component Architecture

> The reasoning behind the library: which patterns were extracted, how inventory components were consolidated, and how the pieces compose. Read `component-library.md` for the per-component API and `folder-structure.md` for the file map.

## Goal

A **minimal** set of reusable building blocks sufficient to recreate all four screenshots as grayscale wireframes — nothing screen-specific, nothing speculative. Every component earns its place by appearing on **multiple screens** or by being a **foundational pattern** that others compose.

## Selection process (what was done)

1. **Read the inventory** (`DESIGN_INVENTORY.md` Phase 4 lists 20 component entries) and the three design docs.
2. **Mapped each inventory entry to a screen-occurrence count** to separate reusable patterns from one-offs.
3. **Collapsed look-alikes into one component with variants** (the reuse requirement — see the consolidation map below).
4. **Promoted shared sub-parts to primitives** (Text, Icon, Card, Thumbnail) so higher-level components never re-decide typography, radius, or color.
5. **Deferred anything not present in the screenshots** rather than inventing it.

## Consolidation map (inventory → library)

The core architectural move is **one component, many variants** instead of one component per content type.

| Inventory entries | Library component | How variants are expressed |
|---|---|---|
| 4.4 Segmented pills · 4.5 Food chip · 4.11 Size pills | **`Pill`** | `selected`, `size` (`md`/`sm`), `leading` (emoji/icon). *No FilterChip / MealCard / SizePill.* |
| 4.6 Food row · 4.15 Recipe row · 4.18 Ingredient row | **`ListRow`** | `card` (true=compact card / false=divided row) + `leading`/`title`/`subtitle`/`trailing`/`action` slots. *No FoodRow / RecipeRow / IngredientRow.* |
| 4.7 Horizontal media card · 4.16 Featured media card | **`MediaCard`** | `variant` (`horizontal`/`featured`). |
| 4.9 Macro bar · Impact-on-Goal progress bar | **`ProgressBar`** | one track+fill; `value` placeholder width. |
| 4.1 Header (list + detail variants) | **`ScreenHeader`** | `onBack` toggles the back button; `action` slot for the corner control. |
| 4.14 Primary + Secondary buttons | **`Button`** | `variant` (`primary`/`secondary`). |
| Header back · inline `+` · stepper −/+ · favorite/share | **`IconButton`** | `size` (`header`/`inline`/`stepper`) × `variant` (`soft`/`overlay`/`filled`/`outline`/`ghost`). |
| 4.8 Badge (on-image / solid / meal tags) | **`Badge`** | `variant` (`onImage`/`solid`/`soft`). |
| 4.17 In-page tab bar | **`TabBar` + `TabItem`** | `active` per item. |
| 4.13 Divided detail rows | **`DetailRow` + `DetailList`** | list wrapper supplies `divide-y`. |
| 4.10 Stepper · 4.12 Stat box · 4.20 Macro row | **`Stepper`** · **`StatCard`** · **`MacroSummary`** | kept distinct — different anatomy, not look-alikes. |
| 4.2 Search field | **`SearchInput`** | trailing icon configurable. |
| 4.19 Bottom navigation | **`BottomNav`** (existing) | reused as-is. |

### Deliberately NOT created

| Candidate | Why not |
|---|---|
| `MealCard` / `FilterChip` / `SizePill` | Identical structure → folded into **`Pill`**. |
| `FoodRow` / `RecipeRow` / `IngredientRow` | Same row anatomy → folded into **`ListRow`** (documented as composition recipes). |
| `TextInput` | No free-text field appears in the screenshots — only search. Building one would invent a pattern. Deferred. |
| `Avatar` | A single circular image placeholder; expressed as `Thumbnail`/IconButton content, not worth a component. |
| `ScanCard` / `RecipeDetailHeader` / any screen part | Screen-specific compositions, not reusable blocks. |

## Primitive vs. composite layers

```
Layer 0  Token source           design-system.md / design-tokens.md (no code — classes only)
Layer 1  Primitives             Text · Icon · Card · Divider · Button · IconButton · Badge · Pill · Thumbnail
Layer 2  Composites             ScreenHeader · SearchInput · ListRow · SectionHeader · DetailRow ·
                                ProgressBar · StatCard · MacroSummary · Stepper · MediaCard · TabBar
Layer 3  Layout scaffolding     MobileFrame (existing) · Screen · ScreenSection · ScrollRow · BottomNav (existing)
Layer 4  Screens (FUTURE)       Log Food · Food Details · Recipes · Recipe Detail — compose Layers 1–3
```

Rule: a component may depend **only on lower layers**. Primitives never import composites; composites never import screens.

## Dependency graph (who composes whom)

```
Text ─────────────┐
Icon ──┐          ├──> ScreenHeader, SectionHeader, ListRow, DetailRow,
       │          │     StatCard, MacroSummary, Stepper, MediaCard, Button, Badge, Pill
       ├──> IconButton ──> ScreenHeader, Stepper, (screens: overlay header, inline +)
       └──> Button, SearchInput, Badge
Card ──> ListRow                 (compact card variant)
Thumbnail ──> (screens compose into ListRow.leading / MediaCard)
SectionHeader ──> ScreenSection
cn (lib) ──> every component
```

Heroicons v2 is the only external UI dependency (`@heroicons/react`), imported by Icon-consuming components and by `SearchInput`/`Stepper`/`ScreenHeader`/`BottomNav` for their fixed glyphs.

## How the four screens compose (no new patterns needed)

| Screen | Composition |
|---|---|
| **Log Food** | `MobileFrame` › `Screen` › `ScreenHeader`(avatar action) · `SearchInput` · `ScreenSection`(3× quick-action = `Card` compact + `Thumbnail` icon + `Text`) · `ScreenSection`+`ScrollRow`(meal `Pill`s) · `ScreenSection`(`Pill` size=sm chip cloud) · `ScreenSection`(`ListRow` food rows) · `ScreenSection`+`ScrollRow`(`MediaCard` horizontal) › `BottomNav` |
| **Food Details** | `MobileFrame` › `Screen` › `ScreenHeader`(onBack, heart action) · media placeholder + `Badge`s · `Text` hero + `ProgressBar` macros · `Pill` meal segments · `Card`(serving `Pill`s + `Stepper`) · `Card`(`StatCard` 3-up + `DetailList`/`DetailRow`) · `Card`(`ProgressBar`) · sticky `Button` Cancel/Record › `BottomNav` |
| **Recipes** | `MobileFrame` › `Screen` › `ScreenHeader`(filter action) · `SearchInput` · `ScrollRow`(filter `Pill`s ×2 rows) · `MediaCard` featured · `SectionHeader`(count + sort) · `ListRow` recipe rows · `Button` secondary "Load More" › `BottomNav` |
| **Recipe Detail** | `MobileFrame` › `Screen`(no BottomNav) › full-bleed media + `IconButton` overlay (back/share/heart) + `Badge`s · `Stepper` servings + `Text` · `MacroSummary` 4-col · `Button` Record · `TabBar`/`TabItem` · `ListRow`(card=false) ingredient rows in a `DetailList` |

Every cell above uses only existing library components — confirming the set is complete for the screenshots.

## Conventions all components follow

- **Tokens, not raw classes.** Typography goes through `Text` variants; icon sizes through `Icon`; color is limited to the grayscale ramp. No component hard-codes a `text-2xl`/`font-bold` outside `Text`.
- **Slots over props for content.** Anything visual and variable (a trailing value, a corner action, a badge) is a **node slot** (`action`, `trailing`, `leading`, `meta`) so screens compose without the library growing content-specific props.
- **`className` passthrough.** Every component merges a trailing `className` via `cn` for one-off spacing tweaks — without it becoming a new variant.
- **Controlled & presentational.** Inputs/steppers/tabs take `value` + handlers; the library holds **no state** and **no data**. State and data are the screen's job.
- **Grayscale + Tailwind defaults only.** The single arbitrary value anywhere is the device inset `pt-[59px]` (in `Screen`, opt-in). Bar fills use an inline `width` %, which is *data*, not a design token.
- **Accessibility baked in.** Icon-only controls require a `label` (→ `aria-label`); `Icon` is `aria-hidden`; tabs use `role="tab"`/`aria-selected`; pills use `aria-pressed`; the progress bar exposes `role="progressbar"` values.
