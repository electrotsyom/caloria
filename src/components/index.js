/*
 * Wireframe component library — single entry point.
 *
 * Re-exports every reusable building block so screens can import from one path:
 *   import { Screen, ScreenHeader, SearchInput, ListRow, Pill } from '../components'
 *
 * Grouped by category (see folder-structure.md). Components only — no screens,
 * routes, or application logic live here.
 */
export * from './primitives'
export * from './navigation'
export * from './inputs'
export * from './lists'
export * from './data-display'
export * from './layout'
