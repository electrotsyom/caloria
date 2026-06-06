import { useNavigate } from 'react-router-dom'
import {
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  ArrowPathIcon,
  ClockIcon,
  FireIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import {
  MobileFrame,
  BottomNav,
  Screen,
  ScreenHeader,
  ScreenSection,
  ScrollRow,
  SearchInput,
  Pill,
  MediaCard,
  Badge,
  ListRow,
  Thumbnail,
  IconButton,
  Button,
  Text,
  Icon,
} from '../components'

/*
 * Recipes (Discover) — Screenshot 3, route `/recipes`.
 *
 * The only in-scope screen that shows the BottomNav (Recipes active) and the
 * navigational hub: the Add FAB → Log Food (/log), recipe rows + featured card
 * → Recipe Detail (/recipe-detail). Composed entirely from the existing library
 * (see screen-recreation-plan.md §"Screen 3"). No new components.
 */

// Row 1 = diet/calorie filters, Row 2 = meal filters. Leading pill selected in each.
const DIET_FILTERS = ['All', 'Low Calorie', 'High Protein']
const MEAL_FILTERS = ['Any Meal', 'Breakfast', 'Lunch', 'Dinner']

const RECIPES = [
  { name: 'Grilled Lemon Herb Salmon', tag: 'Low Cal', meta: 'Dinner · High Protein', rating: '4.8', reviews: '132', time: '25 min', kcal: '320 kcal', protein: '42g P' },
  { name: 'Berry Overnight Oats', tag: 'Breakfast', meta: 'Breakfast · Vegan', rating: '4.7', reviews: '89', time: '5 min', kcal: '290 kcal', protein: '12g P' },
  { name: 'Chicken Veggie Stir Fry', tag: 'Low Cal', meta: 'Lunch · High Protein', rating: '4.8', reviews: '204', time: '30 min', kcal: '345 kcal', protein: '38g P' },
  { name: 'Classic Greek Salad', tag: 'Vegan', meta: 'Lunch · Vegetarian', rating: '4.5', reviews: '78', time: '10 min', kcal: '210 kcal', protein: '6g P' },
  { name: 'Avocado Egg Toast', tag: 'Keto', meta: 'Breakfast · Keto', rating: '4.9', reviews: '311', time: '15 min', kcal: '410 kcal', protein: '18g P' },
  { name: 'Hearty Lentil Soup', tag: 'Vegan', meta: 'Dinner · Vegan', rating: '4.4', reviews: '67', time: '40 min', kcal: '270 kcal', protein: '14g P' },
]

/* A meta stat = small leading icon + caption text (time / kcal). */
function Stat({ icon, children }) {
  return (
    <span className="flex items-center gap-1">
      {icon && <Icon as={icon} size="small" className="text-neutral-400" />}
      <Text variant="caption">{children}</Text>
    </span>
  )
}

function RecipeRow({ recipe, onOpen }) {
  return (
    <ListRow
      onClick={onOpen}
      className="cursor-pointer"
      leading={<Thumbnail size="lg" />}
      title={
        <div className="flex items-start justify-between gap-2">
          <Text variant="cardTitle" className="truncate">
            {recipe.name}
          </Text>
          <IconButton icon={HeartIcon} label={`Favorite ${recipe.name}`} size="inlineSm" variant="ghost" />
        </div>
      }
      subtitle={
        <div className="mt-1 space-y-1">
          <Text variant="caption" className="block">
            {recipe.meta}
          </Text>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1">
              <Icon as={StarIcon} size="small" className="text-neutral-900" />
              <Text variant="caption">
                {recipe.rating} ({recipe.reviews})
              </Text>
            </span>
            <Stat icon={ClockIcon}>{recipe.time}</Stat>
            <Stat icon={FireIcon}>{recipe.kcal}</Stat>
          </div>
        </div>
      }
    />
  )
}

export default function Recipes() {
  const navigate = useNavigate()
  const openDetail = () => navigate('/recipe-detail')

  const filterAction = (
    <div className="relative">
      <IconButton icon={AdjustmentsHorizontalIcon} label="Filter recipes" />
      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neutral-900" />
    </div>
  )

  const sortAction = (
    <button type="button" className="flex items-center gap-1">
      <Text variant="link">Calories</Text>
      <Icon as={ArrowsUpDownIcon} size="small" className="text-neutral-900" />
    </button>
  )

  return (
    <MobileFrame bottomNav={<BottomNav />}>
      <Screen safeTop>
        <ScreenHeader title="Recipes" action={filterAction} />

        {/* Search */}
        <ScreenSection>
          <SearchInput placeholder="Search recipes…" />
        </ScreenSection>

        {/* Two scrollable filter-pill rows, clipped at the right edge */}
        <ScreenSection className="space-y-3">
          <ScrollRow bleed>
            {DIET_FILTERS.map((label, i) => (
              <Pill key={label} selected={i === 0}>
                {label}
              </Pill>
            ))}
          </ScrollRow>
          <ScrollRow bleed>
            {MEAL_FILTERS.map((label, i) => (
              <Pill key={label} selected={i === 0}>
                {label}
              </Pill>
            ))}
          </ScrollRow>
        </ScreenSection>

        {/* Featured hero recipe */}
        <ScreenSection>
          <button type="button" onClick={openDetail} className="block w-full text-left">
            <MediaCard
              variant="featured"
              title="Rainbow Buddha Bowl"
              badge={<Badge variant="onImage">Featured</Badge>}
              meta={
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Icon as={StarIcon} size="small" className="text-white" />
                    4.9
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon as={ClockIcon} size="small" className="text-white" />
                    20 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon as={FireIcon} size="small" className="text-white" />
                    380 kcal
                  </span>
                </div>
              }
            />
          </button>
        </ScreenSection>

        {/* Result count + sort, then the recipe list */}
        <ScreenSection title="24 Recipes Found" action={sortAction}>
          <div className="space-y-3">
            {RECIPES.map((recipe) => (
              <RecipeRow key={recipe.name} recipe={recipe} onOpen={openDetail} />
            ))}
          </div>
        </ScreenSection>

        {/* Load more */}
        <ScreenSection>
          <Button variant="secondary" leadingIcon={ArrowPathIcon}>
            Load More Recipes
          </Button>
        </ScreenSection>
      </Screen>
    </MobileFrame>
  )
}
