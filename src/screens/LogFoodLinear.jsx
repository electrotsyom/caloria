import '../themes/linear.css'
import LogFood from './LogFood.jsx'

/*
 * Log Food — Cosmic · Linear-style visual direction.
 *
 * Renders the EXACT high-fidelity Log Food wireframe (same layout, components,
 * Heroicons, structure, sizes, and font) and overrides COLOR ONLY via the
 * scoped `.theme-linear` stylesheet: neutral near-black surfaces and hairline
 * borders. Mirrors RecipesLinear / RecipeDetailsLinear.
 *
 * Under the `theme-linear-logfood` marker, the inline "+" add buttons adopt the
 * Serving & Quantity minus-button style from recipe-details-linear (the Stepper's
 * outline IconButton: #181818 surface + hairline border + grey glyph), so the
 * screen stays fully greyscale. No structural, size, icon, or font changes.
 */
export default function LogFoodLinear() {
  return (
    <div className="theme-linear theme-linear-logfood">
      <LogFood />
    </div>
  )
}
