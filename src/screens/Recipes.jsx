import { useNavigate } from 'react-router-dom'
import {
  AdjustmentsHorizontalIcon,
  BarsArrowDownIcon,
  ClockIcon,
  FireIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import {
  MobileFrame,
  BottomNav,
  Screen,
  ScreenHeader,
  ScreenSection,
  SearchInput,
  Pill,
  MediaCard,
  Badge,
  ListRow,
  Thumbnail,
  IconButton,
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

// Active filter chips shown under the search bar (each removable via the × icon).
const ACTIVE_FILTERS = ['High Protein', 'Vegan', 'Vegetarian', 'Keto']

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

function RecipeRow({ recipe, image, onOpen }) {
  return (
    <ListRow
      onClick={onOpen}
      className="h-24 cursor-pointer overflow-hidden"
      contentClassName="flex h-full flex-col justify-between py-0.5"
      leading={<Thumbnail size="lg" src={image} alt={recipe.name} className="!h-24 !w-24 !rounded-r-none" />}
      title={
        <>
          <Text variant="cardTitle" className="block truncate">
            {recipe.name}
          </Text>
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
        </>
      }
    />
  )
}

export default function Recipes({ images } = {}) {
  const navigate = useNavigate()
  const openDetail = () => navigate('/recipe-detail')

  const filterAction = (
    <div className="relative">
      <IconButton icon={AdjustmentsHorizontalIcon} label="Filter recipes" />
      <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neutral-900" />
    </div>
  )

  // Sort recipes by calories, least → most.
  const sortedRecipes = [...RECIPES].sort(
    (a, b) => parseInt(a.kcal, 10) - parseInt(b.kcal, 10),
  )

  const sortAction = (
    <button type="button" className="flex items-center gap-1">
      <Text variant="link">Calories</Text>
      <Icon as={BarsArrowDownIcon} size="small" className="text-neutral-900" />
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

        {/* Active filter chips, each removable via the × icon */}
        <ScreenSection>
          <div className="flex flex-wrap gap-2">
            {ACTIVE_FILTERS.map((label) => (
              <Pill
                key={label}
                filled
                size="xs"
                trailing={
                  <Icon as={XMarkIcon} size="small" className="text-neutral-500" />
                }
              >
                {label}
              </Pill>
            ))}
          </div>
        </ScreenSection>

        {/* Featured hero recipe */}
        <ScreenSection>
          <button type="button" onClick={openDetail} className="block w-full text-left">
            <MediaCard
              variant="featured"
              image={images?.featured}
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
            {sortedRecipes.map((recipe) => (
              <RecipeRow key={recipe.name} recipe={recipe} image={images?.rows?.[recipe.name]} onOpen={openDetail} />
            ))}
          </div>
        </ScreenSection>
      </Screen>
    </MobileFrame>
  )
}
