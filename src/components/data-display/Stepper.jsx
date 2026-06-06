import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/cn'
import IconButton from '../primitives/IconButton'
import Text from '../primitives/Text'

/*
 * Stepper — increment / decrement control (DESIGN_INVENTORY 4.10).
 *
 * `[−] value [+]` with `gap-3`. Minus = outline IconButton, plus = filled
 * IconButton, both `h-9 w-9 rounded-full` (button radius is an open
 * verification item; defaulting to `rounded-full`). Used for Food Details
 * quantity and Recipe Detail servings. `value` is rendered as-is (string or
 * number) so callers control formatting.
 */
export default function Stepper({
  value,
  onDecrement,
  onIncrement,
  decrementLabel = 'Decrease',
  incrementLabel = 'Increase',
  className,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <IconButton icon={MinusIcon} label={decrementLabel} size="stepper" variant="outline" onClick={onDecrement} />
      <Text variant="cardTitle" className="w-8 text-center">
        {value}
      </Text>
      <IconButton icon={PlusIcon} label={incrementLabel} size="stepper" variant="filled" onClick={onIncrement} />
    </div>
  )
}
