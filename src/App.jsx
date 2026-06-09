import { Navigate, Route, Routes } from 'react-router-dom'
import MobileFrame from './components/MobileFrame.jsx'
import BottomNav from './components/BottomNav.jsx'
import Recipes from './screens/Recipes.jsx'
import RecipesLinear from './screens/RecipesLinear.jsx'
import LogFood from './screens/LogFood.jsx'
import LogFoodLinear from './screens/LogFoodLinear.jsx'
import FoodDetails from './screens/FoodDetails.jsx'
import RecipeDetail from './screens/RecipeDetail.jsx'
import RecipeDetailsLinear from './screens/RecipeDetailsLinear.jsx'

/*
 * Placeholder screen used until each real wireframe is built. Owns its own
 * MobileFrame + BottomNav so it stands alone as a route element (the four
 * in-scope screens each render their own MobileFrame, with the nav shown only
 * where the screen-recreation-plan calls for it).
 */
function Placeholder({ title }) {
  return (
    <MobileFrame bottomNav={<BottomNav />}>
      <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-2xl">
          🍎
        </div>
        <h1 className="text-base font-semibold text-neutral-900">{title}</h1>
        <p className="mt-1 text-sm text-neutral-400">Screen coming soon</p>
      </div>
    </MobileFrame>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Default landing */}
      <Route path="/" element={<Navigate to="/recipes" replace />} />

      {/* In-scope wireframes (built one at a time) */}
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes-linear" element={<RecipesLinear />} />
      <Route path="/log" element={<LogFood />} />
      <Route path="/log-food-linear" element={<LogFoodLinear />} />

      <Route path="/food-detail" element={<FoodDetails />} />
      <Route path="/recipe-detail" element={<RecipeDetail />} />
      <Route path="/recipe-details-linear" element={<RecipeDetailsLinear />} />

      {/* Nav destinations not yet wired to a wireframe */}
      <Route path="/home" element={<Placeholder title="Home" />} />
      <Route path="/reports" element={<Placeholder title="Reports" />} />
      <Route path="/profile" element={<Placeholder title="Profile" />} />

      {/* Fallback */}
      <Route path="*" element={<Placeholder title="Not Found" />} />
    </Routes>
  )
}
