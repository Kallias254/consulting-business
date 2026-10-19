// Root page is handled by rewrites in next.config.js
// The "/" URL is internally rewritten to "/scholarcrafted" (the homepage)
// This file exists as a fallback — it should never actually render
// because the rewrite intercepts the request before it reaches here.

import { redirect } from 'next/navigation'

export default function RootPage() {
  // Fallback redirect in case the rewrite doesn't catch it
  redirect('/scholarcrafted')
}
