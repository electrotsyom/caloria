# Caloria — Screen Recreation Plan

> **Purpose:** map the 4 source screenshots to a concrete screen-implementation plan for building **high-fidelity grayscale wireframes** in React + Tailwind CSS v3.
> **This document is a plan only.** No code, no screens, no components are produced here. It maps each screenshot to the existing component library and flags where faithful recreation is hard.
>
> **Sources of truth:** visuals = the 4 screenshots; values = [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md); foundation = [`design-system.md`](./design-system.md); components = [`component-library.md`](./component-library.md) + [`component-architecture.md`](./component-architecture.md).
>
> **Fidelity contract — every wireframe must preserve the screenshot's:** layout · hierarchy · density · navigation patterns · structure. No redesign, no new UX, no color. Grayscale 3‑ink ramp only (`neutral-900` / `neutral-500` / `neutral-400`). Target frame width **375px**.

**Component library status:** all 22 reusable components already exist in `src/components/` and bundle cleanly. **No new components are expected.** Where this plan lists a "New Component Required" it is flagged as *avoidable* — to be composed inline at the screen level, not added to the library.

---

## Route Map

Routes already scaffolded in [`src/App.jsx`](../src/App.jsx) as placeholders. The four screens replace the four placeholders in place; nav-only destinations remain placeholders (out of scope — no screenshots).

| Route | Screen | Source | In scope | Bottom nav | Notes |
|---|---|---|---|---|---|
| `/` | — | — | redirect | — | `Navigate → /log` (existing) |
| `/log` | **Log Food** | Screenshot 1 | ✅ | **hidden** | the single log/add screen (Log and Add merged); the Recipes Add FAB → `/log`; circular **back (←)** to exit |
| `/food-detail` | **Food Details** | Screenshot 2 | ✅ | **hidden** | reached from a Log Food food row; circular **back (←)** to exit |
| `/recipes` | **Recipes (Discover)** | Screenshot 3 | ✅ | **visible (Recipes active)** | **the only screen that shows BottomNav** |
| `/recipe-detail` | **Recipe Detail** | Screenshot 4 | ✅ | **hidden** (deep detail) | reached from a recipe row |
| `/reports` | Reports | — | ⛔ placeholder | (n/a) | no screenshot |
| `/profile` | Profile | — | ⛔ placeholder | (n/a) | no screenshot |
| `*` | Not Found | — | ⛔ placeholder | — | fallback |

> **Merge:** Log Food and Add are **one screen at `/log`** — there is no separate `/add` route. The Add FAB on Recipes navigates to `/log`. It is a pushed/modal-style screen: **circular back, no BottomNav**.
> **BottomNav now appears on `/recipes` only.** Log Food, Food Details, and Recipe Detail all hide it and rely on a back control (header back on Log Food / Food Details, overlay back on Recipe Detail).
> Routes are **flat** (no nested `:id` params) — the wireframes are static recreations, not a data-driven app. Keep the existing path strings so `BottomNav`'s `NavLink` active state keeps working.

---

## Navigation Map

How the user moves between the four in-scope screens. All transitions are wireframe-static (links/buttons present, destinations fixed).

```
        ┌──────────────────────────────────────────────────────────┐
        │  /recipes — Recipes (Discover)   ★ ONLY screen with nav   │
        │  BottomNav: Home · Recipes · [Add FAB] · Reports · Profile│
        └───┬───────────────────────────────────┬──────────────────┘
            │ Add FAB →                          │ tap recipe row / featured card →
            ▼                                    ▼
   ┌──────────────────────┐            ┌───────────────────────┐
   │  /log                │            │  /recipe-detail       │
   │  Log Food            │            │  Recipe Detail        │
   │  back (←) header     │            │  overlay back (←)     │
   │  NO BottomNav        │            │  NO BottomNav         │
   └─────────┬────────────┘            │  sticky Cancel/Record │
             │ tap food row /          │  Food → success msg   │
             │ suggested card →        └───────────────────────┘
             ▼
   ┌──────────────────────┐
   │  /food-detail        │
   │  Food Details        │
   │  back (←) header     │
   │  NO BottomNav        │
   │  sticky Cancel/Record│
   │  Food → success msg  │
   └──────────────────────┘
```

