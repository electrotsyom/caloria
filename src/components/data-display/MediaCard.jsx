import { cn } from '../../lib/cn'
import Text from '../primitives/Text'

/*
 * MediaCard — image-led card, two variants from one component.
 *
 *   horizontal (4.7) → Suggested-for-You carousel item: fixed-width card,
 *                      image on top, title + meta + optional `action` below.
 *   featured   (4.16) → Recipes hero promo: full-width image with a flat
 *                      `bg-neutral-900/40` scrim, `badge` top + title/meta
 *                      overlaid bottom. White text is legible on the scrim.
 *
 * The image area is a solid `bg-neutral-200` placeholder by default (the base
 * wireframe); pass `image` (a URL) to render a cover-fit photo over it — used by
 * the Linear visual direction. On `featured`, the photo sits under the scrim so
 * white text stays legible; the placeholder tone shows through if a load fails.
 * `meta` is any node (rating / time / kcal cluster). Card heights use nearest
 * Tailwind defaults for the inventory's estimates (h-24 image, h-44 featured).
 */
export default function MediaCard({
  variant = 'horizontal',
  title,
  meta,
  badge,
  action,
  image,
  className,
  children,
}) {
  if (variant === 'featured') {
    return (
      <div className={cn('relative h-44 overflow-hidden rounded-2xl bg-neutral-200', className)}>
        {image && <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-neutral-900/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-3">
          <div className="flex">{badge}</div>
          <div>
            {title && (
              <Text variant="cardTitle" className="block text-white">
                {title}
              </Text>
            )}
            {meta && <div className="mt-1 text-xs text-white/80">{meta}</div>}
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className={cn('w-40 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm', className)}>
      <div className="relative h-24 bg-neutral-200">
        {image && <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
        {badge && <div className="absolute left-2 top-2">{badge}</div>}
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          {title && (
            <Text variant="cardTitle" className="block truncate">
              {title}
            </Text>
          )}
          {meta && <div className="text-xs text-neutral-400">{meta}</div>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}
