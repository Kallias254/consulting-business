import PocketBase from 'pocketbase'

// Single PocketBase instance for the entire SPA.
// pb.authStore persists the JWT token in localStorage automatically.
const pb = new PocketBase(import.meta.env.VITE_PB_URL ?? 'http://127.0.0.1:8099')

// Disable auto-cancellation globally to prevent React StrictMode double-renders
// in development from cancelling parallel/duplicate requests.
pb.autoCancellation(false)

export default pb
