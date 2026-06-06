# Caloria — Tailwind Design Inventory

> Reverse-engineered from 4 source screenshots (rendered width **375px**).
> Purpose: recreate the existing screens as **high-fidelity grayscale wireframes** in React + Tailwind CSS v3.
> **This document is the source of truth** for all React + Tailwind implementation.
> **Source of truth for visuals = screenshots.** No redesign, no new UX, no branding, no color decisions.
> All color is intentionally dropped and replaced with a neutral gray scale (see *Grayscale Mapping*).
>
> **Target implementation frame: 375px wide** (matches the source screenshots — all pixel estimates are at this width).
> **Device safe areas (exact):** top inset **59pt**, bottom inset **34pt** (see Phase 2).

---

## 0. Global Observations (read first)

These patterns repeat on every screen and drive the whole inventory:

1. **Header block** = uppercase eyebrow (`LOG FOOD` / `FOOD DETAILS` / `DISCOVER`) + large bold title + a circular control on the right (avatar / heart / filter). Detail screens add a circular **back** button on the left.
2. **Surfaces** = white cards on a light-gray page, ~16px radius, hairline border + very soft shadow.
3. **Pills** = one rounded-full component reused for meal segments, filter chips, and food chips. Single **selected** variant (filled) vs **unselected** (outline/ghost).
4. **One accent** (green) is used *only* for: selected pill, primary button, the Add FAB, and emphasized kcal numbers. Everything else is a gray text hierarchy → trivially grayscale-able.
5. **List row** = leading thumbnail/icon (rounded) + title/subtitle stack + trailing value + optional trailing circular action (`+` / heart).
6. **Bottom navigation** is a fixed 5-item bar with a raised circular **Add** button; present on list screens, hidden on the deepest detail screen (Recipe Detail).

### Grayscale Mapping (apply globally)

**Canonical text ramp — exactly three inks. Do not introduce `neutral-600`/`neutral-700` for text.**

| Original role | Grayscale token | Notes |
|---|---|---|
| Accent green (primary btn, selected pill, FAB) | `neutral-900` fill / white text | The single "active" ink |
| Accent green text (kcal, links, "See all") | `neutral-900` (`font-semibold`) | Emphasis via weight, not hue |
| **Primary / active text** | `text-neutral-900` | Titles, values, emphasis, selected control text |
| **Body / secondary text** | `text-neutral-500` | Body copy, ingredient names, row labels, macro labels, unselected control text |
| **Meta / tertiary text** | `text-neutral-400` | Captions, subtitles, eyebrows, placeholders, inactive nav |
| Page background | `bg-neutral-50` | Behind cards |
| Card surface | `bg-white` | |
| Card border | `border-neutral-200` | Hairline |
| Divider | `border-neutral-100` | In-card row separators |
| Category/emoji color blobs | `bg-neutral-100` + `text-neutral-500` | Flatten to neutral chips |
| Image placeholders | `bg-neutral-200` | Use solid gray boxes for photos |
| Image overlay (for legible text on photos) | `bg-neutral-900/40` (flat) | No gradient — flat scrim only |

---

## Phase 1 — Screen Inventory

| # | Screen | Primary purpose | Major content sections | Navigation elements | Reusable patterns present |
|---|---|---|---|---|---|
| 1 | **Log Food (Home)** | Search & quickly log food | Header; Search field; 3 quick-action cards (Scan / Snap / Manual); Meal-time segments; Popular Foods chips; Recently Logged list; Suggested-for-You horizontal cards | Bottom nav; "Today" / "See all" / "Clear" inline links; avatar (top-right) | Header, Search field, Action card, Segmented pills, Chip cloud, Food list row, Horizontal media card, Bottom nav |
| 2 | **Food Details** | Inspect a food & record it to a meal | Back header; Hero image w/ badges; Calorie summary; Macro bars; "Add to Meal" segments; Serving & Quantity card (size pills + stepper); Nutrition Summary card (highlight row + stat boxes + divided rows); Impact-on-Goal card (progress); sticky action bar (Cancel / Record Food) | Circular back; favorite (heart) top-right; sticky bottom actions; Bottom nav | Header w/ back, Badge, Macro bar, Segmented pills, Selectable size pills, Stepper, Stat box, Divided detail rows, Progress bar, Primary/secondary buttons |
| 3 | **Recipes (Discover)** | Browse / filter recipes | Header w/ filter; Search field; 2 rows of filter pills; Featured hero card; result count + sort; Recipe list (thumbnail + meta + stats); "Load More" button | Filter icon (top-right, badge); sort control; Bottom nav | Header, Search field, Filter pills, Featured media card, Recipe list row, Tag badge, Outline button, Bottom nav |
| 4 | **Recipe Detail** | View a recipe & record servings | Full-bleed hero (back/share/heart over image, title + rating overlaid); Servings stepper + kcal; Macro summary row (4 cols); Record button; Tabs (Ingredients / Instructions / Nutrition); Ingredient list rows | Circular back/share/heart over image; in-page tab bar; (no bottom nav shown) | Image overlay header, Stepper, Macro row, Primary button, Tab bar (underline/segmented), Ingredient list row, Leading icon tile |

