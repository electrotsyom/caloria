# Caloria Wireframe — Component Library

> Per-component reference for the reusable React + Tailwind v3 building blocks in `src/components/`. Built to recreate the four source screenshots as **grayscale wireframes** — not a production kit. Source of truth for values: [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md), [`design-system.md`](./design-system.md), [`design-tokens.md`](./design-tokens.md), [`implementation-rules.md`](./implementation-rules.md). Architecture rationale: [`component-architecture.md`](./component-architecture.md).

**Import surface** — one path for everything:
```jsx
import {
  Text, Icon, Card, Divider, Button, IconButton, Badge, Pill, Thumbnail,
  ScreenHeader, TabBar, TabItem, BottomNav,
  SearchInput,
  SectionHeader, ListRow, DetailRow, DetailList,
  ProgressBar, StatCard, MacroSummary, Stepper, MediaCard,
  Screen, ScreenSection, ScrollRow, MobileFrame,
} from '../components'
```

**Global conventions** (apply to every component):
- All visual content slots (`leading`, `trailing`, `action`, `meta`, `badge`) accept React nodes.
- Every component merges a trailing `className` (via `lib/cn.js`) for one-off tweaks.
- No component holds state or data — pass `value` + handlers.
- Icons are Heroicons v2 components passed by reference (e.g. `icon={HeartIcon}`), outline by default, solid for active states.
- Grayscale only; typography only via `Text`. The only arbitrary value used anywhere is the opt-in device inset `pt-[59px]` in `Screen`.

---

# primitives/

## Text

**Purpose** — The single typography primitive. Maps each `variant` to a named style from `design-system.md` §1 so screens never write raw `text-*`/`font-*`.

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | enum | `'body'` | see table below |
| `as` | elementType | `'span'` | render as `h1`, `p`, `div`, … |
| `className` | string | — | passthrough |
| `children` | node | — | |

**Variants**

| `variant` | Style | Classes |
|---|---|---|
| `eyebrow` | Overline | `text-xs font-semibold uppercase text-neutral-400` |
| `title` | Screen title | `text-2xl font-bold text-neutral-900` |
| `section` | Section header | `text-base font-semibold text-neutral-900` |
| `cardTitle` | Card title / inline value | `text-sm font-semibold text-neutral-900` |
| `link` | Action / link / active tab | `text-sm font-medium text-neutral-900` |
| `linkMuted` | Inactive link / tab | `text-sm font-medium text-neutral-400` |
| `body` | Body copy | `text-sm text-neutral-500` |
| `caption` | Subtitle / caption / meta | `text-xs text-neutral-400` |
| `label` | Macro / form label | `text-xs font-medium text-neutral-500` |
| `hero` | Hero kcal value | `text-3xl font-bold text-neutral-900` |
| `stat` | Stat-box value | `text-base font-bold text-neutral-900` |

**Usage**
```jsx
<Text as="h1" variant="title">What did you eat?</Text>
<Text variant="caption">1 cup · 150g</Text>
<Text variant="hero">165 <Text variant="caption">kcal</Text></Text>
```

**Tailwind decisions** — Font family (`font-sans`) and letter-spacing (`tracking-normal`) are set globally on `<body>`, so they are not repeated. Only the five observed sizes are used; `text-lg`/`text-xl` are intentionally absent.

**Accessibility** — Use `as` to emit correct semantic tags (`h1` for the screen title, `h2` for section headers). Color contrast is inherent to the 3-ink ramp.

**Inventory refs** — Phase 3 (T1–T10); `design-system.md` §1.

---

## Icon

**Purpose** — Sizing wrapper around a Heroicons v2 glyph; centralizes the four canonical icon sizes.

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `as` | Heroicon component | — | the glyph, e.g. `HeartIcon` |
| `size` | `nav`/`inline`/`small`/`feature` | `'inline'` | see table |
| `className` | string | — | color override (defaults to `currentColor`) |

**Variants (sizes)**

| `size` | Class | Use |
|---|---|---|
| `nav` | `h-6 w-6` | bottom-nav tabs, back chevron |
| `inline` | `h-5 w-5` | search magnifier, in-row glyphs, stat icons |
| `small` | `h-4 w-4` | mic, badge/meta, rating star |
| `feature` | `h-8 w-8` | quick-action tiles, hero glyphs |

