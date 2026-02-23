import Link from 'next/link'
import React from 'react'

import { Button } from '@mantine/core'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button component={Link} href="/">
        Go home
      </Button>
    </div>
  )
}