---

## Phase 2 — Layout Inventory

### Safe area & vertical rhythm
| Region | Value | Tailwind | Notes |
|---|---|---|---|
| **Top safe area** (status bar + Dynamic Island) | **59pt** (exact) | `pt-[59px]` *(or `env(safe-area-inset-top)`)* | Confirmed device metric — intentional arbitrary value (see Phase 8) |
| **Bottom safe area** (home indicator) | **34pt** (exact) | `pb-[34px]` *(or `env(safe-area-inset-bottom)`)* | Confirmed device metric — intentional arbitrary value |
| Header top padding (below safe area) | ~12–16px *(estimated)* | `pt-3`–`pt-4` | |
| Header → first content block | ~16–20px *(estimated)* | `mt-4`–`mt-5` | |
| Bottom nav height | ~64px *(estimated)* | `h-16` | Sits above the 34pt bottom safe area |
| Content bottom padding (clear nav) | ~80–96px *(estimated)* | `pb-24` | So last card isn't under nav |
| Sticky action bar (Food Details) | intrinsic *(~64–72px estimated)* | `py-3` (let content set height) | Cancel + Record row |

### Screen padding
| Use | Estimated px | Tailwind | Default OK? |
|---|---|---|---|
| Horizontal page padding | **16px** | `px-4` | ✅ default |
| Vertical page padding (top of scroll area) | 16px | `pt-4` | ✅ default |
| Full-bleed media (heroes) | 0 (edge-to-edge) | `-mx-4` inside padded container, or unpadded section | Recipe Detail hero bleeds to screen edges |

### Section / element spacing
| Between | Estimated px | Tailwind | Default OK? |
|---|---|---|---|
| Major sections (e.g. "Popular Foods" → "Recently Logged") | **24px** | `space-y-6` | ✅ |
| Section header → its content | 12px | `mt-3` | ✅ |
| Stacked list cards (food rows, recipe rows) | **12px** | `space-y-3` / `gap-3` | ✅ |
| Cards in a settings/detail stack (Food Details) | 16px | `space-y-4` | ✅ |
| Chips in chip cloud | 8px both axes | `gap-2` | ✅ |
| Pills in a segmented row | 8px | `gap-2` | ✅ |
| Quick-action cards (3-up) | 12px | `gap-3` | ✅ |
| Form group label → control | 8px | `mt-2` | ✅ |
| Divided rows inside nutrition card | 12px vertical padding | `py-3` | ✅ |

### Card padding rule (canonical)
| Card type | Padding | Tailwind | Examples |
|---|---|---|---|
| **Content card** (full-width, multi-element) | 16px | `p-4` | Serving & Quantity, Nutrition Summary, Impact-on-Goal |
| **List row / compact tile** | 12px | `p-3` | Food row, recipe row, quick-action card, media card, stat box |

> Do **not** apply a uniform padding to all cards: large content cards use `p-4`, compact rows/tiles use `p-3`.

---

## Phase 3 — Typography Inventory

Consolidated to **10 reusable styles**. Sizes follow the canonical text ramp (Phase 0): `neutral-900` primary · `neutral-500` body · `neutral-400` meta.

**Font family (canonical):** **UI Sans Serif** → CSS `ui-sans-serif`, which is the first family in Tailwind's default `font-sans` stack. Use **`font-sans`** everywhere — no `tailwind.config.js` change required.
**Letter-spacing (canonical):** **0%** everywhere → **`tracking-normal`** (Tailwind default). Do not use `tracking-wide`/`tracking-tight`, including on the uppercase eyebrow.

