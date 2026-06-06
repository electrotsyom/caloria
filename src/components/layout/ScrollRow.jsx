import { cn } from '../../lib/cn'

/*
 * ScrollRow — horizontal scroll track for pills, chips, and media cards.
 *
 * Default `gap-2` matches segmented pills / chip clouds; override via
 * `className` (e.g. `gap-3`) for media-card carousels. `bleed` extends the
 * track to the screen edges from inside a `px-4` section (`-mx-4 px-4`) so the
 * first/last item can sit flush, matching the screenshots' edge-bleeding rows.
 */
export default function ScrollRow({ bleed = false, className, children }) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-hide', bleed && '-mx-4 px-4', className)}>
      {children}
    </div>
  )
}
