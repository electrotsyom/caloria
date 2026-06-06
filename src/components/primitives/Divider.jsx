import { cn } from '../../lib/cn'

/*
 * Divider — hairline separator.
 *
 * `border-neutral-100` per design-system.md §4. For a list of label↔value rows
 * prefer wrapping them in `divide-y divide-neutral-100` (see DetailRow /
 * DetailList) rather than placing a Divider between each — this is the
 * standalone separator for the occasional one-off split.
 */
export default function Divider({ className }) {
  return <div role="separator" className={cn('border-t border-neutral-100', className)} />
}
