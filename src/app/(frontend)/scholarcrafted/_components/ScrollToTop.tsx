'use client'

import React, { useEffect, useState } from 'react'
import { Box, rem, useMantineTheme } from '@mantine/core'
import { IconChevronUp } from '@tabler/icons-react'

export function ScrollToTop() {
  const theme = useMantineTheme()
  const active = theme.other
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Box
      onClick={scrollToTop}
      role="button"
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          scrollToTop()
        }
      }}
      className="back-to-top-btn"
      style={{
        position: 'fixed',
        bottom: rem(32),
        right: rem(32),
        width: rem(48),
        height: rem(48),
        borderRadius: '50%',
        backgroundColor: active.accent,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 950,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease, box-shadow 0.2s ease, background-color 0.2s ease',
        boxShadow: '0 8px 24px rgba(230, 92, 56, 0.35)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = active.action
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(230, 92, 56, 0.45)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = active.accent
        e.currentTarget.style.transform = visible ? 'translateY(0)' : 'translateY(16px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(230, 92, 56, 0.35)'
      }}
    >
      <IconChevronUp size={22} stroke={2} />
    </Box>
  )
}
