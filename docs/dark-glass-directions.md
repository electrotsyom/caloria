# Caloria — Dark Glassmorphism Visual Directions

> **Status:** Exploration / direction-setting only. **Not** a full design system, not an implementation spec.
> **Scope rule (non-negotiable):** these directions re-skin the **visual layer only**. Layout, information architecture, user flows, component anatomy, spacing rhythm (`px-4` · `space-y-6` · `gap-3`), radii (`rounded-2xl`/`rounded-xl`/`rounded-full`), and the 375px mobile frame from [`DESIGN_INVENTORY.md`](./DESIGN_INVENTORY.md) and [`design-system.md`](./design-system.md) are **frozen**. We are choosing a *mood*, not redrawing screens.
> **Reference screen for all four:** the Recipes (Discover) screen — [`src/screens/Recipes.jsx`](../src/screens/Recipes.jsx).

## Mandatory constraints (apply to all 4 directions)

- Dark theme only — **no** light variants proposed here.
- Glassmorphism-inspired surfaces — **no** flat design, **no** Material elevation, **no** skeuomorphism.
- Layered translucent cards; depth via blur + transparency, not via heavy drop shadows or bevels.
- Modern, premium aesthetic; mobile-first (touch targets, thumb reach, 375px).
- Usability + accessibility preserved (text contrast on glass is the central risk — addressed per direction).

## The shared challenge: glass + legibility

Every direction has to solve the same tension. Glass surfaces are translucent, so whatever sits *behind* a card bleeds through and attacks text contrast. The recipe screen is text-dense (six rows of rating/time/kcal/protein metadata at `text-xs`). So each direction defines a **scrim contract**: a near-opaque "content plate" tier for anything carrying small text, reserving the more transparent, blurrier glass for chrome (header, nav, pills, hero overlay) where type is large or sparse. This is the difference between "glass that looks good in a screenshot" and "glass you can read on a moving bus."

WCAG target: body/meta text holds **≥ 4.5:1** against the *effective* (post-blur, post-tint) surface color; large text and non-text UI hold **≥ 3:1**. Accent colors are used for emphasis and state, **never** as the sole carrier of meaning (kcal numbers also use weight, matching the existing 3-ink logic).

---

# Direction 1 — Aurora Wellness

**One line:** calm, breathing, spa-at-night. Soft aurora gradients drift behind frosted panels that feel like they're floating in still air.

### Color palette direction
- **Base canvas:** deep desaturated blue-green-black. `#0A0F0D → #0E1512` vertical wash (near-black, faint green undertone so it reads "botanical," not "tech").
- **Aurora field (the signature):** very low-opacity blooms of teal `#3FB59B`, soft jade `#7FD1A6`, and a cool aqua `#5FC9D6`, plus one warm counterpoint of muted coral `#E8A487` low in the stack. These live *behind* glass, never on it.
- **Accent:** single restful mint-jade `#6FE3B5` for selected pills, the Add FAB, kcal emphasis, active nav. Warm coral reserved as a rare secondary (e.g. "Featured" badge only).
- **Text inks (3, mirroring the grayscale ramp):** primary `#F2F7F4` (near-white, faint green), body `#A8B7B0`, meta `#74837C`.

### Surface treatment
Frosted, lightly tinted-green glass. Cards are **layered translucent panels** that appear to hover a few millimetres above the aurora. Content rows use a denser "plate" so metadata stays crisp; the hero and header use thinner, dreamier glass so the aurora glows through.

### Glass characteristics
- High blur, low saturation boost — soft and milky rather than crisp and optical. The blur smears the aurora into gentle color fields behind text.
- Edges catch a faint cool highlight (top) and dissolve into shadow (bottom), reinforcing "floating."

### Elevation system (4 tiers — depth by blur + tint, not shadow weight)
1. **Canvas** — the aurora gradient (no blur; it *is* the backdrop).
2. **Chrome glass** — header, bottom nav, filter pills: blur 24px, tint ~12% — most translucent.
3. **Content plate** — recipe rows, search field: blur 16px, tint ~64% — near-opaque, reads first.
4. **Hero** — featured Buddha Bowl card: photo + blur 20px scrim, aurora glow leaking around the corners.

