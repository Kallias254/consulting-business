import { useState, useEffect } from 'react'
import type { RecordModel } from 'pocketbase'
import pb from '@/lib/pb'

/**
 * Reactive hook for PocketBase auth state.
 * Subscribes to pb.authStore changes so any component using this
 * re-renders whenever the user logs in or out.
 */
export function useAuth() {
  const [user, setUser] = useState<RecordModel | null>(
    pb.authStore.record as RecordModel | null,
  )
  const [isValid, setIsValid] = useState(pb.authStore.isValid)

  useEffect(() => {
    // pb.authStore.onChange fires on login, logout, and token refresh
    const unsub = pb.authStore.onChange(() => {
      setUser(pb.authStore.record as RecordModel | null)
      setIsValid(pb.authStore.isValid)
    })
    return unsub
  }, [])

  async function login(email: string, password: string) {
    const auth = await pb.collection('users').authWithPassword(email, password)
    return auth
  }

  function logout() {
    pb.authStore.clear()
  }

  return { user, isValid, login, logout }
}
