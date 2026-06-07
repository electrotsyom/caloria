import { cn } from '../../lib/cn'

/*
 * Pill — the single selectable rounded-full control.
 *
 * One component for every pill/chip in the inventory (DESIGN_INVENTORY 4.4 /
 * 4.5 / 4.11): meal-time segments, recipe filter chips, serving-size pills, and
 * food chips. There is intentionally no separate FilterChip / MealCard /
 * SizePill — they are this component with different `selected` / `leading` /
 * `size`.
 *
 * State (grayscale):
 *   selected   → bg-neutral-900 text-white font-medium
 *   unselected → border-neutral-200 bg-white text-neutral-500
 * Size:
 *   md (h-9 px-4) → segmented meal/filter/size pills
 *   sm (h-8 px-3) → food chips in a chip cloud
 *
 * `leading` / `trailing` accept an emoji string or an <Icon/> node (e.g. a
 * chevron to mark the pill as a dropdown trigger).
 */
const SIZES = {
  md: 'h-9 px-4',
  sm: 'h-8 px-3',
}

export default function Pill({
  selected = false,
  leading,
  trailing,
  size = 'md',
  as: Comp = 'button',
  className,
  children,
  ...rest
}) {
  const interactiveProps = Comp === 'button' ? { type: 'button', 'aria-pressed': selected } : {}
  return (
    <Comp
      className={cn(
        'inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full text-sm',
        SIZES[size],
        selected
          ? 'bg-neutral-900 font-medium text-white'
          : 'border border-neutral-200 bg-white text-neutral-500',
        className,
      )}
      {...interactiveProps}
      {...rest}
    >
      {leading}
      {children}
      {trailing}
    </Comp>
  )
}
