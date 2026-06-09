import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/cn'
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  HeartIcon,
  FireIcon,
  CheckBadgeIcon,
  PlusCircleIcon,
  CubeTransparentIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import {
  MobileFrame,
  Screen,
  ScreenSection,
  ScrollRow,
  Pill,
  Card,
  Badge,
  Button,
  IconButton,
  Stepper,
  StatCard,
  ProgressBar,
  Toast,
  DetailRow,
  DetailList,
  Text,
  Icon,
  PlantIcon,
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
// The selected serving, shown as a dropdown pill next to the quantity stepper.
const SELECTED_SERVING = 'grams (g)'

// Nutrition Summary stat boxes (3-up).
const STATS = [
  { value: '31g', label: 'Protein', icon: CubeTransparentIcon },
  { value: '0g', label: 'Carbs', icon: PlantIcon },
  { value: '3.6g', label: 'Fat', icon: BeakerIcon },
]

// Nutrition Summary detail rows.
const DETAILS = [
  { label: 'Fiber', value: '0g' },
  { label: 'Sodium', value: '74mg' },
  { label: 'Cholesterol', value: '85mg' },
  { label: 'Potassium', value: '256mg' },
]

/* A meta item over the hero scrim: small icon + white caption text. */
function HeroMeta({ icon, children }) {
  return (
    <span className="flex items-center gap-1">
      <Icon as={icon} size="small" className="text-white" />
      {children}
    </span>
  )
}

export default function FoodDetails({ stickyControls = false, heroImage } = {}) {
  const navigate = useNavigate()
  const [qty, setQty] = useState(100)
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef(null)

  // Record Food is presentational: confirm with a transient success toast that
  // auto-dismisses. (Screen-level behavior.)
  const handleRecord = () => {
    setShowToast(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setShowToast(false), 2500)
  }

  // Clear any pending dismiss timer on unmount.
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  // Sticky Cancel / Record Food bar, pinned to the bottom of the frame, with a
  // success toast floating just above it.
  const stickyFooter = (
    <div className="relative border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <Toast show={showToast}>Food recorded to your log</Toast>
      <div className="flex items-center gap-3 px-4 py-3">
        <Button variant="secondary" fullWidth={false} className="px-6" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" trailingIcon={PlusCircleIcon} onClick={handleRecord}>
          Record
        </Button>
      </div>
    </div>
  )

  // Hero overlay controls — back (left) + favorite (right). With `stickyControls`
  // (the Linear variant) they live in a sticky zero-height layer so they pin to
  // the top while the body scrolls (mirrors RecipeDetail); pointer-events-auto
  // keeps them tappable through the click-through wrapper. Default: a static
  // overlay on the hero (the base /food-detail wireframe, unchanged).
  const heroControls = (
    <>
      <IconButton icon={ChevronLeftIcon} label="Back" variant="overlay" className={stickyControls ? 'pointer-events-auto' : undefined} onClick={() => navigate(-1)} />
      <IconButton icon={HeartIcon} label="Favorite" variant="overlay" className={stickyControls ? 'pointer-events-auto' : undefined} />
    </>
  )

  return (
    <MobileFrame bottomNav={stickyFooter}>
      {/* No safeTop — the hero bleeds under the status bar; overlay controls
          clear it via their own top inset. */}
      <Screen>
        {/* Sticky controls layer (Linear variant): a zero-height sticky overlay so
            the controls pin to the top of the scroll area. !mt-0 on the hero below
            cancels Screen's space-y gap under this zero-height layer. */}
        {stickyControls && (
          <div className="pointer-events-none sticky top-0 z-30 h-0">
            <div className="flex items-center justify-between px-4 pt-[59px]">
              {heroControls}
            </div>
          </div>
        )}

        {/* Full-bleed hero with overlay controls + badges + title */}
        <div className={cn('relative h-72 w-full overflow-hidden bg-neutral-200', stickyControls && '!mt-0')}>
          {heroImage && <img src={heroImage} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-neutral-900/40" />

          {/* Overlay controls: back (left), heart (right) — static on the hero
              unless they've been lifted into the sticky layer above. */}
          {!stickyControls && (
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-[59px]">
              {heroControls}
            </div>
          )}

          {/* Bottom overlay: badges, title, meta */}
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="onImage">High Protein</Badge>
              <Badge variant="onImage" leadingIcon={CheckBadgeIcon}>
                Verified
              </Badge>
            </div>
            <Text as="h1" variant="title" className="block text-white">
              Grilled Chicken Breast
            </Text>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white">
              <HeroMeta icon={FireIcon}>165 kcal</HeroMeta>
              <span>per 100g serving</span>
            </div>
          </div>
        </div>

        {/* Add to Meal — scrollable meal segments, Breakfast selected */}
        <ScreenSection
          title="Add to Meal"
          action={
            <button type="button">
              <Text variant="link">Today</Text>
            </button>
          }
        >
          <ScrollRow bleed>
            {MEALS.map((meal, i) => (
              <Pill key={meal} selected={i === 0}>
                {meal}
              </Pill>
            ))}
          </ScrollRow>
        </ScreenSection>

        {/* Serving & Quantity — quantity stepper + serving dropdown pill */}
        <ScreenSection>
          <Card className="space-y-4">
            <Text as="h2" variant="section">
              Serving &amp; Quantity
            </Text>
            <div className="flex items-center justify-between">
              <Stepper
                value={qty}
                valueLabel="Quantity"
                inputClassName="h-12 w-16 rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900"
                onValueChange={(v) => setQty(v.replace(/[^0-9]/g, ''))}
                onDecrement={() => setQty((n) => Math.max(1, (parseInt(n, 10) || 1) - 1))}
                onIncrement={() => setQty((n) => (parseInt(n, 10) || 0) + 1)}
              />
              <Pill selected trailing={<Icon as={ChevronDownIcon} size="small" />}>
                {SELECTED_SERVING}
              </Pill>
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
            <div className="grid grid-cols-3 gap-3 !mt-3">
              {STATS.map((stat) => (
                <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
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
