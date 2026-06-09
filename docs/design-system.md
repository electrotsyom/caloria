# Caloria — Design System

> **Status:** canonical. This is the single source of truth for design tokens, scales, and foundational rules. It supersedes the token tables previously duplicated across [`design-tokens.md`](./design-tokens.md) and [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md) (retained as historical wireframe references — see [Deprecations](#11-deprecations--merges)). Component contracts live in [`component-library.md`](./component-library.md).

Caloria ships as **two prototypes that share one component library**:

| Prototype | Route prefix | Visual direction | Theme file |
|---|---|---|---|
| **Caloria** (final product) | `/caloria/*` | Dark "Cosmic · Linear" — near-black surfaces, single amber accent, hairline borders, glass elevation | `src/themes/caloria.css` |
| **Wireframe** (baseline) | `/wireframe/*` | Light greyscale 3-ink wireframe | none (Tailwind defaults) |

The **components are identical** for both prototypes. The Caloria look is produced **entirely by `src/themes/caloria.css`**, a color/elevation-only recolor scoped to `.theme-caloria`. No component hard-codes a Caloria color; the theme remaps the greyscale Tailwind utilities the components emit. This keeps one component implementation and lets the wireframe stay a faithful greyscale baseline.

---

## 1. Token architecture

Tokens are **semantic and theme-aware**. A component emits a neutral Tailwind utility (e.g. `bg-white`); each theme resolves it to a concrete value. The Caloria theme defines its values as **CSS custom properties** on `.theme-caloria` (in `caloria.css`) so every rule references a token, not a literal.

```
component utility   →   wireframe value   →   caloria token       →   caloria value
bg-white                white                 --clr-surface           #181818
text-neutral-900        neutral-900           --clr-ink               #c8c8c8
bg-neutral-900 (fill)   neutral-900           --clr-accent            #e2a32a
border-neutral-200      neutral-200           --clr-border            rgba(255,255,255,.08)
```

**Rule:** never write a raw hex/rgba in a component or screen. In components use the neutral Tailwind utility; in `caloria.css` use a `var(--clr-*)` token. To retune the theme, edit a token — not its consumers.

---

## 2. Color tokens

The mapping below is exhaustive. "Wireframe utility" is what the component emits; "Caloria token/value" is what `caloria.css` resolves it to.

### Surfaces

| Caloria token | Value | Wireframe utility | Role |
|---|---|---|---|
| `--clr-backdrop` | `#050505` | `bg-slate-100` | Desktop canvas around the phone frame |
| `--clr-sunken` | `#0c0c0c` | `bg-neutral-50`, `w-[375px]` | Phone screen background, sunken fills |
| `--clr-surface` | `#181818` | `bg-white` | Cards, search, buttons, badges (the default surface) |
| `--clr-surface-raised` | `#202020` | `bg-neutral-100` | Chips, icon tiles, mic circle |
| `--clr-surface-placeholder` | `#242424` | `bg-neutral-200` | Image placeholders, progress-bar tracks |
| `--clr-surface-strong` | `#2e2e2e` | `bg-neutral-300` | Strongest neutral fill (macro dots) |

### Ink (text) — 3-step ramp

| Caloria token | Value | Wireframe utility | Role |
|---|---|---|---|
| `--clr-ink` | `#c8c8c8` | `text-neutral-900`, `text-neutral-700` | Primary text, titles, values, filled-chip label |
| `--clr-body` | `#8f8f8f` | `text-neutral-500` | Body copy, row labels |
| `--clr-meta` | `#666666` | `text-neutral-400` | Captions, eyebrows, subtitles, placeholders |
| `--clr-ink-hover` | `#a0a0a0` | `hover:text-neutral-600` | Nav-tab hover ink |

> `text-neutral-900` and `text-neutral-700` resolve to the **same** ink — there is no fourth text step. White (`text-white`) is intentionally left untouched by the theme so it stays legible on the amber accent and on image scrims.

### Accent — single brand color

| Caloria token | Value | Wireframe utility | Role |
|---|---|---|---|
| `--clr-accent` | `#e2a32a` | `bg-neutral-900` (fills) | Add FAB, filter dot, selected-control label, accent fills |
| `--clr-accent-hover` | `#c08b24` | `hover:bg-neutral-700` | Accent hover |

> Amber is the **only** non-neutral hue in the system. Use it for exactly one thing per screen: the primary call-to-action / current selection. Never introduce a second accent.

### Lines, scrim & glass

| Caloria token | Value | Wireframe utility | Role |
|---|---|---|---|
| `--clr-border` | `rgba(255,255,255,.08)` | `border-neutral-200` | Hairline border (cards, inputs, dividers) |
| `--clr-border-subtle` | `rgba(255,255,255,.06)` | `border-neutral-100`, `divide-neutral-100` | Fainter in-card divider |
| `--clr-scrim` | `rgba(0,0,0,.45)` | `bg-neutral-900/40` | Flat image scrim for legible overlay text |
| `--glass-bg` | `rgba(24,24,24,.85)` | `bg-white/80`, `bg-white/90` | Translucent floating surface |
| `--glass-blur` | `blur(8px)` | — | Backdrop blur behind glass elements |
| `--elevation-glass` | `0 10px 15px -3px rgba(0,0,0,.45), 0 4px 6px -4px rgba(0,0,0,.45)` | — | Lifting shadow for floating glass |

---

## 3. Typography

One primitive owns all type: the **`Text`** component (`src/components/primitives/Text.jsx`). Screens pick a `variant`; they never write raw `text-*` / `font-*`. Family is `font-sans` and tracking is `tracking-normal`, both set globally on `<body>`. Hierarchy is expressed through **weight**, not hue.

| Variant | Style | Used for |
|---|---|---|
| `eyebrow` | `text-xs font-semibold uppercase` · meta ink | Overlines (LOG FOOD, DISCOVER) |
| `title` | `text-2xl font-bold` · primary ink | Screen / page title (`<h1>`) |
| `section` | `text-base font-semibold` · primary ink | Section header (`<h2>`) |
| `cardTitle` | `text-sm font-semibold` · primary ink | Card title / inline value |
| `link` | `text-sm font-medium` · primary ink | Action / link / active tab |
| `linkMuted` | `text-sm font-medium` · meta ink | Inactive link / tab |
| `body` | `text-sm` · body ink | Body copy, row labels |
| `caption` | `text-xs` · meta ink | Subtitle / caption / meta |
| `label` | `text-xs font-medium` · body ink | Macro / form labels |
| `hero` | `text-3xl font-bold` · primary ink | Hero kcal value |
| `stat` | `text-base font-semibold` · primary ink | Stat-box value |
| `statLabel` | `text-sm` · meta ink | Stat-box label |

**Type scale (the only sizes in use):** `text-xs` (12) · `text-sm` (14) · `text-base` (16) · `text-2xl` (24) · `text-3xl` (30). **Weights:** normal / medium / semibold / bold. No other sizes or weights — add a `Text` variant rather than a one-off size. `text-lg`/`text-xl` are intentionally unused.

---

## 4. Spacing scale

Tailwind's default 4px scale, restricted to the steps actually used. Hierarchy follows proximity: outer containers get more space than inner elements.

| Token | px | Use |
|---|---|---|
| `1` | 4 | Inner icon gaps, progress-bar height |
| `2` | 8 | Chip/pill gaps, label → control |
| `3` | 12 | List-item gaps, compact card padding |
| `4` | 16 | Page padding (`px-4`), content-card padding, detail-card stacks |
| `6` | 24 | Between major sections (`space-y-6`) |
| `24` | 96 | Bottom scroll clearance for the nav (`pb-24`) |

Canonical rhythm: page gutter `px-4` · major sections `space-y-6` · lists `space-y-3`/`gap-3` · chips `gap-2`.

---

## 5. Radius scale

| Token | Tailwind | px | Use |
|---|---|---|---|
| `radius-card` | `rounded-2xl` | 16 | Cards, media cards |
| `radius-control` | `rounded-xl` | 12 | Inputs, tiles, thumbnails, stat boxes |
| `radius-sm` | `rounded-lg` | 8 | Small inner tiles (rare) |
| `radius-pill` | `rounded-full` | — | Pills, chips, FAB, avatars, circular buttons, **and all Caloria primary action buttons** |

> **Caloria divergence (resolved):** in the wireframe, primary buttons are `rounded-xl` (12px). In **Caloria**, the floating primary action (Record) and the serving input are pilled to `rounded-full` to match the round stepper buttons and glass controls. This is a deliberate theme rule in `caloria.css`, not a per-screen override. **In Caloria, the primary action button is a pill.**

---

## 6. Elevation, shadow & glass

Caloria has exactly **three** elevation levels. Prefer borders over shadows.

| Level | Treatment | Use |
|---|---|---|
| **Flat** | `--clr-surface` + `1px` `--clr-border` | Default — cards, inputs, rows, badges. The resting state of almost everything. |
| **Accent** | `--clr-accent` fill | The single amber CTA / current selection per screen. No shadow. |
| **Glass** | `--glass-bg` + `1px` `--clr-border` + `--elevation-glass` + `--glass-blur` | **Floating controls only**: hero overlay buttons (back/share/favorite), the floating Record button, the sticky header back button, the bottom-nav pill. |

**Glass rule:** the glass treatment is defined **once** in `caloria.css` (a single grouped selector) and is the *only* place blur + lifting shadow appear. Use it strictly for elements that float over scrolling content or imagery. In-flow cards stay Flat.

**Image scrim:** overlay text on a photo sits on a flat `--clr-scrim`. No gradients.

---

## 7. Borders & dividers

- **Card / input border:** `1px` solid `--clr-border` (hairline). Every resting surface carries a border, not a shadow.
- **In-card divider:** `--clr-border-subtle` via `divide-y` (canonical) — used by `DetailList`.
- **Bottom nav / sticky bars:** in the wireframe these are `border-t` only; in Caloria the nav becomes a floating glass pill (no top border).

---

## 8. Iconography

- **Library:** Heroicons v2 **only** (`@heroicons/react`). Outline by default; solid for active/selected states. No other icon set, no hand-drawn SVGs. (`PlantIcon` is the one sanctioned exception — a custom leaf glyph for the "carbs/plant" macro where no Heroicon fits.)
- **Sizing:** always via the `Icon` component's `size` prop — never hand-written `h-*`/`w-*`.

| `Icon` size | px | Use |
|---|---|---|
| `nav` | 24 | Bottom-nav tabs, header back chevron |
| `feature` | 32 | Quick-action tiles, hero glyphs |
| `inline` | 20 | Search magnifier, in-row glyphs, stat icons |
| `small` | 16 | Mic, badge/meta, rating star |
| `tiny` | 12 | Dismiss × on compact chips |

> **Caloria divergence:** bottom-nav tab icons render at 20px (down from 24px) to fit the shorter 56px glass pill — a theme rule in `caloria.css`, not a component change.

- **Color:** icons inherit `currentColor` from their text context; the `Icon` component is `aria-hidden`. Icon-only controls must pass a `label` (→ `aria-label`).

---

## 9. Imagery & backgrounds

- **Wireframe:** no real imagery — solid `bg-neutral-200` placeholders everywhere (`Thumbnail`, `MediaCard`, hero blocks render the placeholder tone when no `src` is passed).
- **Caloria:** curated Unsplash photography, art-directed for a calm, premium, atmospheric feel (warm + neutral tones, soft directional light, dark ceramic/wooden surfaces, single subject). Sourced from `src/lib/foodImages.js`; one photo per food, **reused across screens for cohesion** (the salmon ties the Recipes row to the Recipe Detail hero; the grilled chicken ties the Log Food rows to the Food Details hero). See [[image-art-direction]] and [[linear-screens-imagery]].
- **Delivery:** a single Unsplash id serves all sizes via the `u(id, w)` helper (`auto=format&fit=crop&q=80`) — a 1200px hero and a 200px thumb from one source.
- **Failure degrades gracefully:** the placeholder tone sits *behind* every image, so a failed load shows the surface tone, never an empty box.
- **Legibility:** photos carrying overlaid text (featured card, detail heroes) sit under the flat `--clr-scrim`; white text stays legible.

---

## 10. Layout & safe areas

| Token | Value | Use |
|---|---|---|
| Frame width | `375px` | `MobileFrame` |
| Safe top | `pt-[59px]` | Status-bar inset (`Screen safeTop`, hero controls) |
| Safe bottom | `env(safe-area-inset-bottom)` | Sticky footers, nav |
| Page gutter | `px-4` | Owned by `ScreenHeader` / `ScreenSection` |
| Section rhythm | `space-y-6` | `Screen` between sections |
| Nav clearance | `pb-24` | `Screen` bottom padding |
| Card padding | `p-4` content / `p-3` compact | Never uniform across all cards |

`pt-[59px]` and the `env(safe-area-inset-bottom)` insets are the only arbitrary values allowed.

---

## 11. Deprecations & merges

Resolved during the cleanup that produced this doc:

- **Single source of truth.** Token tables formerly duplicated in `design-tokens.md` and `DESIGN_INVENTORY.md` are consolidated here; **this doc wins on any conflict.**
- **Glass treatment consolidated.** The translucent-surface + hairline + shadow + blur block was copy-pasted 3× in `caloria.css` with raw values; now one grouped selector referencing `--glass-*` / `--elevation-glass`.
- **Floating-footer consolidated.** The two identical "transparent click-through footer" blocks (Recipe Detail + Food Details) are merged into one grouped rule.
- **Glass surface unified.** `bg-white/80` (`.80`) and `bg-white/90` (`.85`) both resolve to the single `--glass-bg` (`.85`) token. (In Caloria they never rendered at two opacities — the detail screens already overrode `.80`→`.85`.)
- **All theme literals tokenized.** Every hex/rgba in `caloria.css` is now a `var(--clr-*)` token (≈30 literals removed).
- **`implementation-rules.md` reconciled.** Its "greyscale only / no brand color" mandate is scoped to the **wireframe baseline**; the Caloria theme layers dark surfaces + amber via tokens. See the banner there.

### Open items for human review

- **Hero kcal size** (`text-3xl`) and **stepper-button radius** (`rounded-full`) were "estimated/unverified" in the wireframe inventory and are now locked to these values. Confirm against a source design if one exists.
- **Charts, Modals, Empty states, Profile elements** have no reference in the current prototype. They are specced from existing tokens in `component-library.md` but **not implemented** — they need a design pass before building.
