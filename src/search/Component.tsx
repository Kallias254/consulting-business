'use client'
import { TextInput, VisuallyHidden } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter } from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()

  const debouncedValue = useDebounce(value)

  useEffect(() => {
    router.push(`/search${debouncedValue ? `?q=${debouncedValue}` : ''}`)
  }, [debouncedValue, router])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <VisuallyHidden>
          <label htmlFor="search">Search</label>
        </VisuallyHidden>
        <TextInput
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search"
          aria-label="Search" // Added for explicit accessibility
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}

