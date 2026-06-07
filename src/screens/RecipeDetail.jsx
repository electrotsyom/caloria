import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  ShareIcon,
  HeartIcon,
  FireIcon,
  ClockIcon,
  ChartBarIcon,
  PlusCircleIcon,
  ListBulletIcon,
  BookOpenIcon,
  ChartPieIcon,
  CubeTransparentIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { cn } from '../lib/cn'
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
  ProgressBar,
  StatCard,
  TabBar,
  TabItem,
  ListRow,
  DetailList,
  DetailRow,
  Thumbnail,
  Text,
  Icon,
  PlantIcon,
} from '../components'

/*
 * Recipe Detail — Screenshot 4, route `/recipe-detail`.
 *
 * The deepest detail screen, reached from a Recipes recipe row / featured card.
 * No ScreenHeader and NO BottomNav: a full-bleed hero with overlay controls
 * (back / share / heart) composed inline over the image, then the recipe body.
 * Composed entirely from the existing library; the overlay header is
 * screen-level composition (IconButton variant="overlay"), not a component.
 *
 * Deviation from screen-recreation-plan §"Screen 4": the plan proposes dropping
 * the share control and the inline Record button, and adds an Impact-on-Goal
 * card + sticky Cancel/Record Food footer. The screenshot (visual source of
 * truth) and DESIGN_INVENTORY Phase 1 (implementation source of truth) both show
 * the original: back + share + heart over the hero, an inline full-width Record
 * button, and NO Impact-on-Goal card / sticky footer. Per the conflict rule
 * (preserve screenshot structure/content/density), the original is recreated and
 * no off-screen content is invented.
 *
 * Notes:
 *  - TabBar active state is ink-only (the plan's resolved default — the
 *    underline/pill indicator is an open verification item, not invented here).
 *  - Ingredient leading tiles are neutral placeholders: no Heroicon matches
 *    specific foods (salmon/lemon/garlic) and the rules forbid custom SVGs /
 *    other icon libraries (wireframe rule: substitute neutral placeholders).
 *  - Record is presentational; its success behavior is undefined → no-op.
 */

// The chosen serving size, shown as a dropdown pill next to the servings stepper.
const SELECTED_SERVING = 'serving'

const INGREDIENTS = [
  { name: 'Salmon Fillet', note: 'Fresh, skin-on', amount: '300g', per: '150g/serving' },
  { name: 'Lemon', note: 'Freshly squeezed', amount: '2 pcs', per: '1 pcs/serving' },
  { name: 'Fresh Dill', note: 'Chopped', amount: '4 tbsp', per: '2 tbsp/serving' },
  { name: 'Olive Oil', note: 'Extra virgin', amount: '2 tbsp', per: '1 tbsp/serving' },
  { name: 'Garlic Cloves', note: 'Minced', amount: '4 cloves', per: '2 cloves/serving' },
  { name: 'Black Pepper', note: 'Freshly ground', amount: '1 tsp', per: '½ tsp/serving' },
  { name: 'Sea Salt', note: 'To taste', amount: '1 tsp', per: '½ tsp/serving' },
]

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

// Nutrition tab — mirrors Food Details' Nutrition Summary, using this
// recipe's own macros (84g protein / 16g carbs / 28g fat, 640 kcal). The
// mineral rows are wireframe placeholders, consistent with the rest of the screen.
const NUTRITION_STATS = [
  { value: '84g', label: 'Protein', icon: CubeTransparentIcon },
  { value: '16g', label: 'Carbs', icon: PlantIcon },
  { value: '28g', label: 'Fat', icon: BeakerIcon },
]

const NUTRITION_DETAILS = [
  { label: 'Fiber', value: '4g' },
  { label: 'Sodium', value: '320mg' },
  { label: 'Cholesterol', value: '95mg' },
  { label: 'Potassium', value: '480mg' },
]