**Navigation elements per screen**
- **Log Food:** circular **back (←)** (header left) → exits to the previous screen; **no avatar, no BottomNav**; inline links `Today` / `See all` / `Clear` (in-page, no route change); food rows + suggested cards → `/food-detail`. Reached via the Recipes Add FAB (→ `/log`).
- **Food Details:** circular **back** (header left) → previous; favorite heart (top-right); sticky footer `Cancel` (back) / `Record Food` (commit → **success message**); **no BottomNav**.
- **Recipes:** **BottomNav (Recipes active) — the only screen showing it**; Add FAB → `/log`; filter icon (top-right, badge dot); inline sort `Calories ↑`; recipe rows + featured → `/recipe-detail`; `Load More` (in-page).
- **Recipe Detail:** overlay **back / heart** on the hero image (**no share**); in-page `TabBar` (Ingredients / Instructions / Nutrition — switches panel, no route change); sticky footer `Cancel` / `Record Food` (→ **success message**). **No BottomNav.**

> Back navigation differs by screen: Log Food & Food Details use a **static header back** (`IconButton soft`); Recipe Detail uses an **overlay back over the image** (`IconButton overlay`). Don't unify them.
> Three of four screens hide the BottomNav and act as pushed/modal screens — only **Recipes** is the rooted, tabbed screen.

---

## Screen 1 — Log Food

- **Screen Name:** Log Food — *Log Food and Add are **one merged screen** at `/log` (no separate `/add` route).*
- **Route:** `/log`. `/` redirects to `/log`; the Recipes Add FAB also navigates to `/log`.
- **Purpose:** Search for food and quickly log/add it. Reached via the Recipes **Add FAB**; behaves as a pushed/modal screen (back to exit, no BottomNav).
- **Screenshot Reference:** Screenshot 1 (`LOG FOOD` eyebrow / "What did you eat?").

### Required Components (reused)
`MobileFrame` (**no** `bottomNav` slot) · `Screen` · `ScreenHeader` (onBack) · `SearchInput` · `ScreenSection` · `SectionHeader` · `ScrollRow` · `Card` (compact, for quick-action tiles) · `Thumbnail` (icon tone + photo) · `Icon` · `Text` · `Pill` (md = meal segments) · `ListRow` (food rows) · `IconButton` (back, inline `+`) · `MediaCard` (horizontal = Suggested).

### New Components Required
None. The 3 quick-action tiles (Scan / Snap / Manual) are composed inline from `Card` compact + `Thumbnail` (icon) + `Text` — **do not** create a `ScanCard`/`ActionCard` component (explicitly deferred in `component-architecture.md`).

### Layout Structure
- **Header:** `ScreenHeader` — eyebrow `LOG FOOD` + title "What did you eat?" + **circular back (←)** (header left, `onBack`). **No avatar / corner action.**
- **Content sections** (vertical `space-y-6` inside `Screen`, each padded `px-4`):
  1. **Search** — `SearchInput` (magnifier + placeholder + trailing mic circle). Full width, below header.
  2. **Quick actions** — 3-up row, `gap-3`: Scan Barcode · Snap Photo · Manual Add. Each = compact `Card` with a centered icon tile (`Thumbnail` icon tone, feature `h-8 w-8` glyph) + label below.
  3. **Meal Time** — `SectionHeader` "Meal Time" + trailing `Today` link; `ScrollRow` of meal `Pill`s (Breakfast selected, Lunch / Dinner / Snack… outline, horizontally scrollable, last clipped).
  4. **Popular Foods** — `SectionHeader` + `See all` link; **vertical list** (`space-y-3`) of `ListRow` food rows: `[Thumbnail photo] [title + "1 cup · 150g"] [kcal value] [+ IconButton]` — **Egg, Banana, Avocado, Milk, Apple, Rice, Broccoli**.
  5. **Recently Logged** — `SectionHeader` + `Clear` link; vertical list (`space-y-3`) of `ListRow` food rows: `[Thumbnail photo] [title + "1 cup · 150g"] [kcal value] [+ IconButton]` (Greek Yogurt, Oatmeal with Berries, Eggs on Toast).
  6. **Suggested for You** — `SectionHeader` + `See all`; `ScrollRow bleed` carousel of horizontal `MediaCard`s (image + title + kcal + `+`), clipped at the right edge.
