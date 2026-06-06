import { cn } from '../../lib/cn'
import Card from '../primitives/Card'
import Text from '../primitives/Text'

/*
 * ListRow — the generic horizontal row: `[leading] [title/subtitle] [trailing] [action]`.
 *
 * One component covers the inventory's three row variants by composition — there
 * are intentionally no separate FoodRow / RecipeRow / IngredientRow components:
 *   - Food row (4.6)      → card, Thumbnail image, kcal `trailing`, IconButton `action`.
 *   - Recipe row (4.15)   → card, Thumbnail lg, pass nodes for stats via `subtitle`/`trailing`.
 *   - Ingredient row (4.18) → card={false} + wrap the list in `divide-y divide-neutral-100`,
 *                             Thumbnail icon tile + amount as `trailing`.
 *
 * `title` and `subtitle` accept strings or nodes (for rows that need a heart
 * next to the title, or a stats cluster). When `card`, renders a compact Card
 * (`rounded-2xl border p-3`); otherwise a plain `py-3` divided row.
 */
export default function ListRow({
  leading,
  title,
  subtitle,
  trailing,
  action,
  card = true,
  className,
  ...rest
}) {
  const body = (
    <>
      <div className="min-w-0 flex-1">
        {title &&
          (typeof title === 'string' ? (
            <Text variant="cardTitle" className="block truncate">
              {title}
            </Text>
          ) : (
            title
          ))}
        {subtitle &&
          (typeof subtitle === 'string' ? (
            <Text variant="caption" className="block truncate">
              {subtitle}
            </Text>
          ) : (
            subtitle
          ))}
      </div>
      {trailing && <div className="shrink-0 text-right">{trailing}</div>}
      {action && <div className="shrink-0">{action}</div>}
    </>
  )

  if (card) {
    // Thumbnail bleeds to the card's top/left/bottom edges (cancel the compact
    // `p-3`); the `gap-3` to the text and the text's own padding stay intact.
    return (
      <Card padding="compact" className={cn('flex items-center gap-3', className)} {...rest}>
        {leading && <div className="-my-3 -ml-3 shrink-0">{leading}</div>}
        {body}
      </Card>
    )
  }
  return (
    <div className={cn('flex items-center gap-3 py-3', className)} {...rest}>
      {leading}
      {body}
    </div>
  )
}
