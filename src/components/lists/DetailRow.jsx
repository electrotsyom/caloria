import { cn } from '../../lib/cn'
import Text from '../primitives/Text'

/*
 * DetailRow / DetailList — label↔value rows (DESIGN_INVENTORY 4.13).
 *
 * The Nutrition Summary detail rows (Fiber / Sodium / Cholesterol / Potassium).
 * Wrap a set of DetailRows in <DetailList> to get the canonical
 * `divide-y divide-neutral-100` separators with `py-3` per row.
 */
export function DetailList({ className, children }) {
  return <div className={cn('divide-y divide-neutral-100', className)}>{children}</div>
}

export default function DetailRow({ label, value, className }) {
  return (
    <div className={cn('flex items-center justify-between py-3', className)}>
      <Text variant="body">{label}</Text>
      <Text variant="cardTitle">{value}</Text>
    </div>
  )
}
