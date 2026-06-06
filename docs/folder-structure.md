# Caloria Wireframe — Component Folder Structure

> Where every reusable building block lives. Components only — no screens, routes, or app logic (see `component-library.md` and `component-architecture.md`). All components are real files under `src/components/`; this document is the map.

## Tree

```
src/
├── lib/
│   └── cn.js                      # className joiner used by every component
│
├── components/
│   ├── index.js                   # library barrel — re-exports all categories
│   │
│   ├── primitives/                # foundational, content-agnostic building blocks
│   │   ├── Text.jsx               # typography (variant → named style)
│   │   ├── Icon.jsx               # Heroicon sizing wrapper
│   │   ├── Card.jsx               # white surface (content / compact padding)
│   │   ├── Divider.jsx            # hairline separator
│   │   ├── Button.jsx             # full-width primary / secondary action
│   │   ├── IconButton.jsx         # circular icon control (header / inline / stepper)
│   │   ├── Badge.jsx              # small label pill (on-image / solid / soft)
│   │   ├── Pill.jsx               # selectable chip (filter / meal / size / food)
│   │   ├── Thumbnail.jsx          # image placeholder or icon tile
│   │   └── index.js
│   │
│   ├── navigation/                # moving between / within screens
│   │   ├── ScreenHeader.jsx       # eyebrow + title + corner action (+ back)
│   │   ├── TabBar.jsx             # in-page tabs (exports TabBar + TabItem)
│   │   ├── index.js               # also re-exports BottomNav (lives at root)
│   │   └── (BottomNav.jsx)        # EXISTING — at components/ root, see note
│   │
│   ├── inputs/                    # interactive entry controls
│   │   ├── SearchInput.jsx        # search field with mic
│   │   └── index.js
│   │
│   ├── lists/                     # rows and row groupings
│   │   ├── SectionHeader.jsx      # section title + action ("See all")
│   │   ├── ListRow.jsx            # generic row (food / recipe / ingredient)
│   │   ├── DetailRow.jsx          # label↔value row (exports DetailRow + DetailList)
│   │   └── index.js
│   │
│   ├── data-display/              # non-interactive (+ stepper) data views
│   │   ├── ProgressBar.jsx        # macro / progress track + fill
│   │   ├── StatCard.jsx           # 3-up nutrition stat box
│   │   ├── MacroSummary.jsx       # 4-column macro row
│   │   ├── Stepper.jsx            # − value + control
│   │   ├── MediaCard.jsx          # image card (horizontal / featured)
│   │   └── index.js
│   │
│   ├── layout/                    # screen scaffolding & spacing
│   │   ├── Screen.jsx             # scroll column (space-y-6, pb-24)
│   │   ├── ScreenSection.jsx      # titled, padded section
│   │   ├── ScrollRow.jsx          # horizontal scroll track
│   │   ├── index.js               # also re-exports MobileFrame (lives at root)
│   │   └── (MobileFrame.jsx)      # EXISTING — at components/ root, see note
│   │
│   ├── MobileFrame.jsx            # EXISTING — 375px phone shell (app entry uses it)
│   └── BottomNav.jsx             # EXISTING — fixed 5-tab bar + Add FAB
│
├── App.jsx                        # EXISTING — routes (screens come later)
├── main.jsx                       # EXISTING — React root
└── index.css                      # EXISTING — Tailwind layers + body font
```

## Notes

- **Existing files are kept in place.** `MobileFrame.jsx` and `BottomNav.jsx` already live at the `components/` root and are imported by `App.jsx`. Moving them would break those imports for no benefit, so they stay put. The `layout/` and `navigation/` barrels **re-export** them so screens still get one consistent import surface:
  ```js
  import { MobileFrame, Screen } from '../components'      // layout
  import { BottomNav, ScreenHeader } from '../components'  // navigation
  ```
- **`lib/cn.js`** is a one-line className joiner (no `clsx`/`tailwind-merge` dependency). It sits in `src/lib/`, not `components/`, because it is not a UI component.
- **Barrels everywhere.** Each category folder has an `index.js`, and `components/index.js` aggregates them. Screens should import from `../components` (or a category barrel); deep paths are an implementation detail.
- **No screens here.** Screen components and route wiring belong in a future `src/screens/` (or stay in `App.jsx`); the inventory's four screens are *compositions* of these blocks, not members of this library.

## Category rationale

| Folder | Holds | Test for membership |
|---|---|---|
| `primitives/` | The smallest reusable pieces; everything else composes them | "Is it content-agnostic and used by other components?" |
| `navigation/` | Header, tabs, bottom bar | "Does it move the user between or within screens?" |
| `inputs/` | Controls the user types into | "Does it capture text/voice input?" |
| `lists/` | Rows and row groupings | "Is it a repeating row or a row's section label?" |
| `data-display/` | Read-out of values (+ the stepper that edits one) | "Does it primarily present data?" |
| `layout/` | Spacing & scaffolding, no visible chrome of their own | "Does it arrange other components?" |
