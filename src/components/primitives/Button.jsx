import { cn } from '../../lib/cn'
import Icon from './Icon'

/*
 * Button — full-width action button (DESIGN_INVENTORY 4.14).
 *
 * `h-12 rounded-xl text-sm font-semibold`. Primary = filled ink
 * (`bg-neutral-900 text-white`), Secondary = outline (`border-neutral-200
 * text-neutral-500`). Defaults to full width because every button observed in
 * the screenshots (Record Food, Cancel, Load More Recipes, Record) is full
 * width; pass `fullWidth={false}` for an intrinsic-width button.
 */
const VARIANTS = {
  primary: 'bg-neutral-900 text-white',
  secondary: 'border border-neutral-200 bg-white text-neutral-500',
}

export default function Button({
  variant = 'primary',
  leadingIcon,
  fullWidth = true,
  type = 'button',
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold',
        VARIANTS[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {leadingIcon && <Icon as={leadingIcon} size="inline" />}
      {children}
    </button>
  )
}
