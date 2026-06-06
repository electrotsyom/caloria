import { cn } from '../../lib/cn'

/*
 * Thumbnail — leading image placeholder or icon tile for list rows & cards.
 *
 * `rounded-xl` square. Two tones:
 *   image → bg-neutral-200  (solid gray photo placeholder)
 *   icon  → bg-neutral-100  (host for an <Icon/> tile, e.g. ingredient rows,
 *           quick-action tiles)
 *
 * Sizes map to the inventory's estimated tile sizes, rounded to Tailwind
 * defaults (consistency over pixel-perfect): sm 40px, md 48px, lg 64px (the
 * ~72px recipe thumb → nearest default `h-16`).
 */
const SIZES = {
  sm: 'h-10 w-10', // ingredient icon tile (~40px)
  md: 'h-12 w-12', // food row thumb / quick-action tile (~48px)
  lg: 'h-16 w-16', // recipe row thumb (~72px → nearest default)
}

const TONES = {
  image: 'bg-neutral-200',
  icon: 'bg-neutral-100 text-neutral-500',
}

export default function Thumbnail({ size = 'md', tone = 'image', className, children, ...rest }) {
  return (
    <div
      className={cn('grid shrink-0 place-items-center overflow-hidden rounded-xl', SIZES[size], TONES[tone], className)}
      {...rest}
    >
      {children}
    </div>
  )
}
