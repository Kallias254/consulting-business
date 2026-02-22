'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ActionIcon, Button, Text } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

export const LogoutButton: React.FC<{ variant?: 'icon' | 'button' }> = ({ variant = 'icon' }) => {
  const router = useRouter()

  const handleLogout = async () => {
    // Payload logout usually clears the cookie
    await fetch('/api/users/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  if (variant === 'button') {
    return (
      <Button 
        variant="subtle" 
        color="burnished-gold" 
        size="xs" 
        radius={0}
        onClick={handleLogout}
        leftSection={<IconLogout size={16} />}
        styles={{
          root: {
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }
        }}
      >
        LOGOUT_
      </Button>
    )
  }

  return (
    <ActionIcon 
      variant="subtle" 
      color="burnished-gold" 
      onClick={handleLogout}
      title="Logout"
    >
      <IconLogout size={18} />
    </ActionIcon>
  )
}