### Illustration / imagery style (Unsplash)
Soft, natural-light, shallow-depth food and produce; misty/airy compositions; lots of negative space. Search terms: `overhead healthy bowl soft light`, `fresh herbs dark moody minimal`, `matcha calm`, `still life produce pastel`. Treatment: slight desaturation + a 6–8% teal multiply so photos sit inside the palette rather than fighting it.

### Motion principles
Slow, organic, "breathing." Aurora blooms drift on a 20–40s loop. Cards settle in with a gentle blur-to-focus + 8px rise (no bounce). Pill selection = soft glow swell. Everything eased `cubic-bezier(0.22, 1, 0.36, 1)`; nothing snaps.

### Why it works for the product
Calorie tracking carries anxiety and guilt for many users. A calm, non-judgmental, almost meditative surface lowers the emotional stakes and frames the app as *wellness*, not *surveillance*. The drifting aurora gives life without demanding attention — it rewards lingering.

### Trade-offs
- Soft, milky glass is the **hardest on small-text contrast** — leans heavily on the content-plate tier; if a designer thins those plates "to look prettier," the metadata rows break.
- Animated gradients cost battery/GPU; needs a reduced-motion path (freeze the aurora).
- Risk of reading "generic spa/meditation app" if the palette drifts too pastel — the near-black base and single jade accent are what keep it premium.

### Glass system (Aurora)
| Property | Chrome glass (header/nav/pills) | Content plate (rows/search) | Hero overlay |
|---|---|---|---|
| **Background layers** | aurora canvas → translucent tint | aurora → 1 solid scrim → tint | photo → green multiply → scrim |
| **Blur** | `backdrop-blur` ~24px | ~16px | ~20px (bottom band only) |
| **Opacity (tint)** | 10–14% white-green | 58–66% (`#0E1512` base) | 0→55% bottom gradient |
| **Border** | 1px `rgba(255,255,255,0.10)` top-lit | 1px `rgba(255,255,255,0.06)` | none / hairline at base |
| **Glow** | inner top highlight `rgba(160,255,220,0.12)` | none (keep text clean) | soft jade bloom behind corners |
| **Shadow** | none — depth from blur + tint + edge-light | none | none (rely on photo + scrim) |
| **Accent use** | selected pill fill = jade @ 90% (no glow) | kcal value jade, `+` button jade (no glow) | Featured badge = coral, rating star jade |

---

# Direction 2 — Neon Performance

**One line:** athletic, high-contrast, "you hit your macros." Dark obsidian glass cut with vibrant neon edges and achievement glow.

### Color palette direction
- **Base canvas:** true near-black graphite `#070708 → #0D0E12`, faint cool cast. Minimal ambient color so neon pops.
- **Accents (dual, energetic):** electric lime `#C6FF3A` (primary — progress, kcal, "win") + hot magenta/violet `#7B5CFF` (secondary — interactive/selected). Optional alert amber `#FFB020` for "over budget."
- **Text inks:** primary `#FFFFFF`, body `#B6BAC4`, meta `#7C8190`. Neon used for *data*, never for body copy.

### Surface treatment
Dark optical glass — crisper and more "engineered" than Aurora. Cards read like smoked acrylic with a lit edge. Strong contrast between the black canvas and bright accent strokes creates an energetic, scoreboard-like feel.

### Glass characteristics
- Lower blur, **higher clarity + slight saturation boost** — surfaces feel like polished panels, not mist.
- Signature is the **edge**: a 1px neon-gradient border (lime→violet) that lights up on active/selected state.
- Accent **glow** is the elevation cue — active elements emit light.

### Elevation system (light = elevation)
1. **Canvas** — graphite, faint vignette.
2. **Panel glass** — rows/cards: blur 12px, tint ~70%, hairline neutral border.
3. **Active/elevated** — selected pill, FAB, in-focus card: gains a neon edge + outer accent glow (the higher it is, the brighter it glows).
4. **Hero** — featured card with a bold lime data badge and a neon underline on stats.

### Illustration / imagery style (Unsplash)
High-contrast, dramatic-lit, bold food photography; grilled/protein/performance subjects; dark backgrounds with a single hard light. Search: `grilled salmon dark dramatic`, `high protein meal black background`, `gym nutrition bold`, `studio food hard light`. Treatment: punch contrast, deepen blacks so photos blend into the canvas, optional lime rim-light accent.