**Usage**
```jsx
import { FireIcon } from '@heroicons/react/24/outline'
<Icon as={FireIcon} size="small" className="text-neutral-400" />
```

**Tailwind decisions** — Returns `null` if `as` is missing (safe in conditional slots). Renders `aria-hidden` because icons here are decorative; labels live on the interactive parent.

**Accessibility** — Always decorative (`aria-hidden`). For an interactive icon, wrap in `IconButton`/`Button` which carry the label.

**Inventory refs** — Iconography §Sizing; `design-system.md` §7.

---

## Card

**Purpose** — The canonical white surface: `rounded-2xl border border-neutral-200 bg-white shadow-sm`.

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `padding` | `content`/`compact`/`none` | `'content'` | `p-4` / `p-3` / none |
| `as` | elementType | `'div'` | |
| `className` | string | — | |

**Variants** — `content` = full-width multi-element cards (`p-4`); `compact` = rows/tiles (`p-3`); `none` = supplies own padding / wraps full-bleed media.

**Usage**
```jsx
<Card padding="content">
  <Text as="h2" variant="section">Nutrition Summary</Text>
  …
</Card>
```

**Tailwind decisions** — Border + `shadow-sm` (never heavier) per the elevation rule. The split padding rule is canonical — do **not** uniformly pad all cards.

**Accessibility** — Neutral container; add `as="section"`/`role` at the screen level when the card is a landmark.

**Inventory refs** — Phase 2 (card padding rule), Phase 5/6; 4.x content cards.

---

## Divider

**Purpose** — Standalone hairline separator (`border-t border-neutral-100`).

**Props** — `className`.

**Usage** — `<Divider className="my-3" />`. For label↔value lists prefer `DetailList`'s `divide-y` instead.

**Tailwind decisions** — `neutral-100` (lighter than the `neutral-200` card border) per §4. `role="separator"`.

**Accessibility** — `role="separator"`.

**Inventory refs** — Phase 6; `design-system.md` §4.

---

## Button

**Purpose** — Full-width action button (Record Food, Cancel, Load More).

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `primary`/`secondary` | `'primary'` | |
| `leadingIcon` | Heroicon | — | optional leading glyph |
| `fullWidth` | bool | `true` | every screenshot button is full width |
| `type` | string | `'button'` | |

**Variants** — `primary` = `bg-neutral-900 text-white`; `secondary` = `border border-neutral-200 text-neutral-500`.

**Usage**
```jsx
import { PlusCircleIcon } from '@heroicons/react/24/outline'
<Button variant="primary" leadingIcon={PlusCircleIcon}>Record Food</Button>
<Button variant="secondary">Load More Recipes</Button>
```

**Tailwind decisions** — `h-12 rounded-xl text-sm font-semibold` confirmed canonical. Radius is `rounded-xl` (not `2xl`).

**Accessibility** — Native `<button>`; text label is the accessible name. Leading icon is `aria-hidden` via `Icon`.

**Inventory refs** — 4.14.

---

## IconButton

**Purpose** — Every circular icon control: header back/avatar/filter, inline row `+`/heart, stepper −/+, overlay controls on a hero image.

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `icon` | Heroicon | — | the glyph |
| `label` | string | — | **required** → `aria-label` |
| `size` | `header`/`inline`/`stepper` | `'header'` | `h-10`/`h-8`/`h-9` square |
| `variant` | `soft`/`overlay`/`filled`/`outline`/`ghost` | `'soft'` | see table |
| `glyphSize` | Icon size | auto | override paired glyph size |

**Variants**

| `variant` | Classes | Use |
|---|---|---|
| `soft` | `bg-neutral-100` | header / inline default |
| `overlay` | `bg-white/80` | controls over a hero image (flat, no blur) |
| `filled` | `bg-neutral-900 text-white` | stepper +, primary inline action |
| `outline` | `border border-neutral-200` | stepper − |
| `ghost` | transparent | bare glyph |

