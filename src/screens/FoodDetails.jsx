import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HeartIcon,
  FireIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline'
import {
  MobileFrame,
  Screen,
  ScreenHeader,
  ScreenSection,
  ScrollRow,
  Pill,
  Card,
  Thumbnail,
  Badge,
  Button,
  IconButton,
  Stepper,
  StatCard,
  ProgressBar,
  DetailRow,
  DetailList,
  Text,
  Icon,
} from '../components'

/*
 * Food Details — Screenshot 2, route `/food-detail`.
 *
 * Reached from a Log Food food row. Pushed/modal-style: static back header +
 * heart action, NO BottomNav — instead a sticky Cancel / Record Food footer
 * pinned via MobileFrame's bottomNav slot (the frame's bottom-pin mechanism,
 * used here for the screen-level sticky bar). Composed entirely from the
 * existing library; the sticky footer is screen-level composition, not a
 * library component.
 *
 * Deviation from screen-recreation-plan §"Screen 2": the plan proposes a
 * simplified screen (a 4-col MacroSummary with no bars and the Serving &
 * Quantity card removed). The screenshot (visual source of truth) and
 * component-architecture.md §"How the four screens compose" both show the
 * richer original: 3 macro *bars* (ProgressBar), a Serving & Quantity card
 * (serving-size Pills + Stepper), the Nutrition Summary card, and the
 * Impact-on-Goal card. Per the conflict rule (preserve screenshot
 * structure/density), the original layout is recreated faithfully.
 *
 * Undefined behavior left unbuilt (per plan §"Open verification items"): the
 * Record Food success message is screen-level and visually undefined, so its
 * handler is a no-op here.
 */

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
const SERVING_SIZES = ['100g', '1 piece', '1 oz', 'Custom']

// Macro bars (top card). Fill widths are placeholders, not data (4.9).
const MACROS = [
  { label: 'Protein', value: '31g', fill: 78 },
  { label: 'Carbs', value: '0g', fill: 4 },
  { label: 'Fat', value: '3.6g', fill: 22 },
]

// Nutrition Summary stat boxes (3-up).
const STATS = [
  { value: '31g', label: 'Protein' },
  { value: '0g', label: 'Carbs' },
  { value: '3.6g', label: 'Fat' },
]

// Nutrition Summary detail rows.
const DETAILS = [
  { label: 'Fiber', value: '0g' },
  { label: 'Sodium', value: '74mg' },
  { label: 'Cholesterol', value: '85mg' },
  { label: 'Potassium', value: '256mg' },
]

/* A single macro bar: label + value over a placeholder ProgressBar (4.9). */
function MacroBar({ label, value, fill }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Text variant="body">{label}</Text>
        <Text variant="cardTitle">{value}</Text>
      </div>
      <ProgressBar value={fill} className="mt-1" />
    </div>
  )
}

export default function FoodDetails() {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  // Sticky Cancel / Record Food bar, pinned to the bottom of the frame.
  const stickyFooter = (
    <div className="border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <Button variant="secondary" fullWidth={false} className="px-6" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" leadingIcon={CheckBadgeIcon}>
          Record Food
        </Button>
      </div>
    </div>
  )

  return (
    <MobileFrame bottomNav={stickyFooter}>
      <Screen safeTop>
        <ScreenHeader
          title="Grilled Chicken Breast"
          onBack={() => navigate(-1)}
          action={<IconButton icon={HeartIcon} label="Favorite" />}
        />

        {/* Hero media — full-bleed placeholder with overlaid badges */}
        <ScreenSection bleed>
          <div className="relative h-48 w-full overflow-hidden bg-neutral-200">
            <Badge variant="onImage" className="absolute right-3 top-3">
              High Protein
            </Badge>
            <Badge variant="onImage" leadingIcon={CheckBadgeIcon} className="absolute bottom-3 left-3">
              Verified
            </Badge>
          </div>
        </ScreenSection>

        {/* Calorie summary + macro bars */}
        <ScreenSection>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <Text variant="hero">165</Text>
                  <Text variant="body">kcal</Text>
                </div>
                <Text variant="caption" className="mt-1 block">
                  per 100g serving
                </Text>
              </div>
              <Thumbnail size="md" tone="icon">
                <Icon as={FireIcon} size="feature" />
              </Thumbnail>
            </div>
            <div className="mt-4 space-y-3">
              {MACROS.map((macro) => (
                <MacroBar key={macro.label} {...macro} />
              ))}
            </div>
          </Card>
        </ScreenSection>

        {/* Add to Meal — scrollable meal segments, Breakfast selected */}
        <ScreenSection title="Add to Meal">
          <ScrollRow bleed>
            {MEALS.map((meal, i) => (
              <Pill key={meal} selected={i === 0}>
                {meal}
              </Pill>
            ))}
          </ScrollRow>
        </ScreenSection>

        {/* Serving & Quantity — serving-size pills + quantity stepper */}
        <ScreenSection>
          <Card className="space-y-4">
            <Text as="h2" variant="section">
              Serving &amp; Quantity
            </Text>
            <div>
              <Text variant="body" className="mb-2 block">
                Serving Size
              </Text>
              <div className="flex flex-wrap gap-2">
                {SERVING_SIZES.map((size, i) => (
                  <Pill key={size} selected={i === 0}>
                    {size}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Text variant="body">Quantity</Text>
              <Stepper
                value={qty}
                onDecrement={() => setQty((n) => Math.max(1, n - 1))}
                onIncrement={() => setQty((n) => n + 1)}
              />
            </div>
          </Card>
        </ScreenSection>

        {/* Nutrition Summary — highlight row + 3 stat boxes + detail rows */}
        <ScreenSection>
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <Text as="h2" variant="section">
                Nutrition Summary
              </Text>
              <Text variant="caption">for 1 × 100g</Text>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3">
              <span className="flex items-center gap-2">
                <Icon as={FireIcon} size="inline" className="text-neutral-400" />
                <Text variant="body">Calories</Text>
              </span>
              <Text variant="section">165 kcal</Text>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((stat) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
            <DetailList>
              {DETAILS.map((row) => (
                <DetailRow key={row.label} label={row.label} value={row.value} />
              ))}
            </DetailList>
          </Card>
        </ScreenSection>

        {/* Impact on Daily Goal — remaining + progress + consumed meta */}
        <ScreenSection>
          <Card className="space-y-3">
            <Text as="h2" variant="section">
              Impact on Daily Goal
            </Text>
            <div className="flex items-center justify-between">
              <Text variant="body">Calories remaining</Text>
              <Text variant="cardTitle">1,035 kcal left</Text>
            </div>
            <ProgressBar value={42} />
            <div className="flex items-center justify-between">
              <Text variant="caption">765 / 1,800 kcal consumed</Text>
              <Text variant="caption">+165 kcal</Text>
            </div>
          </Card>
        </ScreenSection>
      </Screen>
    </MobileFrame>
  )
}