- **Cards:** quick-action tiles (compact), food rows (compact card) in both Popular Foods and Recently Logged.
- **Lists:** Popular Foods (vertical food rows), Recently Logged (vertical food rows), Suggested (horizontal scroll).
- **Navigation:** circular **back** in the header; **no BottomNav**; inline section links don't navigate; food rows / suggested → `/food-detail`.

### Typography Patterns (design-system §1 tokens)
- Eyebrow `LOG FOOD` → `Text variant="eyebrow"`.
- Title "What did you eat?" → `Text variant="title"` (`<h1>`).
- Section titles ("Meal Time", "Popular Foods", "Recently Logged", "Suggested for You") → `Text variant="section"` (`<h2>`).
- Inline links (`Today` / `See all` / `Clear`) → `Text variant="link"`.
- Food row title → `cardTitle`; subtitle "1 cup · 150g" → `caption`; kcal "130 / kcal" → `cardTitle` value + `caption` unit.
- Meal pill labels → pill internal `text-sm` (md). Quick-action labels → `caption`/`label`.

### Special Notes
- **Popular Foods is now a vertical food-row list** (not a chip cloud) — the same `ListRow` anatomy as Recently Logged. The screen now carries **two stacked food-row lists**; keep their `space-y-3` rhythm identical.
- **Suggested carousel must clip** at the right edge (partial 3rd card visible) — `ScrollRow bleed` so items run flush to the screen edge.
- **No BottomNav and a back button** — `MobileFrame` is used without its `bottomNav` slot; `Screen` need not reserve `pb-24` nav clearance. Easy to forget and accidentally render the nav.
- Meal pills still scroll (`ScrollRow`); only the Popular Foods overflow behavior changed (now a vertical list).
- Highest section count of any screen (6 sections) — density is the main fidelity driver.

### Fidelity Risk: **Low**
All six sections map 1:1 onto existing components with documented composition recipes. With Popular Foods now a plain `ListRow` list (no chip-cloud wrap to tune) and no BottomNav, the only judgment calls are the carousel clip and remembering to omit the nav. No unknowns.

---

## Screen 2 — Food Details

- **Screen Name:** Food Details
- **Route:** `/food-detail`
- **Purpose:** Inspect a single food's nutrition and record it to a meal.
- **Screenshot Reference:** Screenshot 2 (`FOOD DETAILS` / "Grilled Chicken Breast").

### Required Components (reused)
`MobileFrame` (**no** `bottomNav` slot) · `Screen` · `ScreenHeader` (onBack + heart action) · `Badge` (High Protein / Verified) · `Text` (hero kcal) · `MacroSummary` (4-col macros) · `ProgressBar` (goal bar) · `Pill` (md — "Add to Meal" segments) · `Card` (content) · `Stepper` (servings) · `StatCard` (3-up macros) · `DetailRow` + `DetailList` (Fiber/Sodium/Cholesterol/Potassium) · `Button` (primary Record Food / secondary Cancel) · `IconButton` · `Thumbnail`/media placeholder.

### New Components Required
None. The **sticky bottom action bar** (Cancel + Record Food) is composed inline at the screen level — a `flex gap` of two `Button`s in a `border-t` container pinned above content. It is *not* a library component (screen-specific composition, per architecture doc). The hero image is a `bg-neutral-200` placeholder with `Badge`s overlaid.

### Layout Structure
- **Header:** `ScreenHeader` — eyebrow `FOOD DETAILS` + title "Grilled Chicken Breast" + **circular back** (left) + favorite **heart** (right). Static header (not over image).
- **Content sections** (`space-y-4` detail-card stack inside `Screen`):
  1. **Hero media** — full-width `bg-neutral-200` image placeholder, ~`h-44`; overlaid `Badge`s: "High Protein" (top-right), "Verified" (bottom-left).
  2. **Macro summary** — `MacroSummary` 4-col: Carbs 0g · Protein 31g · Fat 3.6g · Fiber 4g (dot + value + label, **no bars**).
  3. **Add to Meal** — `Pill` md segments (Breakfast selected / Lunch / Dinner / Snack…), scrollable.
  4. **Servings + calories** — `Stepper` "2 servings" (− / +) on the left + "640 kcal" (`Text variant="hero"`) on the right with a fire glyph.
  5. **Nutrition Summary** (content `Card`): highlight row "Calories — 165 kcal"; 3-up `StatCard`s (Protein / Carbs / Fat); then a `DetailList` of `DetailRow`s (Fiber 0g, Sodium 74mg, Cholesterol 85mg, Potassium 256mg).
  6. **Impact on Daily Goal** (content `Card`): "Calories remaining" + value, a `ProgressBar`, and "765 / 1,800 kcal consumed" / "+165 kcal" meta.
