import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { Inter, EB_Garamond, Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { ColorSchemeScript } from '@mantine/core'

import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/dates/styles.css'
import './globals.css'

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading-sans',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(ebGaramond.variable, cormorant.variable, jakarta.variable, inter.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <ColorSchemeScript defaultColorScheme="dark" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Consulting Business',
}
