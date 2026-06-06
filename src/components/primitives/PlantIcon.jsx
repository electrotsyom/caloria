import { cn } from '../../lib/cn'

/*
 * PlantIcon — the custom plant glyph from `public/plant.svg`.
 *
 * Heroicons ship as React components, but the plant is a static asset. To make
 * it behave like the rest (size via `Icon`, color via `currentColor`), it's
 * rendered as a masked box: `bg-current` supplies the color and the SVG is the
 * alpha mask. Mirrors the Heroicon component API (accepts `className`) so it can
 * be passed to `<Icon as={PlantIcon} />` interchangeably.
 */
const MASK = {
  maskImage: 'url(/plant.svg)',
  WebkitMaskImage: 'url(/plant.svg)',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
}

export default function PlantIcon({ className, ...rest }) {
  return <span className={cn('inline-block bg-current', className)} style={MASK} {...rest} />
}
