import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'
import { Button } from '@mantine/core'

import type { Page, Post } from '@/payload-types'

// Define Mantine-compatible ButtonProps type if needed, or use Mantine's directly
type MantineButtonVariant = 'filled' | 'light' | 'outline' | 'default' | 'subtle' | 'transparent';
type MantineButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CMSLinkType = {
  appearance?: 'inline' | MantineButtonVariant | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: MantineButtonSize | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const mantineSize = sizeFromProps || 'md'; // Default to 'md' if not specified
  // Map Shadcn variants to Mantine variants
  const mantineVariant: MantineButtonVariant = appearance === 'inline' ? 'subtle' : (appearance as MantineButtonVariant || 'default');
  
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button 
      component={Link} // Use Mantine's component prop for Next.js Link
      href={href || url || ''} 
      variant={mantineVariant} 
      size={mantineSize}
      className={cn(className)} // Retain className for additional utility classes
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </Button>
  )
}
