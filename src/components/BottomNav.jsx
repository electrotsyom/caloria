import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  BookOpenIcon,
  ChartBarIcon,
  UserCircleIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid'

/*
 * Tabs use Heroicons v2 exclusively (outline by default, solid when active).
 * Colors follow the canonical grayscale ramp: active neutral-900, inactive neutral-400.
 */
const TABS = [
  { to: '/home', label: 'Home', Icon: HomeIcon, ActiveIcon: HomeIconSolid },
  { to: '/recipes', label: 'Recipes', Icon: BookOpenIcon, ActiveIcon: BookOpenIconSolid },
  { to: '/reports', label: 'Reports', Icon: ChartBarIcon, ActiveIcon: ChartBarIconSolid },
  { to: '/profile', label: 'Profile', Icon: UserCircleIcon, ActiveIcon: UserCircleIconSolid },
]

/* A standard (non-center) tab. */
function NavTab({ to, label, Icon, ActiveIcon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
          isActive ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
        }`
      }
    >
      {({ isActive }) =>
        isActive ? (
          <>
            <ActiveIcon className="h-6 w-6" />
            <span>{label}</span>
          </>
        ) : (
          <>
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </>
        )
      }
    </NavLink>
  )
}

/**
 * BottomNav
 *
 * Five-tab bar pinned inside the MobileFrame: Home · Recipes · Add (center,
 * raised) · Reports · Profile. The center "Add" action is a raised, circular
 * button that floats above the bar.
 */
export default function BottomNav() {
  return (
    <nav className="relative border-t border-neutral-200 bg-white">
      <div className="flex h-16 items-stretch px-2 pb-[env(safe-area-inset-bottom)]">
        <NavTab {...TABS[0]} />
        <NavTab {...TABS[1]} />

        {/* Center spacer reserves room for the raised Add button */}
        <div className="flex w-16 flex-shrink-0 items-center justify-center" />

        <NavTab {...TABS[2]} />
        <NavTab {...TABS[3]} />
      </div>

      {/* Raised center Add button (the FAB is the circle, so it renders a plain PlusIcon).
          Navigation map: the Add action opens the merged Log Food screen at /log. */}
      <NavLink
        to="/log"
        aria-label="Add"
        className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-colors hover:bg-neutral-700"
      >
        <PlusIcon className="h-7 w-7" />
      </NavLink>
    </nav>
  )
}
