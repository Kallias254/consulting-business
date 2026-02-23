'use client'

import React, { useState } from 'react'
import { Select } from '@mantine/core'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: string | null) => { // Mantine's Select onChange can return null
    if (themeToSet === 'auto' || themeToSet === null) {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet as Theme) // Cast back to Theme
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  const data = [
    { value: 'auto', label: 'Auto' },
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <Select
      value={value}
      onChange={onThemeChange}
      data={data}
      placeholder="Theme"
      aria-label="Select a theme"
      variant="unstyled" // To match the original unstyled appearance
      size="xs" // Adjust size as needed
      styles={{
        input: {
          paddingLeft: 0,
          paddingRight: 0,
          backgroundColor: 'transparent',
          border: 'none',
          fontSize: 'var(--mantine-font-size-xs)', // Adjust font size as needed
        },
      }}
    />
  )
}
