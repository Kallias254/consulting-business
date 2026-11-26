'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Box, type BoxProps, useMantineTheme } from '@mantine/core'

interface EditorialCardProps extends BoxProps {
  children: React.ReactNode
  featured?: boolean
  interactive?: boolean
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
}

/**
 * Calm, hairline-bordered editorial card with a whisper-quiet cursor spotlight
 * and subtle lift on hover — designed for alternating white/grey sections
 * without heavy colored border bars.
 */
export function EditorialCard({
  children,
  featured = false,
  interactive = true,
  style,
  className = '',
  onClick,
  ...rest
}: EditorialCardProps) {
  const theme = useMantineTheme()
  const active = theme.other
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mx', `${x}px`)
    cardRef.current.style.setProperty('--my', `${y}px`)
  }

  return (
    <Box
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`editorial-card ${interactive ? 'editorial-card-interactive' : ''} ${
        featured ? 'editorial-card-featured' : ''
      } ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: featured
          ? `1px solid ${active.accent}55`
          : `1px solid ${active.primary}14`,
        ...style,
      }}
      {...rest}
    >
      {interactive && (
        <div
          aria-hidden="true"
          className="editorial-card-spotlight"
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </Box>
  )
}

interface EditorialRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Subtle scroll-triggered settle (10px upward + opacity) with cubic-bezier(0.16, 1, 0.3, 1).
 */
export function EditorialReveal({
  children,
  delay = 0,
  className = '',
  style,
}: EditorialRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/**
 * Whisper-thin 2px reading progress hairline pinned to the top of the viewport
 * on long-form service and editorial pages.
 */
export function ReadingProgressBar() {
  const theme = useMantineTheme()
  const active = theme.other
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setProgress(0)
        return
      }
      setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: '2px',
        backgroundColor: active.accent,
        zIndex: 1100,
        transition: 'width 0.08s linear',
        pointerEvents: 'none',
      }}
    />
  )
}