- **Sticky footer:** `Cancel` (secondary) + `Record Food` (primary — **triggers a success message** on tap; no leading icon) in a `border-t` bar.
- **Cards:** two content cards (`p-4`) — Nutrition Summary, Impact-on-Goal — plus the hero and the inline servings/macro blocks.
- **Lists:** 4-col macro summary, stat boxes (3), detail rows (4).
- **Navigation:** back header + sticky actions; **no BottomNav** (the sticky bar is the only bottom layer).

### Typography Patterns
- Eyebrow / title → `eyebrow` / `title`.
- "640 kcal" (§4) → `hero` at **`text-3xl`** (approved value).
- "765 / 1,800 kcal consumed", "+165 kcal" → `caption`.
- Card section titles ("Nutrition Summary", "Impact on Daily Goal") → `section`.
- `MacroSummary` value ("31g") → `cardTitle`; label ("Protein") → `caption`.
- `Stepper` value ("2 servings") → `cardTitle`.
- StatCard value → `stat`; StatCard label → `caption`.
- DetailRow label → `body`; value → `cardTitle`.

### Special Notes
- **No BottomNav** — only the sticky `Cancel/Record Food` bar sits at the bottom. Reserve enough bottom padding for the sticky bar height so the last card (Impact-on-Goal) isn't hidden; no nav z-order to reconcile.
- **Record Food triggers a success message** (e.g. a confirmation toast/overlay) — not a navigation and not a `PlusCircleIcon`. The success affordance is screen-level behavior, not a library component.
- **Macros are now a `MacroSummary` 4-col row (no bars).** The macro `ProgressBar`s are gone; the **only** `ProgressBar` left is the goal bar in §6 — keep its fill a **placeholder** width, not data.
- **One pill group only:** "Add to Meal" segments (serving-size pills removed with the old Serving & Quantity card).
- The energy/fire glyph near the "640 kcal" value is decorative — map to nearest Heroicon (`FireIcon`), don't hand-draw.

### Fidelity Risk: **Low–Medium**
Lowered from Medium now that the **BottomNav is gone** (no sticky-bar-over-nav double layer) and macros collapse to a single `MacroSummary` row. Remaining drivers: the **success-message** behavior on Record Food (screen-level, undefined visual — a verification item) and reconciling the stacked sections + two content `Card`s. The hero value size is settled at `text-3xl`. All parts map to existing components.

---

## Screen 3 — Recipes (Discover)

- **Screen Name:** Recipes (Discover)
- **Route:** `/recipes`
- **Purpose:** Browse and filter recipes.
- **Screenshot Reference:** Screenshot 3 (`DISCOVER` / "Recipes").

### Required Components (reused)
`MobileFrame` · `BottomNav` · `Screen` · `ScreenHeader` (filter action) · `SearchInput` · `ScrollRow` (filter pill rows) · `Pill` (md filter chips) · `MediaCard` (featured variant) · `SectionHeader` (result count + sort) · `Badge` (recipe meal/diet tags + FEATURED) · `ListRow` (recipe rows) · `Thumbnail` (lg recipe thumb) · `IconButton` (heart on each row) · `Icon` (star / fire / clock / protein meta) · `Text` · `Button` (secondary "Load More").

### New Components Required
None. The result-count-plus-sort line is a `SectionHeader` with an inline sort control in its `action` slot (`Calories ↑` = `Text link` + `ArrowsUpDownIcon`). Recipe rows are `ListRow` with a stats cluster in `trailing`/`subtitle` — no `RecipeRow` component.

