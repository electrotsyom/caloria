import { createContext, useContext } from 'react'
import { cn } from '../../lib/cn'

/*
 * TabBar / TabItem — in-page segmented tabs (DESIGN_INVENTORY 4.17).
 *
 * Recipe Detail's Nutrition / Ingredients / Instructions switcher. Equal-width
 * tabs in one of two variants (set once on TabBar, read by TabItem via context):
 *   underline (default) — ink-only label, active `text-neutral-900`, inactive
 *                         `text-neutral-400`; pair with a `border-b` on TabBar.
 *   pills               — a grey `bg-neutral-100` track with the active tab as a
 *                         filled `bg-neutral-900` pill, inactive `text-neutral-500`.
 *
 * This is the in-page tab pattern only; the app-level bottom tab bar is the
 * separate BottomNav component.
 */
const TabBarContext = createContext('underline')

export function TabItem({ active = false, className, children, ...rest }) {
  const variant = useContext(TabBarContext)
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(
        'flex flex-1 items-center justify-center text-sm font-medium',
        variant === 'pills'
          ? cn('h-9 rounded-full', active ? 'bg-neutral-900 text-white' : 'text-neutral-500')
          : cn('h-10', active ? 'text-neutral-900' : 'text-neutral-400'),
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default function TabBar({ variant = 'underline', className, children }) {
  return (
    <div
      role="tablist"
      className={cn('flex', variant === 'pills' && 'gap-1 rounded-full bg-neutral-100 p-1', className)}
    >
      <TabBarContext.Provider value={variant}>{children}</TabBarContext.Provider>
    </div>
  )
}
