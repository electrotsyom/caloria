import '../themes/linear.css'
import FoodDetails from './FoodDetails.jsx'
import { foodHeroImage } from '../lib/foodImages'

/*
 * Food Details — Cosmic · Linear-style visual direction.
 *
 * Renders the EXACT high-fidelity Food Details wireframe (same layout,
 * components, Heroicons, structure, sizes, and font) and overrides COLOR ONLY
 * via the scoped `.theme-linear` / `.theme-linear-detail` stylesheet — the same
 * markers RecipeDetailsLinear uses, since Food Details shares the detail-screen
 * shape: a full-bleed hero with `bg-white/80` overlay controls (→ the glass
 * treatment), selected meal/serving Pills (→ amber-text outline), dark surfaces,
 * hairline borders, and the amber (#E2A32A) primary Record button.
 *
 * Food Details carries no tabs or `recipe-record-footer`, so those
 * recipe-specific `.theme-linear-detail` rules are inert here. The
 * `theme-linear-food` marker scopes the food-only tweaks (hiding the footer
 * Cancel button so Record fills the bar). The `stickyControls` prop lifts the
 * hero back/favorite controls into a sticky top layer (mirroring RecipeDetail),
 * since the hero's overflow clip makes that impossible from scoped CSS alone.
 * No size, icon, or font changes. Mirrors RecipeDetailsLinear / RecipesLinear.
 */
export default function FoodDetailsLinear() {
  return (
    <div className="theme-linear theme-linear-detail theme-linear-food">
      <FoodDetails stickyControls heroImage={foodHeroImage} />
    </div>
  )
}