| # | Style name | Usage | Size / weight / LH *(estimated unless noted)* | Tailwind class |
|---|---|---|---|---|
| T1 | **Eyebrow / overline** | `LOG FOOD`, `FOOD DETAILS`, `DISCOVER`, `FEATURED` | 11–12px / 600, uppercase | `text-xs font-semibold uppercase text-neutral-400` |
| T2 | **Page title** | "What did you eat?", "Recipes", "Grilled Chicken Breast" | 22–24px / 700 | `text-2xl font-bold text-neutral-900` |
| T3 | **Section header** | "Meal Time", "Popular Foods", "Nutrition Summary" | 16–17px / 600 | `text-base font-semibold text-neutral-900` |
| T4 | **Emphasis / value (sm)** — *merges card title + inline macro value + list kcal* | "Greek Yogurt", "31g", "130 kcal" | 14–15px / 600 | `text-sm font-semibold text-neutral-900` |
| T5 | **Action / link (sm)** — *merges inline link + in-page tab label* | "See all", "Today", "Clear", "Calories ↑", tab labels | 13–14px / 500 | `text-sm font-medium` *(color per state: active `text-neutral-900`, inactive `text-neutral-400`)* |
| T6 | **Body (sm)** | ingredient names, row labels | 14px / 400 | `text-sm text-neutral-500` |
| T7 | **Meta / caption (xs)** — *merges card subtitle + caption* | "1 cup · 150g", "per 100g serving", "765 / 1,800 kcal" | 12–13px / 400 | `text-xs text-neutral-400` |
| T8 | **Label (xs)** — *merges macro label + nav label + badge text* | "Protein", nav labels, "High Protein", "Verified" | 10–12px / 500–600 | `text-xs` *(weight/color per context: macro `font-medium text-neutral-500`; nav `font-medium`; badge `font-semibold`)* |
| T9 | **Hero value** | "165 kcal", "640 kcal" *(estimated — could be `text-2xl`)* | 26–30px / 700 | `text-3xl font-bold text-neutral-900` |
| T10 | **Stat-box value** | "31g" in nutrition stat boxes | 16px / 700 | `text-base font-bold text-neutral-900` |