### Motion principles
Fast, snappy, rewarding. Selection = instant neon edge ignite + 1.02 scale tick. Progress/kcal numbers count up. Logging a recipe fires a brief glow pulse ("achievement"). Springy easing `cubic-bezier(0.34, 1.56, 0.64, 1)` with small overshoot. Motion is *feedback*, celebrating action.

### Why it works for the product
Speaks directly to fitness/macro-focused, goal-driven users — the segment most willing to pay. High contrast = maximum at-a-glance legibility of numbers (kcal, protein, time), which is exactly what this audience scans for. The achievement glow turns logging into a dopamine loop, driving retention.

### Trade-offs
- Neon-on-black can fatigue the eye over long sessions and feels "loud" — wrong for users who find tracking stressful (the opposite of Aurora).
- Saturated accents risk failing contrast as *text* — must stay on data/large elements; body copy stays neutral.
- Most aggressive look → narrowest audience; least "calm-wellness," most "gym app."

### Glass system (Neon)
| Property | Panel glass (rows/cards) | Active / elevated | Hero overlay |
|---|---|---|---|
| **Background layers** | graphite → smoked tint | panel + accent glow | photo → black multiply → scrim |
| **Blur** | ~12px | ~12px | ~16px |
| **Opacity (tint)** | 66–74% (`#0D0E12`) | 70% + lit edge | 0→60% bottom |
| **Border** | 1px `rgba(255,255,255,0.08)` | 1.5px neon gradient lime→violet | hairline + lime accent rule |
| **Glow** | none at rest | outer `0 0 24px rgba(198,255,58,0.35)` | lime data-badge glow |
| **Shadow** | `0 6px 24px rgba(0,0,0,0.5)` | shadow + colored glow combined | `0 14px 44px rgba(0,0,0,0.6)` |
| **Accent use** | kcal/protein lime, selected = violet | active edge + glow = lime/violet | Featured badge lime, stat underline |

---

# Direction 3 — Cosmic Minimalism

**One line:** quiet luxury. Vast dark space, sparse content, barely-there glass — the premium of restraint.

### Color palette direction
- **Base canvas:** deep cosmic charcoal-indigo `#0B0C10 → #111018`, a whisper of warm dust at the bottom. Faint star/grain texture optional.
- **Accent:** almost none — a single refined champagne-platinum `#D8C9A8` (or cool pearl `#E6E8EF`) used sparingly for the one element that matters per view (selected pill, FAB). Color is the exception, not the rule.
- **Text inks:** primary `#F4F4F6`, body `#9A9CA6`, meta `#65676F`. Hierarchy carried by **space and weight**, barely by color.

### Surface treatment
The **most subtle glass** of the four — surfaces are felt more than seen. Cards are defined by a faint luminance shift and a hairline edge rather than an obvious tint. Generous empty space does the heavy lifting; the screen breathes around a few precise elements.

### Glass characteristics
- Medium blur, **very low tint** — glass that's almost a clean pane. The depth cue is a delicate edge-light and a long, soft shadow, not opacity.
- Refinement over effect: no neon, no drift. One catch-light on each panel edge, like machined metal.

### Elevation system (separation by hairline + space, not stacking)
1. **Canvas** — cosmic field, optional grain.
2. **Whisper glass** — rows/cards: blur 18px, tint ~40%, defined by a top edge-light + long shadow.
3. **Singular focus** — exactly one accented element per screen (e.g. selected filter, or the FAB) sits subtly forward.
4. **Hero** — featured card kept restrained: smaller type, lots of dark margin, photo as a quiet window.

### Illustration / imagery style (Unsplash)
Minimal, fine-art, single-subject food on dark/empty backgrounds; lots of negative space; muted, sophisticated tones. Search: `minimal food dark background negative space`, `single ingredient still life moody`, `fine dining plating dark`, `ceramic bowl shadow`. Treatment: desaturate, lift no shadows, let the subject float in black — photo edges fade into the canvas.

