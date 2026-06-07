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
 *   filled     → bg-neutral-100 text-neutral-700 (static grey chip, e.g. an
 *                active filter tag; `selected` is ignored)
 * Size:
 *   md  (h-9 px-4)    → segmented meal/filter/size pills
 *   sm  (h-8 px-3)    → food chips in a chip cloud
 *   xs  (h-6 px-2.5)  → compact removable filter chips
 *   2xs (h-4 px-1.5)  → micro removable filter chips
 *
 * `leading` / `trailing` accept an emoji string or an <Icon/> node (e.g. a
 * chevron to mark the pill as a dropdown trigger).
 */
const SIZES = {
  md: 'h-9 px-4 gap-2 text-sm',
  sm: 'h-8 px-3 gap-2 text-sm',
  xs: 'h-6 px-2.5 gap-2 text-sm',
  '2xs': 'h-4 px-1.5 gap-1 text-xs',
}

export default function Pill({
  selected = false,
  filled = false,
  leading,
  trailing,
  size = 'md',
  as: Comp = 'button',
  className,
  children,
  ...rest
}) {
  const interactiveProps = Comp === 'button' ? { type: 'button', 'aria-pressed': selected } : {}
  const tone = filled
    ? 'bg-neutral-100 text-neutral-700'
    : selected
      ? 'bg-neutral-900 font-medium text-white'
      : 'border border-neutral-200 bg-white text-neutral-500'
  return (
    <Comp
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap rounded-full',
        SIZES[size],
        tone,
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