**Usage**
```jsx
import { HeartIcon, ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/outline'
<IconButton icon={ChevronLeftIcon} label="Back" onClick={goBack} />
<IconButton icon={HeartIcon} label="Favorite" size="header" variant="overlay" />
<IconButton icon={PlusIcon} label="Add Greek Yogurt" size="inline" />
```

**Tailwind decisions** — `rounded-full grid place-items-center`. Header glyphs render at `nav` (h-6), inline/stepper at `inline` (h-5). `overlay` uses flat `/80` opacity — no backdrop blur (grayscale, flat scrim rule).

**Accessibility** — `label` is mandatory and becomes `aria-label`; the inline `+` should name its target ("Add Greek Yogurt"). The inner `Icon` is `aria-hidden`.

**Inventory refs** — 4.1 (back), 4.6 (inline +), 4.10 (stepper), Phase 7 (overlay back/share/heart).

---

## Badge

**Purpose** — Small label pill on imagery or inline ("High Protein", "Verified", "FEATURED", meal tags).

**Props** — `variant` (`onImage`/`solid`/`soft`), `leadingIcon`, `className`, `children`.

**Variants** — `onImage` = `bg-white text-neutral-900`; `solid` = `bg-neutral-900 text-white`; `soft` = `bg-neutral-100 text-neutral-500`.

**Usage**
```jsx
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
<Badge variant="onImage">High Protein</Badge>
<Badge variant="onImage" leadingIcon={CheckBadgeIcon}>Verified</Badge>
```

**Tailwind decisions** — `h-6 px-2.5 rounded-full text-xs font-semibold`; flat colors only (no opacity).

**Accessibility** — Decorative label text; not a control. If a badge conveys state needed by assistive tech, ensure the same info is in nearby text.

**Inventory refs** — 4.8.

---

## Pill

**Purpose** — The single selectable rounded-full chip — meal-time segments, recipe filter chips, serving-size pills, and food chips. **No separate FilterChip/MealCard/SizePill.**

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `selected` | bool | `false` | filled vs outline |
| `size` | `md`/`sm` | `'md'` | `h-9 px-4` / `h-8 px-3` |
| `leading` | node | — | emoji string or `<Icon/>` |
| `as` | elementType | `'button'` | |
| `onClick` | fn | — | |

**Variants** — selected = `bg-neutral-900 text-white font-medium`; unselected = `border-neutral-200 bg-white text-neutral-500`. Size `md` for segmented/filter/size pills, `sm` for chip-cloud food chips.

**Usage**
```jsx
<Pill selected>Breakfast</Pill>
<Pill>Lunch</Pill>
<Pill size="sm" leading="🥚">Eggs</Pill>           {/* food chip */}
<Pill size="sm" leading={<Icon as={FireIcon} size="small" />}>High Protein</Pill>
```

**Tailwind decisions** — `rounded-full whitespace-nowrap`; `shrink-0` so it survives inside a `ScrollRow`. Single selected/unselected pair; emphasis via fill, not hue.

**Accessibility** — As a `<button>` it sets `aria-pressed={selected}`. For a single-select group, manage the selected index in the screen and render one selected pill.

**Inventory refs** — 4.4, 4.5, 4.11.

---

## Thumbnail

**Purpose** — Leading image placeholder or icon tile for rows and cards.

**Props** — `size` (`sm`/`md`/`lg`), `tone` (`image`/`icon`), `className`, `children`.

**Variants** — `image` = solid `bg-neutral-200` photo placeholder; `icon` = `bg-neutral-100` host for an `<Icon/>`. Sizes: `sm` 40px, `md` 48px, `lg` 64px (≈72px recipe thumb → nearest default).

**Usage**
```jsx
<Thumbnail size="md" />                              {/* food row photo */}
<Thumbnail size="sm" tone="icon"><Icon as={FireIcon} /></Thumbnail>   {/* ingredient tile */}
```

**Tailwind decisions** — `rounded-xl overflow-hidden grid place-items-center shrink-0`. Real images are intentionally replaced by gray boxes (wireframe rule).

**Accessibility** — Decorative placeholder; no `alt` needed for gray boxes. When a real image is dropped in later, supply `alt`.

