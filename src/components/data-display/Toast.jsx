import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Icon from '../primitives/Icon'

/*
 * Toast — transient confirmation pill (e.g. the Record / Record Food success
 * message). Presentational only: the caller owns the visible state and any
 * auto-dismiss timer.
 *
 * Renders nothing when `show` is false. When shown it floats centered just
 * above its nearest positioned ancestor (`bottom-full`), so wrap it in a
 * `relative` container — the sticky footer is the intended anchor.
 */
export default function Toast({ show, icon = CheckCircleIcon, children }) {
  if (!show) return null
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-full mb-3 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-white shadow-lg">
        <Icon as={icon} size="small" className="text-white" />
        <span className="text-sm font-medium">{children}</span>
      </div>
    </div>
  )
}
