import React from 'react'
import { MantineProvider } from '@mantine/core'
import { theme } from '@/theme'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

// Polyfill for useEffectEvent which is required by Mantine 9
if (typeof window !== 'undefined') {
  try {
    if (!(React as any).useEffectEvent) {
      ;(React as any).useEffectEvent =
        (React as any).experimental_useEffectEvent || ((fn: any) => fn)
    }
  } catch (e) {
    console.error('Failed to polyfill useEffectEvent', e)
  }
}

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
