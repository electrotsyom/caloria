import { cn } from '../../lib/cn'

/*
 * ProgressBar — thin track + fill (DESIGN_INVENTORY 4.9).
 *
 * Shared by the Food Details macro bars and the Impact-on-Goal progress bar —
 * same `h-1.5 rounded-full bg-neutral-200` track, `bg-neutral-900` fill. The
 * fill width is a placeholder driven by `value` (0–100), NOT real data, per the
 * inventory note. `value` sets an inline width (a data value, not a design
 * token) so any proportion can be expressed without arbitrary Tailwind classes.
 */
export default function ProgressBar({ value = 50, className }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-neutral-200', className)}
    >
      <div className="h-full rounded-full bg-neutral-900" style={{ width: `${pct}%` }} />
    </div>
  )
}
