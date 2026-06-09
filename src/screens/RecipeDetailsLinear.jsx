import '../themes/caloria.css'
import RecipeDetail from './RecipeDetail.jsx'
import { recipeHeroImage, recipeIngredientImages } from '../lib/foodImages'

/*
 * Recipe Detail — Cosmic · Linear-style visual direction.
 *
 * Renders the EXACT high-fidelity Recipe Detail wireframe (same layout,
 * components, Heroicons, structure, sizes, and font) and overrides COLOR ONLY
 * via the scoped `.theme-caloria` stylesheet: neutral near-black surfaces,
 * hairline borders, and a single amber (#E2A32A) accent on the accent fills
 * (Record button, numbered step badge). `text-white` is left as-is so it stays
 * legible on the hero scrim and on the accent. No structural, size, icon, or
 * font changes. Mirrors RecipesLinear.
 */
export default function RecipeDetailsLinear() {
  return (
    <div className="theme-caloria theme-caloria-detail">
      <RecipeDetail heroImage={recipeHeroImage} ingredientImages={recipeIngredientImages} />
    </div>
  )
}
