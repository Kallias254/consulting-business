'use client'

import React from 'react'
import { Container, Group, Text, Stack, Button, rem, Box, useMantineTheme } from '@mantine/core'
import Link from 'next/link'

export function Navbar() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box
      component="nav"
      py="md"
      style={{
        borderBottom: `1px solid ${active.primary}18`,
        backgroundColor: `${active.background}ee`,
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
    >
      <Container size={1100}>
        <Group justify="space-between">
          <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack gap={0}>
              <Text
                fw={700}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: rem(22),
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: active.primary,
                }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                fw={500}
                c="dimmed"
                style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: rem(9) }}
              >
                Academic Consultancy
              </Text>
            </Stack>
          </Link>
          <Group gap="xl" visibleFrom="sm">
            <Link
              href="/scholarcrafted/services"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Text
                fw={500}
                size="xs"
                className="nav-link"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                SERVICES
              </Text>
            </Link>
            <Link
              href="/scholarcrafted/how-it-works"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Text
                fw={500}
                size="xs"
                className="nav-link"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                HOW IT WORKS
              </Text>
            </Link>
            <Link
              href="/scholarcrafted/resources"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Text
                fw={500}
                size="xs"
                className="nav-link"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                RESOURCES
              </Text>
            </Link>
            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text
                fw={500}
                size="xs"
                className="nav-link"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
              >
                ABOUT
              </Text>
            </Link>
            <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                color={active.primary}
                size="md"
                radius={0}
                fw={600}
                style={{
                  letterSpacing: '0.1em',
                  paddingLeft: rem(24),
                  paddingRight: rem(24),
                  borderColor: active.primary,
                }}
              >
                FREE INTRODUCTORY CALL
              </Button>
            </Link>
          </Group>
        </Group>
      </Container>
      <style jsx global>{`
        .nav-link {
          color: #666;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: ${active.primary} !important;
        }
      `}</style>
    </Box>
  )
}
