import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Antonio, Inter } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { ColorSchemeScript } from '@mantine/core'

import '@mantine/core/styles.css'
import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const antonio = Antonio({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(antonio.variable, inter.variable)}
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
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
