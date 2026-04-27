'use client'

import React from 'react'
import { Container, Group, Text, Stack, Button, rem, Box } from '@mantine/core'
import Link from 'next/link'

export function Navbar() {
  return (
    <Box
      component="nav"
      py="md"
      style={{
        borderBottom: '1px solid #eee',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
                className="nav-link"
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
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
                className="nav-link"
              >
                METHODOLOGY
              </Text>
            </Link>
            <Link href="/scholarcrafted/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text
                fw={500}
                size="xs"
                style={{ cursor: 'pointer', letterSpacing: '0.1em' }}
                className="nav-link"
              >
                ABOUT
              </Text>
            </Link>
            <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
              <Button
                variant="outline"
                color="dark"
                size="sm"
                radius={0}
                fw={600}
                style={{
                  letterSpacing: '0.1em',
                  height: rem(42),
                  paddingLeft: rem(24),
                  paddingRight: rem(24),
                }}
              >
                BOOK CONSULTATION
              </Button>
            </Link>
          </Group>
        </Group>
      </Container>
      <style jsx global>{`
        .nav-link:hover {
          color: var(--mantine-color-dark-9) !important;
          transition: color 0.2s ease;
        }
      `}</style>
    </Box>
  )
}
