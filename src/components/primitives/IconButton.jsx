import { cn } from '../../lib/cn'
import Icon from './Icon'

/*
 * IconButton — circular icon control.
 *
 * Covers every round button in the inventory: header back/avatar/filter
 * (size="header"), inline row "+" / heart (size="inline"), and stepper −/+
 * (size="stepper"). `label` is required and maps to aria-label.
 *
 * Variants (grayscale only):
 *   soft    → bg-neutral-100         (default header / inline action)
 *   overlay → bg-white/80            (controls over a hero image; flat, no blur)
 *   filled  → bg-neutral-900 white   (stepper +, primary inline action)
 *   outline → border-neutral-200     (stepper −)
 *   ghost   → transparent            (bare glyph button)
 */
const SIZES = {
  header: 'h-10 w-10',
  inline: 'h-8 w-8',
  inlineSm: 'h-5 w-5',
  stepper: 'h-9 w-9',
}

// Glyph size paired with each button size (back chevron reads larger).
const GLYPH = {
  header: 'nav',
  inline: 'inline',
  inlineSm: 'small',
  stepper: 'inline',
}

const VARIANTS = {
  soft: 'bg-neutral-100 text-neutral-900',
  overlay: 'bg-white/80 text-neutral-900',
  filled: 'bg-neutral-900 text-white',
  outline: 'border border-neutral-200 text-neutral-900 bg-white',
  ghost: 'text-neutral-500',
}

export default function IconButton({
  icon,
  label,
  size = 'header',
  variant = 'soft',
  glyphSize,
  type = 'button',
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn('grid shrink-0 place-items-center rounded-full', SIZES[size], VARIANTS[variant], className)}
      {...rest}
    >
      <Icon as={icon} size={glyphSize || GLYPH[size]} />
    </button>
  )
}