> Scale used: `text-xs` · `text-sm` · `text-base` · `text-2xl` · `text-3xl`. No arbitrary font sizes. (`text-lg`/`text-xl` not observed — don't invent them.)
> *Note: T9 vs T10 and T3 share `text-base`/`text-3xl` slots; weight distinguishes them. Hero value size (T9) is **estimated** — verify against device.*

---

## Phase 4 — Component Inventory

### 4.1 Header (standard)
- **Purpose:** screen identity + a single corner action.
- **Structure:** `[back?] [eyebrow / title stack] [circular action]` in a `flex items-start justify-between`.
- **Variants:** *List header* (no back, avatar/filter right) · *Detail header* (circular back left, heart right).
- **Measurements:** circular controls ~40px (`h-10 w-10`), title block as in typography.
- **Recipe:**
  ```html
  <header class="flex items-start justify-between px-4 pt-4">
    <div>
      <p class="text-xs font-semibold uppercase text-neutral-400">Log Food</p>
      <h1 class="text-2xl font-bold text-neutral-900">What did you eat?</h1>
    </div>
    <button class="h-10 w-10 rounded-full bg-neutral-100"></button>
  </header>
  ```
- **Reusability:** High.

### 4.2 Search field
- **Purpose:** text search.
- **Structure:** leading magnifier icon + input + trailing mic icon (in a soft circle).
- **Measurements:** height ~48px (`h-12`), radius ~12px (`rounded-xl`), padding `px-4`, icon 20px.
- **Recipe:**
  ```html
  <div class="flex h-12 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4">
    <MagnifyingGlassIcon class="h-5 w-5 text-neutral-400" />
    <input class="flex-1 bg-transparent text-sm placeholder:text-neutral-400" placeholder="Search food, brand, or dish…" />
    <span class="grid h-8 w-8 place-items-center rounded-full bg-neutral-100"><MicrophoneIcon class="h-4 w-4 text-neutral-500" /></span>
  </div>
  <!-- import { MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/outline' -->
  ```
- **Reusability:** High (Home + Recipes).

### 4.3 Quick-action card (Scan / Snap / Manual)
- **Purpose:** entry points to logging methods.
- **Structure:** vertical: icon tile on top, label below; 3 across.
- **Measurements:** card ~106×96px *(estimated)*, radius `rounded-2xl`, `p-3`, icon tile ~48px (`h-12 w-12`) `rounded-xl`, gap `gap-3`.
- **Recipe:**
  ```html
  <button class="flex flex-1 flex-col items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-3">
    <span class="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100">
      <ViewfinderCircleIcon class="h-8 w-8 text-neutral-500" /> <!-- feature icon -->
    </span>
    <span class="text-xs font-medium text-neutral-500">Scan Barcode</span>
  </button>
  <!-- icons: ViewfinderCircleIcon (Scan) · CameraIcon (Snap) · PencilSquareIcon (Manual) -->
  ```
- **Note:** icon tile enlarged to `h-12 w-12` to host the `h-8 w-8` feature icon.
- **Reusability:** Medium (Home only, but 3 instances).

### 4.4 Segmented pills (meal time / filters)
- **Purpose:** single-select category filter.
- **Structure:** horizontally scrollable row of rounded-full pills, optional leading icon/emoji; one **selected** (filled) + rest **outline**.
- **Variants:** Selected (`bg-neutral-900 text-white`) · Unselected (`border-neutral-200 text-neutral-500`).
- **Measurements:** height ~36px (`h-9`), `px-4`, `gap-2`, `rounded-full`, label `text-sm`.
- **Recipe:**
  ```html
  <div class="flex gap-2 overflow-x-auto">
    <button class="flex h-9 items-center gap-2 rounded-full bg-neutral-900 px-4 text-sm font-medium text-white">Breakfast</button>
    <button class="flex h-9 items-center gap-2 rounded-full border border-neutral-200 px-4 text-sm text-neutral-500">Lunch</button>
  </div>
  ```
- **Reusability:** High (Home meal time, Food Details "Add to Meal", Recipes filters).

### 4.5 Food chip (chip cloud)
- **Purpose:** quick-add common foods.
- **Structure:** rounded-full chip, leading emoji/dot + label; wraps.
- **Measurements:** height ~32px (`h-8`), `px-3`, `gap-2`, `rounded-full`, `text-sm`.
- **Recipe:** `<span class="inline-flex h-8 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 text-sm text-neutral-500">🥚 Eggs</span>`
- **Reusability:** High.

### 4.6 Food list row (Recently Logged)
- **Purpose:** logged/loggable food item.
- **Structure:** `[thumb] [title + subtitle] [kcal] [+ button]`.
- **Measurements:** card `rounded-2xl border p-3`, thumb ~48px (`h-12 w-12 rounded-xl`), trailing `+` ~32px `rounded-full`, row gap `gap-3`.
- **Recipe:**
  ```html
  <div class="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
    <div class="h-12 w-12 rounded-xl bg-neutral-200"></div>
    <div class="min-w-0 flex-1">
      <p class="text-sm font-semibold text-neutral-900">Greek Yogurt</p>
      <p class="text-xs text-neutral-400">1 cup · 150g</p>
    </div>
    <span class="text-sm font-semibold text-neutral-900">130<span class="block text-xs font-normal text-neutral-400">kcal</span></span>
    <button class="grid h-8 w-8 place-items-center rounded-full bg-neutral-100"><PlusIcon class="h-5 w-5 text-neutral-900" /></button>
  </div>
  ```
- **Icon note:** the inline quick-add button uses the plain **`PlusIcon`** glyph (the button already renders the circle). The **Add *action*** elsewhere — nav FAB, primary "add" — uses **`PlusCircleIcon`** per the confirmed mapping.
- **Reusability:** High.

### 4.7 Horizontal media card (Suggested for You)
- **Purpose:** suggested item carousel.
- **Structure:** image top, title + kcal + `+` below; horizontal scroll.
- **Measurements:** width ~150px, image ~96px tall, `rounded-2xl`, content `p-3`.
- **Reusability:** Medium.

### 4.8 Badge / tag
- **Purpose:** label on imagery ("High Protein", "Verified", "FEATURED", "Low Calorie", meal tags).
- **Structure:** rounded-full pill, optional leading icon; overlaid on image or inline.
- **Measurements:** `h-6`, `px-2.5`, `text-xs font-semibold` (style T8), `rounded-full`.
- **Variants (flat, no opacity):** on-image (`bg-white text-neutral-900`) · solid (`bg-neutral-900 text-white`).
- **Reusability:** High.

### 4.9 Macro bar (Food Details)
- **Purpose:** show macro magnitude.
- **Structure:** label left, value right, thin track with fill below (or inline).
- **Measurements:** track `h-1.5 rounded-full bg-neutral-200`, fill `bg-neutral-900`.
- **Recipe:**
  ```html
  <div>
    <div class="flex justify-between text-xs"><span class="text-neutral-500">Protein</span><span class="font-semibold text-neutral-900">31g</span></div>
    <div class="mt-1 h-1.5 rounded-full bg-neutral-200"><div class="h-full w-3/4 rounded-full bg-neutral-900"></div></div>
  </div>
  ```
- **Note:** the fill width (`w-3/4`) is a **placeholder only** — not derived from data. Use any proportional value.
- **Reusability:** High. Shared by the Food Details macro bars and the Impact-on-Goal **progress bar** (same track + fill). Does **not** cover the 4-column macro row — see **4.20**.

### 4.10 Stepper (quantity / servings)
- **Purpose:** increment/decrement a number.
- **Structure:** `[−] [value] [+]`, minus ghost / plus filled.
- **Measurements:** buttons ~32–36px `rounded-full`, value `text-sm font-semibold`, `gap-3`. *(Button radius `rounded-full` vs `rounded-lg` is unverified — see Phase 9.)*
- **Recipe:**
  ```html
  <div class="flex items-center gap-3">
    <button class="grid h-9 w-9 place-items-center rounded-full border border-neutral-200">−</button>
    <span class="w-8 text-center text-sm font-semibold">1</span>
    <button class="grid h-9 w-9 place-items-center rounded-full bg-neutral-900 text-white">+</button>
  </div>
  ```
- **Reusability:** High (Food Details quantity, Recipe Detail servings).

### 4.11 Selectable size pills (Serving Size)
- Same component as **4.4** segmented pills (100g / 1 piece / 1 oz / Custom). Reuse.

### 4.12 Stat box (Nutrition Summary)
- **Purpose:** compact macro stat.
- **Structure:** icon, big value, small label; 3 across.
- **Measurements:** `rounded-xl bg-neutral-50 p-3`, value `text-base font-bold`, label `text-xs text-neutral-400`.
- **Reusability:** Medium.

### 4.13 Divided detail rows (Fiber/Sodium/…)
- **Purpose:** label↔value pairs.
- **Structure:** `flex justify-between py-3` with `divide-y divide-neutral-100` on parent (canonical). *(`divide-y` vs per-row `border-t` is an equivalent implementation choice — see Phase 9.)*
- **Reusability:** High.

### 4.14 Primary / Secondary buttons
- **Primary (Record / Record Food):** `h-12 rounded-xl bg-neutral-900 text-white text-sm font-semibold` (full width; optional leading icon). *(Record Food + Record are the same recipe. Radius **`rounded-xl`** is confirmed canonical.)*
- **Secondary / outline (Cancel, Load More Recipes):** `h-12 rounded-xl border border-neutral-200 text-neutral-500`.
- **Reusability:** High.

### 4.15 Recipe list row
- **Purpose:** recipe in results.
- **Structure:** `[thumb w/ tag badge] [title + heart] [meta] [stats: time · kcal · protein]`.
- **Measurements:** thumb ~72px `rounded-xl`, card `rounded-2xl border p-3`, stats `text-xs text-neutral-500 gap-3`.
- **Reusability:** High.

### 4.16 Featured media card
- **Purpose:** hero promo recipe.
- **Structure:** full-width image, **flat overlay** (`bg-neutral-900/40`, no gradient), overlaid badge + title + rating/time/kcal.
- **Measurements:** height ~170px *(estimated)*, `rounded-2xl overflow-hidden`.
- **Reusability:** Low (1 instance).

### 4.17 In-page tab bar (Recipe Detail)
- **Purpose:** switch Ingredients/Instructions/Nutrition.
- **Structure:** 3 equal tabs; active label `text-neutral-900`, inactive `text-neutral-400` (style T5). *(Active indicator style — filled pill vs underline — is unverified; see Phase 9.)*
- **Measurements:** `h-10`, `text-sm`.
- **Reusability:** Medium.

### 4.18 Ingredient list row
- **Purpose:** ingredient + amount.
- **Structure:** `[icon tile] [name + note] [amount + per-serving]`.
- **Measurements:** icon tile ~40px `rounded-xl bg-neutral-100`, `py-3`, divided rows.
- **Reusability:** High.

### 4.19 Bottom navigation (see Phase 7).

### 4.20 Macro summary row (4-column)
- **Purpose:** show a recipe's macros at a glance (Recipe Detail) — **distinct from the macro bar (4.9)**.
- **Structure:** 4 equal columns, each = small dot + value + label stacked. No bars/fills.
- **Variants:** 4-up (Carbs / Protein / Fat / Fiber). *(The Nutrition Summary stat box (4.12) is the 3-up boxed cousin; keep them separate.)*
- **Measurements:** `grid grid-cols-4`, `gap-2`, dot `h-2 w-2 rounded-full`, value style T4, label style T7.
- **Recipe:**
  ```html
  <div class="grid grid-cols-4 gap-2 text-center">
    <div class="flex flex-col items-center gap-1">
      <span class="h-2 w-2 rounded-full bg-neutral-300"></span>
      <span class="text-sm font-semibold text-neutral-900">16g</span>
      <span class="text-xs text-neutral-400">Carbs</span>
    </div>
    <!-- Protein · Fat · Fiber … -->
  </div>
  ```
- **Reusability:** Medium (Recipe Detail).

---

## Iconography — Heroicons (canonical)

**The prototype uses [Heroicons](https://heroicons.com) v2 as the *only* icon library.**

- Package: **`@heroicons/react`** (v2). Already installed.
- **Outline is the default:** import from `@heroicons/react/24/outline`.
- **Solid only for selected/active states** when needed: import from `@heroicons/react/24/solid`.
- **Do not mix icon libraries.** No Lucide, no Tabler, no Material, no custom SVGs.
- **Do not create custom SVGs** — only fall back to a custom icon if a required glyph does not exist in Heroicons (none identified so far; flag in Phase 9 if found).

### Sizing (canonical)
| Role | Tailwind | Examples |
|---|---|---|
| Navigation icons | `h-6 w-6` | Bottom-nav tab icons |
| Inline icons | `h-5 w-5` | Search magnifier, in-row chevrons, stat icons |
| Small supporting icons | `h-4 w-4` | Mic in search, badge/meta icons, rating star |
| Feature icons | `h-8 w-8` | Quick-action tiles, empty-state / hero glyphs |

> Icon color follows the text ramp (Phase 0): default `text-neutral-400`/`text-neutral-500`; active `text-neutral-900` or white-on-dark.

### Name mappings
**Confirmed (from decision):**
| Concept | Heroicon |
|---|---|
| Home | `HomeIcon` |
| Search | `MagnifyingGlassIcon` |
| Profile | `UserCircleIcon` |
| Add | `PlusCircleIcon` |

**Derived for icons present in the screenshots but not in the confirmed list** *(closest existing Heroicon — not custom; revisit if wrong, see Phase 9):*
| UI element | Heroicon | Where |
|---|---|---|
| Recipes (nav) | `BookOpenIcon` | Bottom nav |
| Reports (nav) | `ChartBarIcon` | Bottom nav *(per Statistics → ChartBarIcon)* |
| Back | `ChevronLeftIcon` | Detail headers |
| Mic / voice search | `MicrophoneIcon` | Search field |
| Scan barcode | `ViewfinderCircleIcon` | Quick-action card |
| Snap photo | `CameraIcon` | Quick-action card |
| Manual add | `PencilSquareIcon` | Quick-action card |
| Favorite / like | `HeartIcon` (outline) → `HeartIcon` (solid) when active | Food/Recipe detail |
| Filter | `AdjustmentsHorizontalIcon` | Recipes header |
| Share | `ShareIcon` | Recipe detail |
| Notifications | `BellIcon` | (if a bell appears) |
| Rating star | `StarIcon` (solid when filled) | Recipe cards |
| Sort | `ArrowsUpDownIcon` | Recipes "Calories ↑" |
| Calories / energy | `FireIcon` | Recipe kcal |
| Time / duration | `ClockIcon` | Recipe meta |
| Quantity − / + | `MinusIcon` / `PlusIcon` | Steppers |

> The derived rows map screenshot glyphs to the nearest Heroicon. They are **not** custom icons. If a chosen Heroicon reads wrong at build time, treat it as a verification item (Phase 9) — do not substitute another library or hand-draw an SVG.

### Selected/active rule
Use the **solid** variant only to indicate selection/active state where the outline would be ambiguous — e.g. the active bottom-nav tab, a favorited `HeartIcon`, a filled rating `StarIcon`. Everywhere else: outline.

---

## Phase 5 — Radius Inventory

| Usage | Est. px | Tailwind | Notes |
|---|---|---|---|
| Pills / chips / FAB / avatars / circular icon buttons | full | `rounded-full` | Most common |
| Cards (food row, recipe row, action card, media card) | 16px | `rounded-2xl` | Primary card radius |
| Search field, buttons, stat boxes, icon tiles, thumbnails | 12px | `rounded-xl` | Secondary radius |
| Small inner tiles (rare) | 8px | `rounded-lg` | Only if needed |

> Two radii do ~90% of the work: **`rounded-2xl`** (cards) and **`rounded-xl`** (controls/tiles), plus **`rounded-full`** (pills/circles). No custom radius needed.

---

## Phase 6 — Elevation Inventory

| Element | Treatment | Tailwind |
|---|---|---|
| Card border | hairline | `border border-neutral-200` |
| Card shadow | very soft | `shadow-sm` |
| In-card row separators | divider | `divide-y divide-neutral-100` *(canonical; `border-t` equivalent — Phase 9)* |
| Bottom nav | top border only | `border-t border-neutral-200` |
| Sticky action bar (Food Details) | top border | `border-t border-neutral-200 bg-white` |
| FAB (Add) | raised shadow | `shadow-lg` *(no ring)* |
| Image overlay (for legible text) | flat scrim | `bg-neutral-900/40` *(no gradient)* |

> Cards consistently pair **border + `shadow-sm`** (not heavy shadows). Keep elevation flat/subtle. No arbitrary shadow values.

---

## Phase 7 — Navigation Inventory

### Bottom navigation
- **Structure:** fixed bottom bar, 5 items, **raised circular Add (`+`) button** breaking above the bar.
- **Order (left → right):** `Home · Recipes · Add · Reports · Profile` — **Add** is the true-center (3rd slot), raised FAB. *(Confirmed canonical.)*
- **Item:** stacked Heroicon (`h-6 w-6`) + `text-xs` label (style T8); active = `text-neutral-900` + **solid** icon variant, inactive = `text-neutral-400` + **outline** icon variant.
- **Tab icons:** `HomeIcon` · `BookOpenIcon` (Recipes) · `PlusCircleIcon` (Add) · `ChartBarIcon` (Reports) · `UserCircleIcon` (Profile).
- **FAB:** ~56px circle (`h-14 w-14`), filled accent → `bg-neutral-900 text-white`, `rounded-full shadow-lg`, `-translate-y-1/2` *(no ring)*. Renders a `PlusIcon` glyph (`h-7 w-7`) inside the circle; the Add concept maps to `PlusCircleIcon`.
- **Presence:** Home / Food Details / Recipes show it; **Recipe Detail does not** (deep detail).

### Screen headers
- List screens: eyebrow + title, no back, action icon right.
- Detail screens: circular back (left); Food Details keeps a static title header, Recipe Detail overlays back/share/heart **on the hero image**.

### Back navigation
- Circular button, `h-10 w-10 rounded-full`, `bg-neutral-100` (static header) or `bg-white/80` (over image — flat, no blur). Icon: `ChevronLeftIcon` (`h-6 w-6`).

### In-page tabs
- Recipe Detail only: Ingredients / Instructions / Nutrition (segmented, one active).

### Sort / filter triggers
- Recipes: filter icon (top-right, with a small badge dot); inline sort control "Calories ↑" next to result count.

### Floating actions
- The Add FAB is the only floating action. No other FABs.

### Modal / sticky triggers
- Food Details: **sticky bottom action bar** (`Cancel` + `Record Food`) pinned above content — treat as a sticky footer, not a modal.

---

## Phase 8 — Design Token Proposal (Tailwind-oriented)

> Defaults cover everything; **no `tailwind.config.js` extension required**. The **only** intentional arbitrary values in the whole system are the two exact device safe-area insets (`pt-[59px]` / `pb-[34px]`) — real device metrics, not estimates. Every other utility is a Tailwind default.

### Typography scale (used subset)
```
text-xs      → eyebrow, meta, caption, macro/nav/badge labels (T1, T7, T8)
text-sm      → body, card title, links, list kcal, values, tabs (T4, T5, T6)
text-base    → section header, stat-box value (T3, T10)
text-2xl     → page title (T2)
text-3xl     → hero kcal value (T9, estimated)
```
Weights: `font-normal` · `font-medium` · `font-semibold` · `font-bold`.

### Spacing scale (used subset, all defaults)
```
1 (4px)   inner icon gaps / bar height
2 (8px)   chip/pill gaps, label→control
3 (12px)  list card gaps, card padding, action-card gap
4 (16px)  page padding, card stacks
6 (24px)  section spacing
24 (96px) bottom scroll padding (clear nav)
```

### Radius scale
```
rounded-xl   → controls, tiles, thumbnails, buttons, search
rounded-2xl  → cards, media cards
rounded-full → pills, chips, FAB, avatars, circular buttons
```

### Border rules
- Card: `border border-neutral-200`.
- Divider: `border-neutral-100` (or `divide-neutral-100`).
- Inputs/pills (unselected): `border-neutral-200`.

### Elevation rules
- Default card: `shadow-sm` + border.
- Raised only: FAB (`shadow-lg`). Bottom nav = `border-t` only (no shadow).
- Never use shadow > `shadow-sm` on inline cards. No arbitrary shadow values.

### Color tokens (grayscale) — canonical 3-ink text ramp
```
Ink:        neutral-900   (primary/active text, filled buttons/pills, FAB)
Body:       neutral-500   (body copy, ingredient names, labels, unselected control text)
Meta:       neutral-400   (subtitles, captions, eyebrows, placeholders, inactive nav)
Border:     neutral-200
Divider:    neutral-100
Surface:    white
Page bg:    neutral-50
Image:      neutral-200   (solid placeholder)
Overlay:    neutral-900/40 (flat scrim over images)
```
> `neutral-600` and `neutral-700` are **not** used for text. Three inks only: 900 / 500 / 400.

**No `tailwind.config.js` extension is required** — Tailwind v3 defaults cover the entire system.

---

## Phase 9 — Wireframe Readiness Assessment

### ✅ Highly certain (build directly)
- Screen list, hierarchy, and section ordering (all four screens).
- Header pattern (eyebrow + title + corner control; back on details).
- Card system (radius `rounded-2xl`, border + `shadow-sm`).
- Pill/chip system and its selected/unselected states.
- List-row anatomy (thumb + text stack + trailing value + action).
- Spacing rhythm (`px-4`, `space-y-6` sections, `space-y-3`/`gap-3` lists).
- Typography hierarchy and the consolidated scale.
- Bottom-nav anatomy (5 items + raised FAB) and its absence on Recipe Detail.

### ◐ Estimated (reasonable, ±2–4px / ±1 step — kept as estimates, not invented)
- Exact pixel sizes (control heights 36–48px, thumbnails 48/72px, hero ~170–200px).
- **Hero kcal value size** (T9): `text-3xl` assumed; could be `text-2xl`.
- Macro-bar / progress-bar fill percentages (placeholder-only; not from data).
- Featured-card height and media-card carousel width.
- Section gaps where two sections are close (could be `space-y-5` vs `space-y-6`).

### ⚠ Requires manual verification
- **In-page tab active indicator** (Recipe Detail): filled-pill vs. underline.
- **Stepper button radius**: `rounded-full` vs. `rounded-lg`.
- **In-card divider method**: `divide-y` (canonical) vs. per-row `border-t` — functionally equivalent; confirm preference.
- **Derived Heroicon choices** (Recipes→`BookOpenIcon`, Reports→`ChartBarIcon`, Scan→`ViewfinderCircleIcon`, Filter→`AdjustmentsHorizontalIcon`, etc.): nearest existing Heroicon, not custom. Confirm they read correctly; if one is wrong, swap for another **Heroicon** (never another library / custom SVG).

> **Resolved (no longer open):** target frame width = **375px**; gray text ramp = **900/500/400**; Record buttons = **`rounded-xl`**; safe areas = **top 59pt / bottom 34pt**; icon library = **Heroicons v2** (outline default, solid for active); font = **`font-sans` (UI Sans Serif)**, letter-spacing **0% (`tracking-normal`)**.

### ⛔ Cannot be derived from screenshots (needs product/dev input)
- Real color palette (intentionally dropped — grayscale only here).
- Interaction states: hover/press/focus/disabled, transitions, scroll behavior.
- Real data and image assets *(icon set is now resolved → Heroicons; see Iconography section)*.
- Empty / loading / error states.
- Off-screen content (cut-off pills like "Snack"/"Dinner", scrolled-away rows).
- Dark-mode behavior *(font family and letter-spacing are now resolved → `font-sans`, 0%)*.

---

### Implementation note
All recipes above use **Tailwind v3 defaults** with **`font-sans`** (UI Sans Serif) and **`tracking-normal`** (0%). Icons come exclusively from **Heroicons v2** (`@heroicons/react`, outline by default, solid for active states) — no other icon library and no custom SVGs. The **only** arbitrary values are the two exact safe-area insets (`pt-[59px]` / `pb-[34px]`) — real device metrics, not estimates — and no `tailwind.config.js` extension is required. A developer can build every screen from this document without making independent design decisions: substitute solid `bg-neutral-200` blocks for images, flat `bg-neutral-900/40` scrims where text overlays images, and proportional (placeholder) widths for the macro/progress bars. This file is the source of truth — where a value is marked *estimated* or listed under *Requires manual verification*, do not invent a replacement.
