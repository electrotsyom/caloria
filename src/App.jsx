import { Navigate, Route, Routes } from 'react-router-dom'
import MobileFrame from './components/MobileFrame.jsx'
import BottomNav from './components/BottomNav.jsx'
import Recipes from './screens/Recipes.jsx'
import RecipesLinear from './screens/RecipesLinear.jsx'
import LogFood from './screens/LogFood.jsx'
import LogFoodLinear from './screens/LogFoodLinear.jsx'
import FoodDetails from './screens/FoodDetails.jsx'
import FoodDetailsLinear from './screens/FoodDetailsLinear.jsx'
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

/*
 * Two self-contained prototypes, each under its own path prefix so its screens
 * navigate only within that prototype:
 *
 *   /caloria/*     — the Linear screens prototype (art-directed, themed)
 *   /wireframe/*  — the greyscale wireframe prototype (the base screens)
 *
 * Each prototype exposes the same four screens (recipes · log · food-detail ·
 * recipe-detail). The greyscale base screens take `basePath` so their forward
 * navigation (Recipes → recipe-detail, Log Food → food-detail, BottomNav Add →
 * log) stays inside the prototype; the Linear wrappers pass `basePath="/caloria"`.
 * Detail screens use `navigate(-1)` for back, so they need no prefix wiring.
 */
export default function App() {
  return (
    <Routes>
      {/* Default landing → the Linear prototype's hub */}
      <Route path="/" element={<Navigate to="/caloria/recipes" replace />} />

      {/* ── Linear screens prototype ────────────────────────────────── */}
      <Route path="/caloria">
        <Route index element={<Navigate to="recipes" replace />} />
        <Route path="recipes" element={<RecipesLinear />} />
        <Route path="log" element={<LogFoodLinear />} />
        <Route path="food-detail" element={<FoodDetailsLinear />} />
        <Route path="recipe-detail" element={<RecipeDetailsLinear />} />
      </Route>

      {/* ── Greyscale wireframe prototype ───────────────────────────── */}
      <Route path="/wireframe">
        <Route index element={<Navigate to="recipes" replace />} />
        <Route path="recipes" element={<Recipes basePath="/wireframe" />} />
        <Route path="log" element={<LogFood basePath="/wireframe" />} />
        <Route path="food-detail" element={<FoodDetails />} />
        <Route path="recipe-detail" element={<RecipeDetail />} />
      </Route>

      {/* Back-compat: old flat paths redirect into their new prototype */}
      <Route path="/recipes" element={<Navigate to="/wireframe/recipes" replace />} />
      <Route path="/log" element={<Navigate to="/wireframe/log" replace />} />
      <Route path="/food-detail" element={<Navigate to="/wireframe/food-detail" replace />} />
      <Route path="/recipe-detail" element={<Navigate to="/wireframe/recipe-detail" replace />} />
      <Route path="/recipes-linear" element={<Navigate to="/caloria/recipes" replace />} />
      <Route path="/log-food-linear" element={<Navigate to="/caloria/log" replace />} />
      <Route path="/food-detail-linear" element={<Navigate to="/caloria/food-detail" replace />} />
      <Route path="/recipe-details-linear" element={<Navigate to="/caloria/recipe-detail" replace />} />

      {/* Nav destinations not yet wired to a wireframe (shared placeholders) */}
      <Route path="/home" element={<Placeholder title="Home" />} />
      <Route path="/reports" element={<Placeholder title="Reports" />} />
      <Route path="/profile" element={<Placeholder title="Profile" />} />

      {/* Fallback */}
      <Route path="*" element={<Placeholder title="Not Found" />} />
    </Routes>
  )
}
