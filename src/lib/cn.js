/**
 * cn — tiny className joiner.
 *
 * Filters out falsy values and joins the rest with a space. Keeps component
 * markup readable when toggling variant/state classes. No dependency on
 * `clsx`/`tailwind-merge` — the library never produces conflicting utilities,
 * so a plain join is enough.
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ')
}

export default cn
