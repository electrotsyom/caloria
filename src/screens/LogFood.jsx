import { useNavigate } from 'react-router-dom'
import {
  ViewfinderCircleIcon,
  CameraIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import {
  MobileFrame,
  Screen,
  ScreenHeader,
  ScreenSection,
  ScrollRow,
  SearchInput,
  Pill,
  Card,
  Thumbnail,
  ListRow,
  MediaCard,
  IconButton,
  Text,
  Icon,
} from '../components'

/*
 * Log Food — Screenshot 1, route `/log`.
 *
 * The merged Log/Add screen, reached via the Recipes Add FAB. Pushed/modal-style:
 * circular back in the header, NO BottomNav (MobileFrame used without its
 * bottomNav slot). Food rows + suggested cards → /food-detail. Composed entirely
 * from the existing library (screen-recreation-plan.md §"Screen 1").
 *
 * Deviation from the plan: §"Special Notes" asks for Popular Foods as a vertical
 * food-row list, but the screenshot (visual source of truth) + DESIGN_INVENTORY
 * §4.5 / Phase 1 show a CHIP CLOUD. Per the conflict rule (preserve screenshot
 * structure/density), Popular Foods is implemented as a wrapping chip cloud.
 */

const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']

const QUICK_ACTIONS = [
  { label: 'Scan Barcode', icon: ViewfinderCircleIcon },
  { label: 'Snap Photo', icon: CameraIcon },
  { label: 'Manual Add', icon: PencilSquareIcon },
]

const POPULAR_FOODS = [
  'Eggs',
  'Banana',
  'Avocado',
  'Chicken',
  'Milk',
  'Apple',
  'Peanut Butter',
  'Rice',
  'Broccoli',
  'Cheese',
]

const RECENTLY_LOGGED = [
  { name: 'Greek Yogurt', detail: '1 cup · 150g', kcal: '130' },
  { name: 'Oatmeal with Berries', detail: '1 bowl · 250g', kcal: '285' },
  { name: 'Eggs on Toast', detail: '2 eggs · 1 slice', kcal: '310' },
]

const SUGGESTED = [
  { name: 'Grilled Salmon', kcal: '208 kcal' },
  { name: 'Quinoa Salad', kcal: '175 kcal' },
  { name: 'Smoothie Bowl', kcal: '240 kcal' },
]

/* Inline section link ("Today" / "See all" / "Clear") — link-styled button. */
function SectionLink({ children }) {
  return (
    <button type="button">
      <Text variant="link">{children}</Text>
    </button>
  )
}

/* Trailing kcal value on a food row: emphasized number + small unit below. */
function KcalValue({ children }) {
  return (
    <div className="leading-tight">
      <Text variant="cardTitle">{children}</Text>
      <Text variant="caption" className="block">
        kcal
      </Text>
    </div>
  )
}

export default function LogFood() {
  const navigate = useNavigate()
  const openDetail = () => navigate('/food-detail')

  const addAction = (
    <IconButton icon={PlusIcon} label="Add food" size="inline" />
  )

  return (
    <MobileFrame>
      <Screen safeTop>
        <ScreenHeader
          title="Log Food"
          onBack={() => navigate(-1)}
        />

        {/* Search */}
        <ScreenSection>
          <SearchInput placeholder="Search food, brand, or dish…" />
        </ScreenSection>

        {/* Quick actions — 3-up tiles (Card compact + icon Thumbnail + label) */}
        <ScreenSection>
          <div className="grid grid-cols-3 gap-3">
            {QUICK_ACTIONS.map(({ label, icon }) => (
              <Card
                key={label}
                as="button"
                padding="compact"
                className="flex flex-col items-center gap-2 text-center"
              >
                <Thumbnail size="md" tone="icon">
                  <Icon as={icon} size="feature" />
                </Thumbnail>
                <Text variant="label">{label}</Text>
              </Card>
            ))}
          </div>
        </ScreenSection>

        {/* Meal Time — scrollable meal pills, Breakfast selected, clipped right */}
        <ScreenSection title="Meal Time" action={<SectionLink>Today</SectionLink>}>
          <ScrollRow bleed>
            {MEALS.map((label, i) => (
              <Pill key={label} selected={i === 0}>
                {label}
              </Pill>
            ))}
          </ScrollRow>
        </ScreenSection>

        {/* Popular Foods — chip cloud (wrapping sm pills w/ neutral food blob) */}
        <ScreenSection title="Popular Foods" action={<SectionLink>See all</SectionLink>}>
          <div className="flex flex-wrap gap-2">
            {POPULAR_FOODS.map((label) => (
              <Pill
                key={label}
                size="sm"
                leading={<span className="h-4 w-4 shrink-0 rounded-full bg-neutral-200" />}
              >
                {label}
              </Pill>
            ))}
          </div>
        </ScreenSection>

        {/* Recently Logged — vertical food-row list */}
        <ScreenSection title="Recently Logged" action={<SectionLink>Clear</SectionLink>}>
          <div className="space-y-3">
            {RECENTLY_LOGGED.map((food) => (
              <ListRow
                key={food.name}
                onClick={openDetail}
                className="cursor-pointer"
                leading={<Thumbnail size="md" className="!h-16 !w-16 !rounded-r-none" />}
                title={food.name}
                subtitle={food.detail}
                trailing={<KcalValue>{food.kcal}</KcalValue>}
                action={addAction}
              />
            ))}
          </div>
        </ScreenSection>

        {/* Suggested for You — horizontal MediaCard carousel, clipped right */}
        <ScreenSection title="Suggested for You" action={<SectionLink>See all</SectionLink>}>
          <ScrollRow bleed className="gap-3">
            {SUGGESTED.map((item) => (
              <div
                key={item.name}
                role="button"
                tabIndex={0}
                onClick={openDetail}
                className="cursor-pointer text-left"
              >
                <MediaCard
                  title={item.name}
                  meta={item.kcal}
                  action={<IconButton icon={PlusIcon} label={`Add ${item.name}`} size="inline" />}
                />
              </div>
            ))}
          </ScrollRow>
        </ScreenSection>
      </Screen>
    </MobileFrame>
  )
}
