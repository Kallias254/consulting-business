/**
 * PocketBase client singleton for browser & server usage.
 * All data fetching in this app goes through this instance.
 *
 * Backend runs at NEXT_PUBLIC_PB_URL (default: http://127.0.0.1:8099)
 */
import PocketBase from 'pocketbase'

const PB_URL = process.env.NEXT_PUBLIC_PB_URL || 'http://127.0.0.1:8099'

// Singleton: re-use the same instance across hot-reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __pb: PocketBase | undefined
}

function createPocketBase() {
  return new PocketBase(PB_URL)
}

const pb: PocketBase = globalThis.__pb ?? createPocketBase()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__pb = pb
}

export default pb
export { PB_URL }
