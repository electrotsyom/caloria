import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/cn'
import Text from '../primitives/Text'
import IconButton from '../primitives/IconButton'

/*
 * ScreenHeader — the standard top header (DESIGN_INVENTORY 4.1).
 *
 * `[back?] [title] [action]`. Two variants from one component:
 *   - List header  → no back, an `action` on the right (avatar / filter).
 *   - Detail header → `onBack` renders a circular back button on the left.
 *
 * `action` is any node — typically an <IconButton/> or avatar. The Recipe
 * Detail "over the image" header is NOT this component: compose it from
 * IconButton variant="overlay" directly over the hero (see component-library.md).
 */
export default function ScreenHeader({ title, action, onBack, className }) {
  return (
    <header className={cn('flex items-start justify-between gap-3 px-4 pt-4', className)}>
      <div className="flex min-w-0 items-start gap-3">
        {onBack && <IconButton icon={ChevronLeftIcon} label="Back" size="header" onClick={onBack} />}
        <div className="min-w-0">
          {title && (
            <Text as="h1" variant="title" className="block">
              {title}
            </Text>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
