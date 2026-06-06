import { cn } from '../../lib/cn'
import SectionHeader from '../lists/SectionHeader'

/*
 * ScreenSection — a titled content block within a Screen.
 *
 * Renders an optional SectionHeader (title + action) with the canonical 12px
 * gap to its content (`mb-3`), and applies horizontal page padding (`px-4`).
 * Section-to-section spacing is owned by the parent Screen (`space-y-4`).
 *
 * For sections whose content bleeds edge-to-edge (e.g. a horizontal media
 * carousel), keep `bleed={false}` here so the header stays padded and let the
 * inner ScrollRow use `bleed` to extend the scroll track to the screen edges.
 */
export default function ScreenSection({ title, action, bleed = false, className, children }) {
  return (
    <section className={cn(!bleed && 'px-4', className)}>
      {title && <SectionHeader title={title} action={action} className="mb-3" />}
      {children}
    </section>
  )
}
