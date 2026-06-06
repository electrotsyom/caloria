import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeftIcon,
  ShareIcon,
  HeartIcon,
  FireIcon,
  ClockIcon,
  ChartBarIcon,
  PlusCircleIcon,
  ListBulletIcon,
  QueueListIcon,
  ChartPieIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import {
  MobileFrame,
  Screen,
  ScreenSection,
  Card,
  Badge,
  Button,
  IconButton,
  Stepper,
  MacroSummary,
  TabBar,
  TabItem,
  ListRow,
  DetailList,
  Thumbnail,
  Text,
  Icon,
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

const MACROS = [
  { value: '16g', label: 'Carbs' },
  { value: '84g', label: 'Protein' },
  { value: '28g', label: 'Fat' },
  { value: '4g', label: 'Fiber' },
]

const INGREDIENTS = [
  { name: 'Salmon Fillet', note: 'Fresh, skin-on', amount: '300g', per: '150g/serving' },
  { name: 'Lemon', note: 'Freshly squeezed', amount: '2 pcs', per: '1 pcs/serving' },
  { name: 'Fresh Dill', note: 'Chopped', amount: '4 tbsp', per: '2 tbsp/serving' },
  { name: 'Olive Oil', note: 'Extra virgin', amount: '2 tbsp', per: '1 tbsp/serving' },
  { name: 'Garlic Cloves', note: 'Minced', amount: '4 cloves', per: '2 cloves/serving' },
  { name: 'Black Pepper', note: 'Freshly ground', amount: '1 tsp', per: '½ tsp/serving' },
  { name: 'Sea Salt', note: 'To taste', amount: '1 tsp', per: '½ tsp/serving' },
]

const TABS = [
  { key: 'ingredients', label: 'Ingredients', icon: ListBulletIcon },
  { key: 'instructions', label: 'Instructions', icon: QueueListIcon },
  { key: 'nutrition', label: 'Nutrition', icon: ChartPieIcon },
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
  const [servings, setServings] = useState(2)
  const [activeTab, setActiveTab] = useState('ingredients')

  return (
    <MobileFrame>
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

        {/* Servings + calories + macro summary, then the inline Record button */}
        <ScreenSection className="space-y-4">
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Stepper
                  value={servings}
                  decrementLabel="Fewer servings"
                  incrementLabel="More servings"
                  onDecrement={() => setServings((n) => Math.max(1, n - 1))}
                  onIncrement={() => setServings((n) => n + 1)}
                />
                <Text variant="body">servings</Text>
              </div>
              <div className="flex items-baseline gap-1">
                <Icon as={FireIcon} size="inline" className="self-center text-neutral-400" />
                <Text variant="hero">640</Text>
                <Text variant="body">kcal</Text>
              </div>
            </div>
            <MacroSummary items={MACROS} />
          </Card>

          <Button variant="primary" leadingIcon={PlusCircleIcon}>
            Record
          </Button>
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

          {/* Only the Ingredients panel is shown in the screenshot; the
              Instructions / Nutrition panels are off-screen and not invented. */}
          {activeTab === 'ingredients' && (
            <DetailList className="mt-2">
              {INGREDIENTS.map((item) => (
                <ListRow
                  key={item.name}
                  card={false}
                  leading={<Thumbnail size="sm" tone="icon" />}
                  title={item.name}
                  subtitle={item.note}
                  trailing={<Amount amount={item.amount} per={item.per} />}
                />
              ))}
            </DetailList>
          )}
        </ScreenSection>
      </Screen>
    </MobileFrame>
  )
}
