import { MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/cn'
import Icon from '../primitives/Icon'

/*
 * SearchInput — search field (DESIGN_INVENTORY 4.2).
 *
 * `h-12 rounded-full border border-neutral-200 bg-white px-4`, leading magnifier
 * + input + trailing mic in a soft circle. Used on Home and Recipes. The
 * trailing control is configurable (defaults to the mic); pass
 * `trailingIcon={null}` to drop it.
 *
 * This is the only text input present in the screenshots — there is no generic
 * TextInput in the library (see component-library.md "Deferred").
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  trailingIcon = MicrophoneIcon,
  onTrailingClick,
  trailingLabel = 'Voice search',
  className,
  ...rest
}) {
  return (
    <div className={cn('flex h-12 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4', className)}>
      <Icon as={MagnifyingGlassIcon} size="inline" className="text-neutral-400" />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        {...rest}
      />
      {trailingIcon && (
        <button
          type="button"
          aria-label={trailingLabel}
          onClick={onTrailingClick}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-neutral-100"
        >
          <Icon as={trailingIcon} size="small" className="text-neutral-500" />
        </button>
      )}
    </div>
  )
}