### Layout Structure
- **Header:** `ScreenHeader` — eyebrow `DISCOVER` + title "Recipes" + **filter** icon action (top-right, with a small **badge dot**).
- **Content sections:**
  1. **Search** — `SearchInput`.
  2. **Filter pills** — **two** `ScrollRow`s of `Pill` md: row 1 (All selected / Low Calorie / High Protein), row 2 (Any Meal / Breakfast / Lunch / Dinner…). Horizontally scrollable, clipped at the right.
  3. **Featured** — `MediaCard variant="featured"`: full-width image, flat `bg-neutral-900/40` scrim, `Badge` "FEATURED" (top-left), title "Rainbow Buddha Bowl" + rating/time/kcal meta overlaid at bottom.
  4. **Result count + sort** — `SectionHeader` "24 Recipes Found" + trailing sort `Calories ↑`.
  5. **Recipe list** — vertical `space-y-3` of `ListRow` recipe rows: `[Thumbnail lg w/ corner tag Badge] [title + heart] [meta: "Dinner · High Protein"] [stats: ⏱ 25 min · 🔥 320 kcal · 42g P]`. Items: Grilled Lemon Herb Salmon, Berry Overnight Oats, Chicken Veggie Stir Fry, Classic Greek Salad, Avocado Egg Toast, Hearty Lentil Soup.
  6. **Load More** — full-width secondary `Button` "Load More Recipes".
- **Cards:** featured media card; recipe rows (compact card with `lg` thumb).
- **Lists:** two filter pill rows (scroll), recipe list (vertical).
- **Navigation:** `BottomNav` (Recipes active); filter icon + sort are in-page triggers (no wireframe destination).

### Typography Patterns
- Eyebrow / title → `eyebrow` / `title`.
- "24 Recipes Found" → `section`; sort "Calories ↑" → `link`.
- Featured title (over scrim) → white-on-scrim title (the one allowed non-gray ink for legibility); meta → caption-on-scrim.
- Recipe row title → `cardTitle`; meta "Dinner · High Protein" → `caption`; stat cluster (time/kcal/protein) → `caption` with small leading icons (`h-4 w-4`).
- Tag badges ("Low Cal", "Vegan", "Keto", "FEATURED") → `Badge` text (T8, `text-xs font-semibold`).

### Special Notes
- **Two filter rows, both scrollable** — distinct from Log Food's single meal-pill row. Each is its own `ScrollRow`; the second row's leading pill ("Any Meal") shows a different selected state.
- **Featured card is the only `featured` MediaCard instance** in the app — flat scrim (no gradient), white overlay text. Low reuse but already a component variant.
- Recipe rows carry the **densest trailing cluster** in the app: a 3-part stat line (time · kcal · protein) each with its own small icon. Keep icons `h-4 w-4` and `caption` ink so the row doesn't overflow at 375px.
- Each recipe thumb has a **corner tag badge** overlaid (Low Cal / Vegan / Breakfast / Keto) — `Badge onImage` positioned over the `Thumbnail`.
- Filter icon badge dot is decorative state — a small `bg-neutral-900` dot on the `IconButton`.

### Fidelity Risk: **Low–Medium**
Mostly **Low** — straight list composition. The **Medium** lean comes from the recipe row's dense multi-icon stat cluster (must not wrap/overflow at 375px) and the per-thumb corner badges. Both use existing components; the risk is purely fitting the density, not missing a pattern.

---

## Screen 4 — Recipe Detail

- **Screen Name:** Recipe Detail
- **Route:** `/recipe-detail`
- **Purpose:** View a recipe's details and record servings.
- **Screenshot Reference:** Screenshot 4 (full-bleed salmon hero / "Grilled Lemon Herb Salmon").

### Required Components (reused)
`MobileFrame` · `Screen` (**no** `BottomNav`) · `IconButton` (overlay back / heart over image) · `Badge` (Low Calorie / High Protein over image) · `Text` (title + rating + kcal) · `Stepper` (servings) · `MacroSummary` (4-col Carbs/Protein/Fat/Fiber) · `Card` (content — Impact-on-Goal) · `ProgressBar` (goal bar) · `Button` (sticky Record Food primary + Cancel secondary) · `TabBar` + `TabItem` (Ingredients / Instructions / Nutrition) · `ListRow` (`card={false}` ingredient rows) · `DetailList` (ingredient dividers) · `Thumbnail` (sm icon tile per ingredient) · `Icon`.

### New Components Required
None. The **overlay header** (back + heart on the hero) is composed inline from two `IconButton variant="overlay"` over the full-bleed media — explicitly **not** `ScreenHeader` (the architecture doc calls this out). The **sticky bottom action bar** (Cancel + Record Food) is composed inline like Food Details — two `Button`s in a `border-t` bar. The hero is a `bg-neutral-200` placeholder.

