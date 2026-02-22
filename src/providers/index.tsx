import React from 'react'
import { MantineProvider } from '@mantine/core'
import { theme } from '@/theme'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

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
