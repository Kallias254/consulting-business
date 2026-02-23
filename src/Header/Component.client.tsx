'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation' // Added useRouter import
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { ActionIcon } from '@mantine/core' // Added ActionIcon import
import { IconLogout } from '@tabler/icons-react' // Added IconLogout import

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const router = useRouter() // Initialize useRouter

  const handleLogout = async () => {
    // Payload logout usually clears the cookie
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Hide global header in portal routes to avoid duplication with AppShell
  const isPortal = pathname.startsWith('/researcher') ||
                   pathname.startsWith('/admin/command') ||
                   pathname.startsWith('/dashboard')

  if (isPortal) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-dark-forest/90 backdrop-blur-md" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container py-4 flex justify-between items-center">
        <Link className="flex items-center gap-2 group" href="/">
          <span className="text-burnished-gold text-2xl group-hover:scale-110 transition-transform">◈</span>
          <span className="font-display text-xl tracking-tighter text-parchment uppercase">Scientist / aaS</span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3 font-sans text-[8px] text-deep-green/40 tracking-[0.25em] uppercase">
            <span>GATEWAY_STATUS:</span>
            <span className="w-1 h-1 bg-sage rounded-full shadow-[0_0_8px_var(--color-sage)]"></span>
            <span className="text-sage font-bold">OPTIMAL</span>
          </div>

          <HeaderNav data={data} />

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex px-4 py-1.5 border border-burnished-gold/30 text-burnished-gold font-sans text-[9px] font-bold tracking-widest uppercase transition-all hover:bg-burnished-gold hover:text-dark-forest"
            >
              PORTAL_
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <ActionIcon
              variant="subtle"
              color="burnished-gold"
              onClick={handleLogout}
              title="Logout"
            >
              <IconLogout size={18} />
            </ActionIcon>
          </div>
        </div>
      </div>
    </header>
  )
}

