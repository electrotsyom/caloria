import '../themes/linear.css'
import Recipes from './Recipes.jsx'
import { recipeImages } from '../lib/foodImages'

/*
 * Recipes — Cosmic · Linear-style visual direction.
 *
 * Renders the EXACT greyscale Recipes wireframe (same layout, components,
 * Heroicons, structure, sizes, and font) and overrides COLOR ONLY via the
 * scoped `.theme-linear` stylesheet: neutral near-black surfaces, hairline
 * borders, and a single amber (#E2A32A) accent on the Add FAB and filter dot.
 * No structural, size, icon, or font changes. The art-directed Unsplash imagery
 * (featured hero + recipe-row thumbnails) is passed in via `images`; the base
 * /recipes wireframe stays greyscale.
 */
export default function RecipesLinear() {
  return (
    <div className="theme-linear">
      <Recipes images={recipeImages} />
    </div>
  )
}
