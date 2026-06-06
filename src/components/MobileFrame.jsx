/**
 * MobileFrame
 *
 * A fixed 375px-wide phone-style shell, centered on desktop with a white
 * background. The `children` render inside a scrollable screen area, and an
 * optional `bottomNav` is pinned to the bottom of the frame so screen content
 * never hides behind it.
 */
export default function MobileFrame({ children, bottomNav }) {
  return (
    <div className="min-h-screen w-full flex justify-center bg-slate-100">
      <div className="relative h-screen w-[375px] bg-white shadow-xl flex flex-col overflow-hidden">
        {/* Screen content slot — `min-h-0` lets this flex child shrink so its own
            scroll (overflow-y-auto) handles overflow, keeping the frame at the
            viewport height and the bottom nav pinned to the bottom. */}
        <main className="min-h-0 flex-1 overflow-y-auto scrollbar-hide">{children}</main>

        {/* Bottom navigation slot */}
        {bottomNav}
      </div>
    </div>
  )
}
