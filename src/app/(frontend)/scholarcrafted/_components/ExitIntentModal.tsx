'use client'

import React, { useState, useEffect } from 'react'
import { Modal, Box, Stack, Title, Text, Button, rem, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'

export function ExitIntentModal() {
  const theme = useMantineTheme()
  const active = theme.other
  const [opened, { open, close }] = useDisclosure(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setShown(true)
        open()
      }
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [shown, open])

  return (
    <Modal
      opened={opened}
      onClose={close}
      withCloseButton={true}
      centered
      size="lg"
      overlayProps={{ backgroundOpacity: 0.6, blur: 6 }}
      styles={{
        content: {
          backgroundColor: active.surface,
          borderRadius: 0,
          border: `3px solid ${active.primary}`,
        },
        header: {
          backgroundColor: active.surface,
        },
        close: {
          color: active.primary,
        },
      }}
    >
      <Box p={rem(32)} style={{ textAlign: 'center' }}>
        <Stack gap="lg" align="center">
          <Text
            size="xs"
            fw={700}
            c="dimmed"
            style={{ letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            Before You Go
          </Text>
          <Title
            order={2}
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: rem(32),
              color: active.primary,
              lineHeight: 1.25,
            }}
          >
            Not sure which service is right for you?
          </Title>
          <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: 420 }}>
            Grab a free consultation and we'll point you in the right direction.
            No cost. No obligation.
          </Text>
          <Stack gap="sm" style={{ width: '100%', maxWidth: 360 }}>
            <Link
              href="/scholarcrafted/consultation?interest=other&metBefore=no"
              style={{ textDecoration: 'none' }}
              onClick={close}
            >
              <Button
                fullWidth
                size="lg"
                radius={0}
                variant="filled"
                bg={active.primary}
                fw={700}
                style={{ letterSpacing: '0.08em' }}
              >
                BOOK NOW
              </Button>
            </Link>
            <Text
              size="xs"
              c="dimmed"
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={close}
            >
              No thanks.
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  )
}