### Layout Structure
- **Header:** **none of the standard `ScreenHeader`.** Instead, a full-bleed hero image with overlay controls: **back** (top-left), **heart** (top-right) — **no share** — both `IconButton variant="overlay"` (`bg-white/80`, flat). Title "Grilled Lemon Herb Salmon" + rating "★ 4.8 (132)" + time/difficulty overlaid at the image bottom, plus `Badge`s "Low Calorie" / "High Protein".
- **Content sections** (padded, below the bleeding hero):
  1. **Servings + calories** — `Stepper` "2 servings" (− / +) on the left + "640 kcal" (`Text hero`) on the right with a fire glyph.
  2. **Macro summary** — `MacroSummary` 4-col: Carbs 16g · Protein 84g · Fat 28g · Fiber 4g (dot + value + label, no bars).
  3. **Tabs** — `TabBar` with `TabItem`s: **Ingredients** (active) / Instructions / Nutrition.
  4. **Ingredient list** — `DetailList` of `ListRow card={false}` rows: `[Thumbnail sm icon tile] [name + note] [amount + per-serving]` — Salmon Fillet 300g, Lemon 2 pcs, Fresh Dill 4 tbsp, Olive Oil 2 tbsp, Garlic Cloves 4 cloves, Black Pepper 1 tsp, Sea Salt 1 tsp.
  5. **Impact on Daily Goal** (content `Card`): "Calories remaining" + value, a `ProgressBar`, and "765 / 1,800 kcal consumed" / "+165 kcal" meta.

> **No inline Record button.** The standalone in-flow "Record" from the screenshot is intentionally dropped — recording happens **only** via the sticky `Record Food` footer below, so the screen has a single record action.
- **Sticky footer:** `Cancel` (secondary) + `Record Food` (primary — **triggers a success message** on tap) in a `border-t` bar (same pattern as Food Details).
- **Cards:** one content `Card` (`p-4`) — Impact-on-Goal — plus the hero and inline blocks + divided ingredient list.
- **Lists:** 4-col macro summary; ingredient `DetailList` (divided rows).
- **Navigation:** overlay back/heart; in-page `TabBar` (panel switch, no route change); sticky `Cancel`/`Record Food`. **No `BottomNav`** (deepest detail).

### Typography Patterns
- Title (over image) → `title` rendered white-on-image for legibility.
- Rating "★ 4.8 (132)", "25 min", "Easy" → `caption`-scale with small star/clock icons.
- "640 kcal" → `hero` at **`text-3xl`** (approved value; same as Food Details).
- `Stepper` value "2 servings" → `cardTitle`.
- `MacroSummary` value → `cardTitle`; label → `caption`.
- `TabItem` active → `link` (`text-neutral-900`); inactive → `linkMuted` (`text-neutral-400`).
- Ingredient name → `cardTitle`/`body`; note ("Fresh, skin-on") → `caption`; amount "300g" → `cardTitle`; per-serving "150g/serving" → `caption`.
- Impact-on-Goal: section title → `section`; "Calories remaining" + meta ("765 / 1,800 kcal consumed", "+165 kcal") → `caption`.

