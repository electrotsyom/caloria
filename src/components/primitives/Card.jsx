import { cn } from '../../lib/cn'

/*
 * Card — the canonical white surface.
 *
 * `rounded-2xl border border-neutral-200 bg-white shadow-sm` per
 * design-system.md §5/§9. Padding follows the canonical rule (DESIGN_INVENTORY
 * Phase 2): content cards use `p-4`, compact rows/tiles use `p-3`. Use
 * `padding="none"` when the card wraps full-bleed media or supplies its own
 * inner padding.
 */
const PADDING = {
  content: 'p-4',
  compact: 'p-3',
  none: '',
}

export default function Card({
  as: Comp = 'div',
  padding = 'content',
  className,
  children,
  ...rest
}) {
  return (
    <Comp
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white shadow-sm',
        PADDING[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
}
