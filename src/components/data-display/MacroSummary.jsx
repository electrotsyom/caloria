import { cn } from '../../lib/cn'
import Text from '../primitives/Text'

/*
 * MacroSummary — 4-column macro row (DESIGN_INVENTORY 4.20).
 *
 * Recipe Detail's Carbs / Protein / Fat / Fiber row: each column is a small dot
 * + value (T4) + label (T7). No bars or boxes — distinct from StatCard (4.12)
 * and ProgressBar (4.9). Pass `items` as `[{ value, label }]`.
 */
export default function MacroSummary({ items = [], className }) {
  return (
    <div className={cn('grid grid-cols-4 gap-2 text-center', className)}>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-neutral-300" />
          <Text variant="cardTitle">{item.value}</Text>
          <Text variant="caption">{item.label}</Text>
        </div>
      ))}
    </div>
  )
}