### Special Notes
- **No `BottomNav`** — `MobileFrame` is used **without** the `bottomNav` slot; the hero needs full-bleed handling and the sticky `Cancel/Record Food` bar is the only bottom layer. Reserve bottom padding for the sticky bar so Impact-on-Goal isn't hidden. Easy to forget and accidentally render the nav.
- **Single record action:** the screenshot's inline **Record** button is **dropped** — recording happens only through the sticky `Record Food` footer. Do not re-add an in-flow Record button.
- **Record Food triggers a success message** (confirmation toast/overlay) — screen-level behavior, not a navigation, not a library component.
- **Full-bleed hero with overlaid header + title + badges + rating** is the most layered composition in the app: image placeholder, flat `bg-neutral-900/40` scrim for text legibility, **two** overlay icon buttons (back + heart — no share), two badges, and a title/rating block — all stacked. This is the hardest single region to recreate faithfully.
- **TabBar active-indicator style is an OPEN verification item** (underline vs filled pill vs ink-only) — defaults to **ink-only** per the component library. Do not invent an underline/pill until verified.
- Only the **Ingredients** tab content is shown in the screenshot — Instructions / Nutrition panels are off-screen (not in scope; render empty or omit panel content, don't invent it).
- `Stepper` button radius is an **open verification item** (`rounded-full` default).

### Fidelity Risk: **Medium–High**
The **High** factor is the **full-bleed hero overlay header** — back/heart + title + rating + two badges + scrim, all composed inline over a bleeding image, with no standard `ScreenHeader` to lean on. Combined with the **no-BottomNav** exception, the **Impact-on-Goal card + sticky Record Food bar** (the single record action), the **success-message** behavior, and the **unverified TabBar indicator**, this screen has the most assembly-specific decisions and open items. Individual components all exist, but the hero composition plus these open items make exact recreation the least certain of the four.

---

## Component Usage Matrix

Which library component appears on which screen (✅ = used). Confirms reuse and that no screen needs an un-built component.

| Component | Log Food | Food Details | Recipes | Recipe Detail | Reuse |
|---|:--:|:--:|:--:|:--:|---|
| `MobileFrame` | ✅ | ✅ | ✅ | ✅ | 4 |
| `Screen` | ✅ | ✅ | ✅ | ✅ | 4 |
| `Text` | ✅ | ✅ | ✅ | ✅ | 4 |
| `Icon` | ✅ | ✅ | ✅ | ✅ | 4 |
| `IconButton` | ✅ | ✅ | ✅ | ✅ | 4 |
| `Badge` | — | ✅ | ✅ | ✅ | 3 |
| `Pill` | ✅ | ✅ | ✅ | — | 3 |
| `Thumbnail` | ✅ | ✅ | ✅ | ✅ | 4 |
| `Card` | ✅ | ✅ | ✅ | — | 3 |
| `ScreenHeader` | ✅ | ✅ | ✅ | — (overlay inline) | 3 |
| `SearchInput` | ✅ | — | ✅ | — | 2 |
| `SectionHeader` | ✅ | — | ✅ | — | 2 |
| `ScreenSection` | ✅ | ✅ | ✅ | ✅ | 4 |
| `ScrollRow` | ✅ | ✅ | ✅ | — | 3 |
| `ListRow` | ✅ | — | ✅ | ✅ | 3 |
| `MediaCard` | ✅ (horizontal) | — | ✅ (featured) | — | 2 |
| `ProgressBar` | — | ✅ (goal) | — | ✅ (goal) | 2 |
| `StatCard` | — | ✅ | — | — | 1 |
| `DetailRow` / `DetailList` | — | ✅ | — | ✅ | 2 |
| `Stepper` | — | ✅ | — | ✅ | 2 |
| `MacroSummary` | — | ✅ | — | ✅ | 2 |
| `Button` | — | ✅ | ✅ | ✅ | 3 |
| `TabBar` / `TabItem` | — | — | — | ✅ | 1 |
| `BottomNav` | — | — | ✅ | — | **1 (Recipes only)** |

**Observations**
- **Universal core** (every screen): `MobileFrame`, `Screen`, `Text`, `Icon`, `IconButton`, `Thumbnail`, `ScreenSection`. Build/verify these foundations first.
- **High reuse** (3 screens): `Badge`, `Pill`, `Card`, `ScreenHeader`, `ScrollRow`, `ListRow`, `Button`.
- **`BottomNav` is now single-screen** — it appears on **Recipes only**; the other three screens are pushed/modal-style (back control, no nav). This is the biggest change from the prior plan.
- **`MacroSummary` and `ProgressBar` are now shared by Food Details + Recipe Detail** (the two detail screens both carry a 4-col macro row and a goal `ProgressBar` in an Impact-on-Goal card).
- **Single-screen components** (lowest cross-screen risk): `StatCard` (Food Details only); `TabBar`/`TabItem` (Recipe Detail only); `BottomNav` (Recipes only). All already exist — no construction needed, only wiring.
- Every cell is satisfied by an existing component → **the library is complete for these four screens; no new components required.**

---

## Implementation Order

Recommended order, sequenced by (1) building the most-reused composition first to surface integration issues early, and (2) ascending fidelity risk so the hardest screen is done with the most accumulated context.

| # | Screen | Route | Risk | Why this position |
|---|---|---|---|---|
| 1 | **Recipes (Discover)** | `/recipes` | Low–Med | **The only screen with `BottomNav`** and the navigational hub (its Add FAB → Log Food, recipe rows → Recipe Detail). Build it first to stand up the nav scaffolding and exercise the widest set of high-reuse components (`SearchInput`, `ScrollRow`, `Pill`, `ListRow`, `SectionHeader`, `featured` `MediaCard`, `Button`). |
| 2 | **Log Food** | `/log` | Low | Reuses Recipes' `SearchInput` / `ScrollRow` / `Pill` / `ListRow` / `SectionHeader`, adding the horizontal `MediaCard` and the quick-action tiles. First **pushed/no-nav** screen — validates the back-header + no-BottomNav pattern on the simplest layout. Two stacked food-row lists (Popular Foods + Recently Logged). |
| 3 | **Food Details** | `/food-detail` | Low–Med | Introduces the data-display set (`MacroSummary`, `StatCard`, `DetailList`, `Stepper`, goal `ProgressBar`) and the **sticky `Cancel/Record Food` footer + success message** (no BottomNav). Builds on a proven header/card/pill foundation. |
| 4 | **Recipe Detail** | `/recipe-detail` | Med–High | Highest risk + the unique exceptions (full-bleed overlay header with back+heart/no-share, no `BottomNav`, unverified `TabBar` indicator, Impact-on-Goal card + sticky `Record Food` footer as the single record action). Done last so its overlay/sticky special-casing reuses the Food Details footer + the MacroSummary/ProgressBar already built in step 3. |

**Cross-cutting prerequisites (before screen 1):**
- Confirm `MobileFrame` + `Screen` + `BottomNav` scaffolding renders at 375px with correct safe-area insets (`pt-[59px]` / `pb-[34px]`).
- Confirm the **back-header + no-`bottomNav`** pattern (`MobileFrame` used without its `bottomNav` slot) for the three pushed screens.
- Collapse `/log` and `/add` into a **single `/log` route** (remove the separate `/add` route) and point the Recipes Add FAB at `/log`. Replace the `Placeholder` routes in [`src/App.jsx`](../src/App.jsx) **one at a time** as each screen lands, keeping the others so the app always builds.

**Approved assumptions** (settled — build to these, no further verification needed):
- Hero kcal value size: **`text-3xl`** (Food Details §4, Recipe Detail §1).
- Derived Heroicon choices read correctly (filter, scan, reports, etc.) — swap only within Heroicons if a glyph is wrong.

**Open verification items** (from `DESIGN_INVENTORY.md` Phase 9 + this revision — do not invent answers). **Do not implement these until a screenshot or explicit requirement defines them**; until then, fall back to the documented default and leave the behavior unbuilt:
- **Success-message** visual for `Record Food` (Food Details + Recipe Detail) — toast vs overlay vs inline; undefined, screen-level behavior.
- `TabBar` active indicator: ink-only (default) vs underline vs pill (Recipe Detail §3).
- `Stepper` button radius: `rounded-full` (default) vs `rounded-lg`.
- In-card divider method: `divide-y` (default) vs per-row `border-t`.

---

## Summary

- **4 screens** — **Log Food and Add are merged into a single `/log` screen** (no separate `/add` route); the others are `/food-detail`, `/recipes`, `/recipe-detail`.
- **`BottomNav` appears on Recipes only.** Log Food, Food Details, and Recipe Detail are pushed/modal-style: back control + no nav. Recipes is the navigational hub (Add FAB → Log Food; recipe rows → Recipe Detail).
- **0 new components required** — the 22-component library is complete for these screenshots; the only inline compositions are screen-specific (quick-action tiles, the sticky `Cancel/Record Food` footer on Food Details **and** Recipe Detail, the Recipe Detail overlay header), all explicitly deferred from the library by design.
- **`Record Food` triggers a success message** (Food Details + Recipe Detail) — screen-level behavior, not a `PlusCircleIcon` and not a route change.
- **Fidelity risk** order for implementation: Recipes (Low–Med) → Log Food (Low) → Food Details (Low–Med) → Recipe Detail (Med–High).
- The recurring fidelity drivers are **density** (Log Food's 6 sections incl. two food-row lists, Recipes' stat clusters), the **sticky footer + success message** (both detail screens), and the **full-bleed overlay hero + no-nav exception** (Recipe Detail).
- Preserve per the contract: layout, hierarchy, density, navigation patterns, structure — grayscale only, 375px, Tailwind defaults, Heroicons v2.
