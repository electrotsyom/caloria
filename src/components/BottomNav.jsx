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
 *
 * `Recipes` is the only in-scope tab, so it is scoped to the active prototype via
 * `basePath` (see below). Home / Reports / Profile stay global placeholders.
 */
const TABS = [
  { to: '/home', label: 'Home', Icon: HomeIcon, ActiveIcon: HomeIconSolid },
  { to: '/recipes', label: 'Recipes', Icon: BookOpenIcon, ActiveIcon: BookOpenIconSolid, scoped: true },
  { to: '/reports', label: 'Reports', Icon: ChartBarIcon, ActiveIcon: ChartBarIconSolid },
  { to: '/profile', label: 'Profile', Icon: UserCircleIcon, ActiveIcon: UserCircleIconSolid },
]

/* A standard tab inside the floating pill. */
function NavTab({ to, label, Icon, ActiveIcon, scoped, basePath }) {
  const href = scoped ? `${basePath}${to}` : to
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium transition-colors ${
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
 * A floating navigation that hovers above the screen content near the bottom of
 * the MobileFrame: a rounded "pill" holding the four primary tabs (Home ·
 * Recipes · Reports · Profile) and a separate circular Add button detached to
 * its right. The Add action opens the merged Log Food screen at /log.
 *
 * The outer <nav> is absolutely positioned over the scroll area (the frame is
 * `relative`) and uses `pointer-events-none` so it never blocks taps on the
 * content behind the gaps; the pill and button re-enable pointer events. Screens
 * reserve clearance via the Screen component's `pb-24`.
 *
 * `basePath` scopes the in-prototype destinations (Recipes tab + Add FAB) so the
 * nav keeps the user inside their prototype — `/caloria/*` or `/wireframe/*`.
 */
export default function BottomNav({ basePath = '' }) {
  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center gap-3 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
      {/* Floating pill with the four primary tabs */}
      <div className="pointer-events-auto flex flex-1 items-stretch rounded-full border border-neutral-200 bg-white/90 px-2 shadow-lg backdrop-blur">
        <NavTab {...TABS[0]} basePath={basePath} />
        <NavTab {...TABS[1]} basePath={basePath} />
        <NavTab {...TABS[2]} basePath={basePath} />
        <NavTab {...TABS[3]} basePath={basePath} />
      </div>

      {/* Separate, detached Add button on the right */}
      <NavLink
        to={`${basePath}/log`}
        aria-label="Add"
        className="pointer-events-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-900 shadow-lg backdrop-blur transition-colors hover:text-neutral-600"
      >
        <PlusIcon className="h-7 w-7" />
      </NavLink>
    </nav>
  )
}
