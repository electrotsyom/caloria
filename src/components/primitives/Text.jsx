import { cn } from '../../lib/cn'

/*
 * Text — the single typography primitive.
 *
 * Each `variant` maps 1:1 to a named style from design-system.md §1 (the
 * consolidated Typography Inventory). This is the only place font size / weight
 * / color for text should be decided — screens pick a variant, never raw
 * `text-*`/`font-*` classes. Font family is `font-sans` and letter-spacing is
 * `tracking-normal` globally (set on <body>), so neither is repeated here.
 */
const VARIANTS = {
  eyebrow: 'text-xs font-semibold uppercase text-neutral-400', // LOG FOOD / DISCOVER
  title: 'text-2xl font-bold text-neutral-900', // screen / page title
  section: 'text-base font-semibold text-neutral-900', // section header
  cardTitle: 'text-sm font-semibold text-neutral-900', // card title / inline value
  link: 'text-sm font-medium text-neutral-900', // action / link / tab (active ink)
  linkMuted: 'text-sm font-medium text-neutral-400', // inactive link / tab
  body: 'text-sm text-neutral-500', // body copy, row labels
  caption: 'text-xs text-neutral-400', // subtitle / caption / meta
  label: 'text-xs font-medium text-neutral-500', // macro / form labels
  hero: 'text-3xl font-bold text-neutral-900', // hero kcal value
  stat: 'text-base font-semibold text-neutral-900', // stat-box value
  statLabel: 'text-sm text-neutral-400', // stat-box label
}

export default function Text({
  as: Comp = 'span',
  variant = 'body',
  className,
  children,
  ...rest
}) {
  return (
    <Comp className={cn(VARIANTS[variant], className)} {...rest}>
      {children}
    </Comp>
  )
}
