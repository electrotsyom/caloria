import { cn } from '../../lib/cn'
import Text from '../primitives/Text'

/*
 * SectionHeader — section title with an optional trailing action.
 *
 * "Popular Foods" + "See all", "Meal Time" + "Today", "Recently Logged" +
 * "Clear". The title uses the section style (T3); `action` is any node, usually
 * a link-styled button (<Text variant="link"/> inside a button). Used by
 * ScreenSection but also standalone inside cards.
 */
export default function SectionHeader({ title, action, className }) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Text as="h2" variant="section">
        {title}
      </Text>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