const TABS = [
  { key: 'nutrition', label: 'Nutrition', icon: ChartPieIcon },
  { key: 'ingredients', label: 'Ingredients', icon: ListBulletIcon },
  { key: 'instructions', label: 'Instructions', icon: BookOpenIcon },
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

/* Trailing amount on an ingredient row: amount + small per-serving note. */
function Amount({ amount, per }) {
  return (
    <div className="leading-tight">
      <Text variant="cardTitle">{amount}</Text>
      <Text variant="caption" className="block">
        {per}
      </Text>
    </div>
  )
}

export default function RecipeDetail() {
  const navigate = useNavigate()
  const [servings, setServings] = useState(1)
  const [activeTab, setActiveTab] = useState('nutrition')

  // Sticky Cancel / Record bar, pinned to the bottom of the frame.
  const stickyFooter = (
    <div className="border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <Button variant="secondary" fullWidth={false} className="px-6" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" leadingIcon={PlusCircleIcon}>
          Record
        </Button>
      </div>
    </div>
  )

  return (
    <MobileFrame bottomNav={stickyFooter}>
      {/* No safeTop — the hero bleeds under the status bar; overlay controls
          clear it via their own top inset. */}
      <Screen>
        {/* Full-bleed hero with overlay controls + badges + title + rating */}
        <div className="relative h-72 w-full overflow-hidden bg-neutral-200">
          <div className="absolute inset-0 bg-neutral-900/40" />

          {/* Overlay controls: back (left), share + heart (right) */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-[59px]">
            <IconButton icon={ChevronLeftIcon} label="Back" variant="overlay" onClick={() => navigate(-1)} />
            <div className="flex items-center gap-2">
              <IconButton icon={ShareIcon} label="Share recipe" variant="overlay" />
              <IconButton icon={HeartIcon} label="Favorite recipe" variant="overlay" />
            </div>
          </div>

          {/* Bottom overlay: badges, title, rating / time / difficulty */}
          <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="onImage">Low Calorie</Badge>
              <Badge variant="onImage">High Protein</Badge>
            </div>
            <Text as="h1" variant="title" className="block text-white">
              Grilled Lemon Herb Salmon
            </Text>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white">
              <HeroMeta icon={StarIcon}>4.8 (132)</HeroMeta>
              <HeroMeta icon={ClockIcon}>25 min</HeroMeta>
              <HeroMeta icon={ChartBarIcon}>Easy</HeroMeta>
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

        {/* Serving & Quantity — servings stepper + serving-size dropdown pill */}
        <ScreenSection>
          <Card className="space-y-4">
            <Text as="h2" variant="section">
              Serving &amp; Quantity
            </Text>
            <div className="flex items-center justify-between">
              <Stepper
                value={servings}
                valueLabel="Servings"
                inputClassName="h-12 w-16 rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-900"
                decrementLabel="Fewer servings"
                incrementLabel="More servings"
                onValueChange={(v) => setServings(v.replace(/[^0-9]/g, ''))}
                onDecrement={() => setServings((n) => Math.max(1, (parseInt(n, 10) || 1) - 1))}
                onIncrement={() => setServings((n) => (parseInt(n, 10) || 0) + 1)}
              />
              <Pill selected trailing={<Icon as={ChevronDownIcon} size="small" />}>
                {SELECTED_SERVING}
              </Pill>
            </div>
          </Card>
        </ScreenSection>

        {/* Tabs + ingredient list */}
        <ScreenSection>
          <TabBar className="border-b border-neutral-200">
            {TABS.map((tab) => (
              <TabItem key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
                <span className="inline-flex items-center gap-1.5">
                  <Icon as={tab.icon} size="small" />
                  {tab.label}
                </span>
              </TabItem>
            ))}
          </TabBar>

          {/* The Instructions panel is off-screen and not invented. */}
          {activeTab === 'ingredients' && (
            <Card className="mt-2">
              <DetailList>
                {INGREDIENTS.map((item, i) => (
                  <ListRow
                    key={item.name}
                    card={false}
                    className={cn(i === 0 && 'pt-0', i === INGREDIENTS.length - 1 && 'pb-0')}
                    leading={<Thumbnail size="sm" tone="icon" />}
                    title={item.name}
                    subtitle={item.note}
                    trailing={<Amount amount={item.amount} per={item.per} />}
                  />
                ))}
              </DetailList>
            </Card>
          )}

          {/* Nutrition — Nutrition Summary card mirrored from Food Details */}
          {activeTab === 'nutrition' && (
            <Card className="mt-2 space-y-4">
              <div className="flex items-center justify-between">
                <Text as="h2" variant="section">
                  Nutrition Summary
                </Text>
                <Text variant="caption">per serving</Text>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-neutral-50 p-3">
                <span className="flex items-center gap-2">
                  <Icon as={FireIcon} size="inline" className="text-neutral-400" />
                  <Text variant="body">Calories</Text>
                </span>
                <Text variant="section">640 kcal</Text>
              </div>
              <div className="grid grid-cols-3 gap-3 !mt-3">
                {NUTRITION_STATS.map((stat) => (
                  <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} />
                ))}
              </div>
              <DetailList>
                {NUTRITION_DETAILS.map((row) => (
                  <DetailRow key={row.label} label={row.label} value={row.value} />
                ))}
              </DetailList>
            </Card>
          )}
        </ScreenSection>

        {/* Impact on Daily Goal — remaining + progress + consumed meta */}
        <ScreenSection>
          <Card className="space-y-3">
            <Text as="h2" variant="section">
              Impact on Daily Goal
            </Text>
            <div className="flex items-center justify-between">
              <Text variant="body">Calories remaining</Text>
              <Text variant="cardTitle">1,160 kcal left</Text>
            </div>
            <ProgressBar value={36} />
            <div className="flex items-center justify-between">
              <Text variant="caption">640 / 1,800 kcal consumed</Text>
              <Text variant="caption">+640 kcal</Text>
            </div>
          </Card>
        </ScreenSection>
      </Screen>
    </MobileFrame>
  )
}
