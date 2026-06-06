import { cn } from '../../lib/cn'
import Icon from './Icon'

/*
 * Badge — small label pill (DESIGN_INVENTORY 4.8).
 *
 * `h-6 px-2.5 rounded-full text-xs font-semibold`. Used for image labels
 * ("High Protein", "Verified", "FEATURED", "Low Calorie") and inline tags.
 * Variants are flat (no opacity):
 *   onImage → bg-white text-neutral-900   (overlaid on a photo)
 *   solid   → bg-neutral-900 text-white
 *   soft    → bg-neutral-100 text-neutral-500  (neutral inline chip)
 */
const VARIANTS = {
  onImage: 'bg-white text-neutral-900',
  solid: 'bg-neutral-900 text-white',
  soft: 'bg-neutral-100 text-neutral-500',
}

export default function Badge({ variant = 'onImage', leadingIcon, className, children, ...rest }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1 rounded-full px-2.5 text-xs font-semibold',
        VARIANTS[variant],
        className,
      )}
      {...rest}
    >
      {leadingIcon && <Icon as={leadingIcon} size="small" />}
      {children}
    </span>
  )
}