**Inventory refs** — 4.3, 4.6, 4.15, 4.18 (leading tiles).

---

# navigation/

## ScreenHeader

**Purpose** — Standard top header: `[back?] [eyebrow + title] [action]`. Covers list headers (avatar/filter) and detail headers (back).

**Props** — `eyebrow`, `title`, `action` (node), `onBack` (fn → shows back button), `className`.

**Variants** — *List*: no `onBack`, `action` = avatar/filter. *Detail*: `onBack` set, `action` = heart.

**Usage**
```jsx
<ScreenHeader
  eyebrow="Log Food" title="What did you eat?"
  action={<IconButton icon={BellIcon} label="Notifications" />}
/>
<ScreenHeader
  eyebrow="Food Details" title="Grilled Chicken Breast"
  onBack={goBack}
  action={<IconButton icon={HeartIcon} label="Favorite" />}
/>
```

**Tailwind decisions** — `flex items-start justify-between px-4 pt-4`. The Recipe Detail "over the image" header is **not** this component — compose `IconButton variant="overlay"` directly over the hero (see MediaCard / screen recipe).

**Accessibility** — Emits an `<h1>` via `Text`. Back and action controls carry their own labels.

**Inventory refs** — 4.1, Phase 7.

---

## TabBar + TabItem

**Purpose** — In-page tabs (Recipe Detail: Ingredients / Instructions / Nutrition).

**Props** — `TabBar`: `className`, `children`. `TabItem`: `active` (bool), `onClick`, `children`.

**Variants** — active ink `text-neutral-900`, inactive `text-neutral-400`. Active-indicator style (underline vs pill) is an **open verification item** — defaulting to ink-only.

**Usage**
```jsx
<TabBar>
  <TabItem active onClick={() => setTab('ingredients')}>Ingredients</TabItem>
  <TabItem onClick={() => setTab('instructions')}>Instructions</TabItem>
  <TabItem onClick={() => setTab('nutrition')}>Nutrition</TabItem>
</TabBar>
```

**Tailwind decisions** — Equal-width tabs (`flex-1 h-10`). No invented underline/pill until verified.

**Accessibility** — `role="tablist"` / `role="tab"` / `aria-selected`. Pair the active panel with `role="tabpanel"` at the screen level.

**Inventory refs** — 4.17, Phase 9 (indicator unverified).

---

## BottomNav (existing)

**Purpose** — Fixed 5-tab bar (`Home · Recipes · Add · Reports · Profile`) with a raised center Add FAB. Re-exported from `navigation/`; file stays at `components/BottomNav.jsx`.

**Props** — none (uses `react-router` `NavLink` for active state).

**Variants** — active tab = `text-neutral-900` + solid icon; inactive = `text-neutral-400` + outline icon. FAB = `h-14 w-14 rounded-full bg-neutral-900 text-white shadow-lg`.

**Usage** — `<MobileFrame bottomNav={<BottomNav />}>…</MobileFrame>`. **Omit on Recipe Detail** (deep detail shows no bottom nav).

**Tailwind decisions** — `border-t border-neutral-200`, no shadow on the bar; only the FAB is raised. Already implemented per inventory.

**Accessibility** — FAB has `aria-label="Add"`; tabs are links with visible labels.

**Inventory refs** — 4.19, Phase 7.

---

# inputs/

## SearchInput

**Purpose** — Search field with leading magnifier + trailing mic (Home, Recipes).

**Props** — `value`, `onChange`, `placeholder`, `trailingIcon` (default `MicrophoneIcon`; `null` to drop), `onTrailingClick`, `trailingLabel`, `className`.

**Variants** — single visual style; configurable trailing control.

**Usage**
```jsx
<SearchInput value={q} onChange={(e) => setQ(e.target.value)}
  placeholder="Search food, brand, or dish…" />
```

**Tailwind decisions** — `h-12 rounded-xl border border-neutral-200 bg-white px-4`; mic in an `h-8 w-8 rounded-full bg-neutral-100` circle. `focus:outline-none` on the input (wireframe; no focus ring styling decided).

