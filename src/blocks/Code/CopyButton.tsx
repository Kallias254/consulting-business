'use client'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { useState } from 'react'
import { Button, Group, Text } from '@mantine/core' // Added Text for the label

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState('Copy')

  function updateCopyStatus() {
    if (text === 'Copy') {
      setText(() => 'Copied!')
      setTimeout(() => {
        setText(() => 'Copy')
      }, 1000)
    }
  }

  return (
    <div className="flex justify-end align-middle">
      <Button
        variant="default" // Equivalent to a neutral/secondary button
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          updateCopyStatus()
        }}
        leftSection={<CopyIcon />} // Icon on the left
      >
        {text}
      </Button>
    </div>
  )
}

