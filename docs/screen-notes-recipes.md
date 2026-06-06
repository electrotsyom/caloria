# Screen Notes — Recipes (Discover)

> Screen 1 of the implementation order. Route `/recipes`, Screenshot 3.
> File: [`src/screens/Recipes.jsx`](../src/screens/Recipes.jsx).

## Screenshot → implementation mapping

| Screenshot region | Implementation |
|---|---|
| Status bar (9:41 + signal/wifi/battery) | Reserved as blank top safe-area via `Screen safeTop` (`pt-[59px]`) — not recreated (see Deviations). |
| `DISCOVER` eyebrow + **Recipes** title + filter icon (badge dot) | `ScreenHeader` eyebrow/title + `action` = `IconButton` (`AdjustmentsHorizontalIcon`) wrapped with an absolutely-positioned `bg-neutral-900` dot. |
| Search field | `ScreenSection` › `SearchInput` (placeholder "Search recipes…", default mic trailing). |
| Filter pills, row 1 (All / Low Calorie / High Protein) | `ScreenSection` › `ScrollRow bleed` › `Pill` ×3, leading pill `selected`. |
| Filter pills, row 2 (Any Meal / Breakfast / Lunch / Dinner…) | Second `ScrollRow bleed` › `Pill` ×4, leading pill `selected`; clipped at the right edge by the bleed scroll track. |
| Featured hero (FEATURED badge, "Rainbow Buddha Bowl", ★ 4.9 · 20 min · 380 kcal) | `MediaCard variant="featured"` with `badge` = `Badge onImage`, `meta` = star/clock/fire `Icon`s + text on the flat scrim. Wrapped in a button → `/recipe-detail`. |
| "24 Recipes Found" + "Calories ↑" sort | `ScreenSection` `title` + `action` (button: `Text link` "Calories" + `ArrowsUpDownIcon`). |
| Recipe rows (6) | Inline `RecipeRow` composing `ListRow`: `leading` = `Thumbnail lg` + corner `Badge onImage`; `title` = name + `IconButton` heart (ghost); `subtitle` = meta line + stats cluster (★ rating, `ClockIcon` time, `FireIcon` kcal, protein text). Row → `/recipe-detail`. |
| "Load More Recipes" | `ScreenSection` › `Button variant="secondary"` with `leadingIcon={ArrowPathIcon}`. |
| Bottom nav (Recipes active, raised Add FAB) | `MobileFrame bottomNav={<BottomNav />}` — the only in-scope screen showing the nav. |

## Component usage

Existing library only — **no new components**. Used: `MobileFrame`, `BottomNav`, `Screen`, `ScreenHeader`, `ScreenSection`, `ScrollRow`, `SearchInput`, `Pill`, `MediaCard`, `Badge`, `ListRow`, `Thumbnail`, `IconButton`, `Button`, `Text`, `Icon`. The `RecipeRow`, filter badge-dot, and sort control are screen-level inline compositions (per the plan — no `RecipeRow` component is added to the library).

## Navigation wiring

- Recipe rows + featured card → `/recipe-detail`.
- Add FAB → `/log` (navigation map). **Cross-cutting prerequisite applied:** `BottomNav` FAB target changed `/add` → `/log`, and the standalone `/add` route was removed from `App.jsx`. Each screen now owns its own `MobileFrame` (App no longer wraps all routes in one), so the nav can be shown per-screen.

## Deviations (documented, intentional)

1. **OS status bar not recreated.** The "9:41 + status icons" chrome is modeled by `DESIGN_INVENTORY.md` Phase 2 as a safe-area *inset* (59pt), not as app content. Reproduced as blank space via `Screen safeTop`; no fabricated status-bar component (would be a one-off outside the documented library).
2. **Filter pills are text-only.** The source shows small colored leading glyphs on the filter pills. No Heroicon mapping is documented for them and the color flattens in grayscale, so leading icons are omitted and the labels preserved (avoids inventing icon semantics).
3. **Corner tag badge sizing.** The tag uses the design-system `Badge` (`h-6`, `text-xs`) with `whitespace-nowrap`. On the 64px thumbnail it reads chunkier than the source's smaller tag and may extend slightly past the thumb. Kept to the design-system badge size rather than introducing an arbitrary smaller `text-[10px]` (forbidden by the no-arbitrary-values rule).
4. **Recipe-row stats wrapping.** The rating + time + kcal + protein cluster uses `flex-wrap`; at 375px the protein ("42g P") can wrap to its own line. All values are preserved and density is maintained. Protein carries no leading icon (matches the plan's stat notation, which only ices time/kcal).
5. **Selected filter states.** Row 1 "All" and row 2 "Any Meal" are rendered `selected` (filled) per the plan's "second row's leading pill shows a different selected state"; remaining pills are outline. These are static wireframe states (no filtering behavior — undefined in the screenshots).

## Open verification items touched

None resolved here. Derived Heroicons used and assumed to read correctly (per approved assumptions): `AdjustmentsHorizontalIcon` (filter), `ArrowsUpDownIcon` (sort), `ArrowPathIcon` (load more), `ClockIcon` (time), `FireIcon` (kcal), solid `StarIcon` (rating).