**Accessibility** — The trailing button has an `aria-label` (`trailingLabel`). For a labeled field, add an associated `<label>`/`aria-label` at the screen level. *(This is the only text input in the screenshots — there is no generic `TextInput`.)*

**Inventory refs** — 4.2.

---

# lists/

## SectionHeader

**Purpose** — Section title with optional trailing action ("Popular Foods" + "See all").

**Props** — `title`, `action` (node), `className`.

**Usage**
```jsx
<SectionHeader title="Popular Foods"
  action={<button type="button"><Text variant="link">See all</Text></button>} />
```

**Tailwind decisions** — `flex items-center justify-between`; title via `Text variant="section"` (emits `<h2>`).

**Accessibility** — `<h2>` heading; action is a real button with a `Text` link label.

**Inventory refs** — Phase 1 ("See all"/"Today"/"Clear"); used by `ScreenSection`.

---

## ListRow

**Purpose** — The generic horizontal row `[leading] [title/subtitle] [trailing] [action]`. One component for food rows, recipe rows, and ingredient rows.

**Props**

| Prop | Type | Default | Notes |
|---|---|---|---|
| `leading` | node | — | `Thumbnail`/`Icon` tile |
| `title` | string \| node | — | string → `cardTitle`; node for custom (e.g. title + heart) |
| `subtitle` | string \| node | — | string → `caption` |
| `trailing` | node | — | kcal value / amount / stats |
| `action` | node | — | inline `IconButton` |
| `card` | bool | `true` | `true` = compact Card; `false` = `py-3` divided row |

**Variants (composition recipes)**

```jsx
{/* Food row (4.6) — card + photo + kcal + add */}
<ListRow
  leading={<Thumbnail size="md" />}
  title="Greek Yogurt" subtitle="1 cup · 150g"
  trailing={<Text variant="cardTitle">130<Text as="span" variant="caption" className="block">kcal</Text></Text>}
  action={<IconButton icon={PlusIcon} label="Add Greek Yogurt" size="inline" />}
/>

{/* Recipe row (4.15) — card + lg thumb + stats cluster */}
<ListRow leading={<Thumbnail size="lg" />}
  title={<div className="flex items-center justify-between"><Text variant="cardTitle">Grilled Lemon Herb Salmon</Text><IconButton icon={HeartIcon} label="Favorite" size="inline" variant="ghost" /></div>}
  subtitle={<Text variant="caption">Dinner · High Protein</Text>} />

{/* Ingredient row (4.18) — divided, icon tile, amount */}
<DetailList>
  <ListRow card={false}
    leading={<Thumbnail size="sm" tone="icon"><Icon as={FireIcon} /></Thumbnail>}
    title="Salmon Fillet" subtitle="Fresh, skin-on"
    trailing={<Text variant="cardTitle">300g</Text>} />
</DetailList>
```

**Tailwind decisions** — `flex items-center gap-3`; card variant = `Card padding="compact"` (`rounded-2xl border p-3`); plain variant = `py-3` (wrap siblings in `DetailList` for dividers). `min-w-0 flex-1` + `truncate` keep long titles from overflowing.

**Accessibility** — Row is presentational; the `action` button carries the label. If the whole row is tappable, wrap it in a link/button at the screen level.

**Inventory refs** — 4.6, 4.15, 4.18.

---

## DetailRow + DetailList

**Purpose** — Label↔value rows (Nutrition Summary: Fiber / Sodium / Cholesterol / Potassium), with a list wrapper providing dividers.

**Props** — `DetailRow`: `label`, `value`, `className`. `DetailList`: `className`, `children`.

**Usage**
```jsx
<DetailList>
  <DetailRow label="Fiber" value="0g" />
  <DetailRow label="Sodium" value="74mg" />
  <DetailRow label="Cholesterol" value="85mg" />
</DetailList>
```

**Tailwind decisions** — `flex justify-between py-3`; wrapper `divide-y divide-neutral-100` (canonical). Label = `body` ink, value = `cardTitle` ink.

**Accessibility** — Simple text pairs; readable in DOM order.

**Inventory refs** — 4.13.

---

# data-display/

## ProgressBar

