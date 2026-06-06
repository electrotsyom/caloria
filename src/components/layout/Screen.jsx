import { cn } from '../../lib/cn'

/*
 * Screen — the scrollable content column inside MobileFrame.
 *
 * Applies the canonical vertical rhythm: `space-y-4` between major sections and
 * `pb-24` so the last card clears the bottom nav (DESIGN_INVENTORY Phase 2).
 * Horizontal page padding (`px-4`) is owned by ScreenHeader / ScreenSection, so
 * sections that bleed to the edge (hero media) can opt out individually.
 *
 * Optional `safeTop` adds the exact device top inset (`pt-[59px]`) for screens
 * that begin under a status bar rather than with a padded header.
 */
export default function Screen({ safeTop = false, className, children }) {
  return <div className={cn('space-y-4 pb-24', safeTop && 'pt-[59px]', className)}>{children}</div>
}
