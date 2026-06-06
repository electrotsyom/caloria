import { cn } from '../../lib/cn'

/*
 * Icon — sizing wrapper around a Heroicons v2 glyph.
 *
 * Pass the Heroicon component itself via `as`. Centralizes the four canonical
 * icon sizes (design-system.md §7) so screens never hand-write per-icon
 * `h-*` / `w-*`. Color is inherited from the parent (`currentColor`) unless overridden
 * via `className`. Library is Heroicons v2 only — outline by default, solid for
 * active/selected states (the caller passes the solid component).
 */
const SIZES = {
  nav: 'h-6 w-6', // bottom-nav tabs, header back chevron
  inline: 'h-5 w-5', // search magnifier, in-row glyphs, stat icons
  small: 'h-4 w-4', // mic, badge/meta, rating star
  feature: 'h-8 w-8', // quick-action tiles, hero glyphs
}

export default function Icon({ as: Glyph, size = 'inline', className, ...rest }) {
  if (!Glyph) return null
  return <Glyph aria-hidden="true" className={cn(SIZES[size], className)} {...rest} />
}