**Purpose** — Thin track + fill, shared by Food Details macro bars and the Impact-on-Goal progress bar.

**Props** — `value` (0–100, placeholder), `className`.

**Usage**
```jsx
<div className="flex justify-between text-xs">
  <Text variant="body">Protein</Text><Text variant="cardTitle">31g</Text>
</div>
<ProgressBar value={75} className="mt-1" />
```

**Tailwind decisions** — Track `h-1.5 rounded-full bg-neutral-200`, fill `bg-neutral-900`. Fill width is an **inline `width:%`** (a data value, not a design token) so any proportion works without arbitrary classes; **not** derived from real data.

**Accessibility** — `role="progressbar"` with `aria-valuenow/min/max`.

**Inventory refs** — 4.9 (note: fill is placeholder-only).

---

## StatCard

**Purpose** — Compact 3-up macro stat box inside the Nutrition Summary card.

**Props** — `icon` (Heroicon), `value`, `label`, `className`.

**Usage**
```jsx
<div className="grid grid-cols-3 gap-3">
  <StatCard value="31g" label="Protein" />
  <StatCard value="0g" label="Carbs" />
  <StatCard value="3.6g" label="Fat" />
</div>
```

**Tailwind decisions** — `rounded-xl bg-neutral-50 p-3 text-center`; value `stat` (T10), label `caption` (T7). Distinct from `MacroSummary` (unboxed 4-col).

**Accessibility** — Text value + label readable in order; icon decorative.

**Inventory refs** — 4.12.

---

## MacroSummary

**Purpose** — 4-column macro row (Recipe Detail: Carbs / Protein / Fat / Fiber), dot + value + label, no bars or boxes.

**Props** — `items` (`[{ value, label }]`), `className`.

**Usage**
```jsx
<MacroSummary items={[
  { value: '16g', label: 'Carbs' }, { value: '84g', label: 'Protein' },
  { value: '28g', label: 'Fat' },   { value: '4g',  label: 'Fiber' },
]} />
```

**Tailwind decisions** — `grid grid-cols-4 gap-2 text-center`; dot `h-2 w-2 rounded-full bg-neutral-300`; value `cardTitle`, label `caption`.

**Accessibility** — Plain text columns in DOM order.

**Inventory refs** — 4.20.

---

## Stepper

**Purpose** — `[−] value [+]` quantity/servings control.

**Props** — `value`, `onDecrement`, `onIncrement`, `decrementLabel`, `incrementLabel`, `className`.

**Usage**
```jsx
<Stepper value={qty}
  onDecrement={() => setQty((n) => Math.max(1, n - 1))}
  onIncrement={() => setQty((n) => n + 1)} />
```

**Tailwind decisions** — `flex items-center gap-3`; minus = `IconButton variant="outline"`, plus = `variant="filled"`, both `h-9 w-9 rounded-full` (radius is an open verification item, defaulting to `rounded-full`). Value `w-8 text-center cardTitle`.

**Accessibility** — Each button has a descriptive `aria-label`; value text reflects current count. (For full a11y, screens may add `aria-live` on the value.)

**Inventory refs** — 4.10, Phase 9 (button radius unverified).

---

## MediaCard

**Purpose** — Image-led card with two layouts: `horizontal` (Suggested-for-You carousel item) and `featured` (Recipes hero promo).

**Props** — `variant` (`horizontal`/`featured`), `title`, `meta` (node), `badge` (node), `action` (node), `className`, `children`.

**Variants**
- `horizontal`: `w-40` card, `h-24` image, title + meta + `action` below.
- `featured`: full-width `h-44` image, flat `bg-neutral-900/40` scrim, `badge` top + title/meta overlaid bottom (white text on scrim).

**Usage**
```jsx
{/* Suggested (horizontal) */}
<MediaCard title="Grilled Salmon" meta="208 kcal"
  action={<IconButton icon={PlusIcon} label="Add Grilled Salmon" size="inline" />} />

{/* Featured */}
<MediaCard variant="featured" title="Rainbow Buddha Bowl"
  badge={<Badge variant="onImage">FEATURED</Badge>}
  meta="★ 4.9 · 20 min · 380 kcal" />
```

