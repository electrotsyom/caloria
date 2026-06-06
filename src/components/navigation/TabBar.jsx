import { cn } from '../../lib/cn'

/*
 * TabBar / TabItem — in-page segmented tabs (DESIGN_INVENTORY 4.17).
 *
 * Recipe Detail's Ingredients / Instructions / Nutrition switcher. Equal-width
 * tabs; active label ink `text-neutral-900`, inactive `text-neutral-400`
 * (style T5). The active-indicator treatment (underline vs filled pill) is an
 * open verification item — defaulting to ink-only per the inventory. An
 * optional underline is available via `underline` on TabBar if needed.
 *
 * This is the in-page tab pattern only; the app-level bottom tab bar is the
 * separate BottomNav component.
 */
export function TabItem({ active = false, className, children, ...rest }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        'flex h-10 flex-1 items-center justify-center text-sm font-medium',
        active ? 'text-neutral-900' : 'text-neutral-400',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default function TabBar({ className, children }) {
  return (
    <div role="tablist" className={cn('flex', className)}>
      {children}
    </div>
  )
}
