'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react' // Replaced SearchIcon with IconSearch

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-8 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            className="font-sans text-[10px] tracking-[0.2em] text-parchment/60 hover:text-burnished-gold uppercase transition-colors"
          />
        )
      })}
      <Link href="/search" className="p-2 border border-deep-green/30 hover:border-burnished-gold transition-colors">
        <span className="sr-only">Search</span>
        <IconSearch size={12} className="text-burnished-gold" /> {/* Used IconSearch */}
      </Link>
    </nav>
  )
}
