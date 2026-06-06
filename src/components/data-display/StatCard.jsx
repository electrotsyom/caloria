import { cn } from '../../lib/cn'
import Icon from '../primitives/Icon'
import Text from '../primitives/Text'

/*
 * StatCard — compact macro stat box (DESIGN_INVENTORY 4.12).
 *
 * The 3-up Protein / Carbs / Fat boxes inside the Nutrition Summary card:
 * `rounded-xl bg-neutral-50 p-3`, optional icon, big value (T10), small label
 * (T7). Distinct from MacroSummary (4.20), which is the unboxed 4-column row.
 */
export default function StatCard({ icon, value, label, className }) {
  return (
    <div className={cn('flex flex-col items-center gap-1 rounded-xl bg-neutral-50 p-3 text-center', className)}>
      {icon && <Icon as={icon} size="inline" className="text-neutral-400" />}
      <Text variant="stat">{value}</Text>
      <Text variant="caption">{label}</Text>
    </div>
  )
}
