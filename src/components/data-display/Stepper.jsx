import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/cn'
import IconButton from '../primitives/IconButton'

/*
 * Stepper — increment / decrement control (DESIGN_INVENTORY 4.10).
 *
 * `[−] value [+]` with `gap-3`. Minus = outline IconButton, plus = filled
 * IconButton, both `h-9 w-9 rounded-full` (button radius is an open
 * verification item; defaulting to `rounded-full`). Used for Food Details
 * quantity and Recipe Detail servings. The value is an editable input — pass
 * `onValueChange` to receive the raw string on each keystroke; styling matches
 * the `cardTitle` Text variant so it reads as plain text until focused.
 */
export default function Stepper({
  value,
  onValueChange,
  onDecrement,
  onIncrement,
  decrementLabel = 'Decrease',
  incrementLabel = 'Increase',
  valueLabel = 'Value',
  inputClassName,
  className,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <IconButton icon={MinusIcon} label={decrementLabel} size="stepper" variant="outline" onClick={onDecrement} />
      <input
        type="text"
        inputMode="numeric"
        aria-label={valueLabel}
        value={value}
        readOnly={!onValueChange}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={cn(
          'text-center focus:outline-none',
          inputClassName ?? 'w-8 bg-transparent text-sm font-semibold text-neutral-900',
        )}
      />
      <IconButton icon={PlusIcon} label={incrementLabel} size="stepper" variant="outline" onClick={onIncrement} />
    </div>
  )
}