### Motion principles
Minimal and exact. Slow fades, slight parallax on scroll (content drifts subtly over the cosmic field for depth). No bounce, no glow pulse. Transitions are short and linear-ish but unhurried; the feeling is *precision*, like a high-end OS. Reduced-motion barely changes anything.

### Why it works for the product
Positions Caloria as a **premium, design-led** product — the "quiet luxury" of the category. Sparse layouts reduce cognitive load: users see only what matters, which suits at-a-glance daily check-ins. Strong differentiator vs. busy, gamified competitors; signals "for people with taste," supporting a higher price point.

### Trade-offs
- Sparseness can read as **empty or unfinished** to mainstream users, and risks under-using the screen for a data-rich list (six recipe rows want a bit more structure than minimalism naturally offers).
- Near-invisible glass + low-color accents make **state and affordance** harder — selected vs. unselected, tappable vs. static must be very carefully tuned or accessibility suffers.
- Lowest "delight" factor; relies entirely on craft. Sloppy execution looks plain, not luxurious.

### Glass system (Cosmic)
| Property | Whisper glass (rows/cards) | Singular focus | Hero overlay |
|---|---|---|---|
| **Background layers** | cosmic field → faint tint | same + subtle lift | photo → deep multiply → minimal scrim |
| **Blur** | ~18px | ~18px | ~14px |
| **Opacity (tint)** | 34–44% (`#111018`) | 46% | 0→45% bottom |
| **Border** | 1px `rgba(255,255,255,0.05)` + top edge-light | 1px `rgba(216,201,168,0.30)` | hairline only |
| **Glow** | none | faint champagne edge sheen | none |
| **Shadow** | `0 12px 48px rgba(0,0,0,0.4)` long/soft | same | `0 16px 56px rgba(0,0,0,0.5)` |
| **Accent use** | virtually none (neutral inks) | the one champagne element | Featured badge pearl, rating star pearl |

---

# Direction 4 — Digital Companion

**One line:** friendly and alive. Glass with personality — softer shapes, warmer light, a little playful, like a helpful buddy rather than a dashboard.

### Color palette direction
- **Base canvas:** warm deep plum-navy `#12101A → #1A1726` (warmer + friendlier than the others; never cold).
- **Accents (warm, multi-hue but harmonized):** soft coral `#FF8A7A`, sunny apricot `#FFC46B`, friendly periwinkle `#8AA0FF` — used as gentle, rounded color pops and soft gradient fills. Selected/primary = coral→apricot gradient.
- **Text inks:** primary `#F6F1F4`, body `#B7AEC0`, meta `#857C92` (slightly warm-tinted neutrals).

### Surface treatment
Glass that feels **soft and pillowy**. Same `rounded-2xl` radii as the system, but the *visual* treatment — gentle inner glow, warm tint, soft blurred color blobs peeking behind cards — makes surfaces feel friendly and tactile rather than clinical. Approachable, not corporate.

### Glass characteristics
- Medium-high blur, warm tint, **soft diffuse glow** inside panels (subtle gradient light from top, like sun through frosted glass).
- Playful supporting touches: small soft blurred color orbs drifting behind the canvas; a friendly micro-mascot/illustration slot is *possible* in empty states (without altering layout). Rounded, bubbly accent fills.

### Elevation system (cozy stacking with warm glow)
1. **Canvas** — warm plum gradient + a few soft blurred color orbs.
2. **Companion glass** — rows/cards: blur 18px, warm tint ~62%, soft inner top-glow.
3. **Interactive lift** — pills/FAB/buttons: warm gradient fill, gentle glow, springy on press.
4. **Hero** — featured card with a warm color wash and a friendly rounded badge.

### Illustration / imagery style (Unsplash)
Bright, cheerful, approachable food; colorful bowls, smoothies, fruit; warm natural light; human/lifestyle hints (hands holding a bowl). Search: `colorful smoothie bowl bright`, `hands holding healthy food warm`, `cheerful breakfast flat lay`, `fruit colorful playful`. Treatment: keep warmth and saturation, add a subtle warm gradient tint so photos feel inviting. Optionally pair with simple rounded vector accents in empty states.

### Motion principles
Bouncy, characterful, friendly — but restrained enough to stay premium. Cards drift in with a soft spring; the FAB does a gentle idle "wiggle"/breathe to feel alive; success = a warm glow + tiny celebratory motion. Color orbs float lazily behind. Spring easing with mild overshoot; reduced-motion keeps the warmth, drops the wiggle.