**Tailwind decisions** — Image is `bg-neutral-200`. Heights use nearest defaults (`h-24`, `h-44`) for the inventory's estimates. Scrim is flat (no gradient). White text on the scrim is the one allowed non-gray ink (legibility), per the overlay rule.

**Accessibility** — Gray placeholder needs no `alt`; the `action` button carries a label. Featured title is visible text over the scrim.

**Inventory refs** — 4.7, 4.16.

---

# layout/

## MobileFrame (existing)

**Purpose** — 375px phone shell, centered on desktop, with a scroll area and a bottom-nav slot. File at `components/MobileFrame.jsx`; re-exported from `layout/`.

**Props** — `children`, `bottomNav` (node).

**Usage** — `<MobileFrame bottomNav={<BottomNav />}>{screen}</MobileFrame>`.

**Tailwind decisions** — `w-[375px]` frame (the device width — the frame itself, not screen content). Already implemented.

**Inventory refs** — Phase 0 (375px target), Phase 7.

---

## Screen

**Purpose** — The scrollable content column inside the frame: vertical rhythm + bottom clearance.

**Props** — `safeTop` (bool → adds `pt-[59px]`), `className`, `children`.

**Variants** — default (header supplies top padding) vs `safeTop` (begins under a status bar).

**Usage**
```jsx
<Screen>
  <ScreenHeader … />
  <ScreenSection title="Popular Foods">…</ScreenSection>
  …
</Screen>
```

**Tailwind decisions** — `space-y-6` (24px section rhythm) + `pb-24` (clear the nav). `px-4` is owned by header/sections so media can bleed. `pt-[59px]` is the one allowed arbitrary value (exact device inset), opt-in.

**Accessibility** — Plain scroll container; landmarks come from its children.

**Inventory refs** — Phase 2 (safe areas, section spacing, bottom padding).

---

## ScreenSection

**Purpose** — A titled, padded content block within `Screen`.

**Props** — `title`, `action` (node), `bleed` (bool), `className`, `children`.

**Variants** — padded (default) vs `bleed` (no `px-4`, for content that extends to the edges).

**Usage**
```jsx
<ScreenSection title="Recently Logged"
  action={<button type="button"><Text variant="link">Clear</Text></button>}>
  <div className="space-y-3">{/* ListRows */}</div>
</ScreenSection>
```

**Tailwind decisions** — `px-4` + `SectionHeader` with `mb-3` (12px header→content). Section-to-section spacing is the parent `Screen`'s `space-y-6`. For bleeding carousels keep the section padded and let the inner `ScrollRow` use `bleed`.

**Accessibility** — Emits `<section>`; the header `<h2>` labels it.

**Inventory refs** — Phase 2 (section header → content, section spacing).

---

## ScrollRow

**Purpose** — Horizontal scroll track for pills, chips, and media-card carousels.

**Props** — `bleed` (bool → `-mx-4 px-4`), `className` (override `gap`), `children`.

**Usage**
```jsx
<ScrollRow>{/* meal Pills, gap-2 */}</ScrollRow>
<ScrollRow bleed className="gap-3">{/* MediaCards flush to edges */}</ScrollRow>
```

**Tailwind decisions** — `flex gap-2 overflow-x-auto`; `bleed` lets the first/last item sit flush to the screen edges from inside a `px-4` section.

**Accessibility** — Native horizontal scroll; ensure items remain reachable (no scroll-snap traps added).

**Inventory refs** — Phase 2 (chip/pill gaps), 4.7 (carousel).

---

## Build / verification

- All 22 components bundle cleanly (`esbuild` parse + resolve check passed) and the project `vite build` succeeds.
- No `tailwind.config.js` change was needed — defaults cover everything; the only arbitrary class is `pt-[59px]` (opt-in, in `Screen`).
- Dependencies used: `react`, `@heroicons/react` (v2). No new packages added.

## Ready for screen implementation

The four screens (Log Food, Food Details, Recipes, Recipe Detail) can now be built purely by **composing** these components — the composition recipes are in `component-architecture.md` §"How the four screens compose". No new UI patterns should be invented; if a screen seems to need one, re-check the consolidation map first.