### Why it works for the product
Maximizes **approachability and daily habit-building**. A friendly companion lowers the barrier to consistent logging — the single biggest predictor of retention in tracking apps. Warm personality differentiates from cold, clinical competitors and broadens appeal to casual/beginner users intimidated by hardcore macro tools (the opposite end of Neon's audience).

### Trade-offs
- Personality is polarizing: serious/performance users may find it **not "pro" enough**; playfulness must be dialed carefully to avoid feeling childish or undermining the premium goal.
- Warm multi-hue accents + soft glow are the **trickiest to keep accessible** — warm low-contrast colors on warm dark backgrounds need vigilant contrast checking.
- Most moving/animated parts → highest performance + reduced-motion burden of the four.

### Glass system (Companion)
| Property | Companion glass (rows/cards) | Interactive lift | Hero overlay |
|---|---|---|---|
| **Background layers** | warm plum + color orbs → warm tint | glass + warm gradient fill | photo → warm multiply → scrim |
| **Blur** | ~18px | ~16px | ~18px |
| **Opacity (tint)** | 56–64% (`#1A1726`) | gradient 85–95% | 0→55% bottom |
| **Border** | 1px `rgba(255,255,255,0.09)` warm | 1px `rgba(255,180,140,0.35)` | rounded hairline |
| **Glow** | soft inner top-glow `rgba(255,200,150,0.10)` | outer warm glow `0 0 20px rgba(255,138,122,0.30)` | warm bloom behind corners |
| **Shadow** | `0 10px 36px rgba(20,10,30,0.45)` | shadow + warm glow | `0 14px 44px rgba(20,10,30,0.5)` |
| **Accent use** | kcal coral, selected = coral→apricot | gradient fills + warm glow | Featured badge apricot, star coral |

---

# Flat variants — Aurora · Flat & Cosmic · Flat

> **Deliberate departure:** these two variants intentionally set aside the "no flat design" guardrail at explicit request, as a contrast study against the glass originals. They are **alternatives**, not replacements — the glass versions remain the primary directions. Layout/IA/flow stay frozen as always.

The flat variants ask: *what does each direction look like with the glass removed?* They strip every depth cue that depends on translucency and keep only the palette and the calm/minimal intent:

- **No backdrop blur** (`blur: 0`) — surfaces are opaque, not frosted.
- **No translucent layering** — cards are **solid** colors, one flat step lighter than the canvas.
- **No glow, no drop shadow, no ambient blooms/stars** — depth comes purely from flat color steps + a faint hairline.
- **Flat accent fills** — selected pills and the FAB are solid color blocks, no gradient or halo.

| Aspect | Aurora · Flat | Cosmic · Flat |
|---|---|---|
| **Canvas** | solid `#0C120F` (green-black) | solid `#0E0E14` (indigo-black) |
| **Card / chrome surface** | solid `#161F1A` | solid `#17161E` |
| **Hairline** | `rgba(255,255,255,0.04)` (separation only) | `rgba(255,255,255,0.04)` |
| **Accent** | flat jade `#5FD3A6` fill | flat champagne `#D8C9A8` fill, pearl `#E6E8EF` FAB |
| **Blur / glow / shadow / ambient** | all removed | all removed |
| **Imagery** | unchanged (hero + thumbs) | unchanged (hero + thumbs) |

**Why it can work:** flat solid surfaces are cheaper to render (no `backdrop-filter` cost), more predictable for accessibility (contrast is computed against a *known* solid color, not a variable blurred backdrop), and read as crisp and modern. The flat step removes the legibility risk the scrim-contract exists to manage.

**Trade-offs:** it forfeits the premium "depth" that motivated the glass brief in the first place — the surfaces feel more conventional and less distinctive, and the two directions look *closer to each other* without their signature glass behaviors (Aurora's drifting blooms, Cosmic's starfield). Flat raises the bar on **color, type, and spacing** to carry the personality the material used to.

## How each direction maps onto the (frozen) Recipes screen

Same elements, four moods — nothing moves:

| Recipes element | Aurora | Neon | Cosmic | Companion |
|---|---|---|---|---|
| **Header** (DISCOVER + filter dot) | thin jade-frost bar, dot = jade | graphite bar, dot = lime glow | near-invisible, dot = pearl | warm-frost bar, dot = coral |
| **Search field** | content-plate frost | smoked panel, violet focus ring | whisper pane | soft warm pane |
| **Filter pills** | selected = jade glow | selected = neon edge | selected = lone champagne | selected = coral→apricot gradient |
| **Featured "Buddha Bowl"** | aurora bloom behind, dreamy | bold lime data badge | quiet dark window | warm wash, rounded badge |
| **Recipe rows** (×6) | dense plate, jade kcal | dense panel, lime kcal/protein | sparse whisper, neutral kcal | warm plate, coral kcal |
| **Sort / "24 Recipes"** | soft meta | crisp white + lime arrow | minimal, spacious | friendly warm meta |
| **Load More button** | ghost frost | neon-edge ghost | hairline ghost | soft pill, gentle glow |
| **Bottom nav + Add FAB** | jade FAB, frosted bar | lime-glow FAB | pearl FAB, whisper bar | coral-gradient FAB, warm bar |

---

## Reference inspiration → how we *learn* from it (never imitate)

The brief's references are used only as proof points for sophistication — Caloria must look like itself.

| Reference | What we take (the *principle*) | Where it shows up |
|---|---|---|
| **Apple Vision Pro UI** | Glass as a real material — light, depth, blur done with restraint and legibility | The whole glass + scrim-contract approach; Cosmic's refinement |
| **Nothing OS** | Confident dark canvas, dot-matrix/monochrome rigor, "less but better" | Cosmic Minimalism; the disciplined accent rule |
| **Arc Browser** | Playful gradients + glass that still feels premium and productive | Aurora's drifting gradients; Companion's warmth |
| **Reflect** | Calm, focused, content-first dark surfaces; typography-led hierarchy | Aurora's calm; the 3-ink restraint across all |
| **Oura** | Wellness-grade dark UI, soft data viz, non-judgmental tone | Aurora's emotional framing; soft data treatment |
| **Linear Dark Mode** | Precision, crisp hierarchy, tasteful subtle glow on dark | Neon's crispness; Cosmic's exactness |
| **Spotify** | Bold accent-on-dark, photographic energy, confident contrast | Neon's accent-on-black; photographic hero treatment |

> Borrow the *grammar* (material honesty, restraint, accent discipline, photographic confidence), never the *vocabulary* (no copied components, gradients, or layouts).

---

## Accessibility & feasibility notes (all directions)

- **Scrim contract is mandatory:** any surface carrying `text-xs` metadata uses the near-opaque content-plate/panel tier, not the translucent chrome tier. Verify body/meta ≥ 4.5:1, large/non-text ≥ 3:1 against the *effective* surface.
- **Accent never sole signal:** kcal/state also encoded by weight/position (consistent with the existing 3-ink logic).
- **`prefers-reduced-motion`:** each direction freezes ambient motion (aurora drift, orbs, idle wiggle, count-ups) and keeps only essential transitions.
- **Performance budget:** `backdrop-blur` is GPU-costly on mobile — cap concurrently-blurred layers (chrome + visible cards), avoid blurring long scrolling lists per-row where a single plate tint suffices. Neon glow and Companion orbs need the tightest budgeting.
- **Frozen system honored:** all four keep the documented radii, spacing, type scale, icon set (Heroicons v2), and component anatomy. Only color, surface, blur, glow, shadow, motion, and imagery treatment change.

## Recommendation (for discussion, not a decision)

- **Aurora Wellness** is the safest fit for the *category's emotional reality* (reducing tracking anxiety) and the strongest "premium wellness" story.
- **Neon Performance** wins the *power-user / paid* segment and at-a-glance data legibility, at the cost of breadth and calm.
- **Cosmic Minimalism** is the boldest *brand* play and the hardest to execute; highest ceiling, highest risk.
- **Digital Companion** maximizes *retention via approachability* and beginner appeal; needs careful tuning to stay premium.

A common next step is to prototype the Recipes screen in **Aurora** and **Neon** first — they sit at opposite emotional poles and will most quickly reveal which direction the product wants to own.
