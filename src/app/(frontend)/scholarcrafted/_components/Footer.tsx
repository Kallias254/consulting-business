'use client'

import React from 'react'
import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  Group,
  Divider,
  rem,
  Box,
  useMantineTheme,
} from '@mantine/core'
import Link from 'next/link'

export function Footer() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box
      component="footer"
      pt={rem(100)}
      pb={rem(40)}
      bg={active.primary === '#A51C30' ? active.primary : active.surface}
      c={active.primary === '#A51C30' ? 'white' : active.primary}
      style={{
        borderTop: `1px solid ${active.primary === '#A51C30' ? 'rgba(255,255,255,0.2)' : '#eee'}`,
      }}
      className="scholarcrafted-footer"
    >
      <Container size={1100}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(60)} mb={rem(80)}>
          {/* Brand Column */}
          <Stack gap="xl">
            <Stack gap={0}>
              <Text
                fw={700}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: rem(24),
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: 'inherit',
                }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                fw={700}
                c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.7)' : 'dimmed'}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: rem(10) }}
              >
                ESTABLISHED 2016
              </Text>
            </Stack>
            <Text
              size="sm"
              c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
              lh={1.7}
            >
              A prestigious advisory firm dedicated to the rigorous oversight and structural
              refinement of doctoral research across the global academic community.
            </Text>
            <Stack gap={4}>
              <Text size="xs" fw={700} style={{ letterSpacing: '0.05em', color: 'inherit' }}>
                FACULTY LOCATIONS
              </Text>
              <Text size="xs" c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}>
                Boston &bull; New York &bull; Oxford &bull; Cambridge
              </Text>
            </Stack>
          </Stack>

          {/* Services Column */}
          <Stack gap="xl">
            <Text
              fw={700}
              size="xs"
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: 'inherit' }}
            >
              Advisory
            </Text>
            <Stack gap="sm">
              <Link
                href="/scholarcrafted/services/private-coaching"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Private Coaching
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/services/editing-proofreading"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Structural Editing & Proofreading
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/services/research-support"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Methodology Oversight
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/consultation"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Strategic Review
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Firm Column */}
          <Stack gap="xl">
            <Text
              fw={700}
              size="xs"
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: 'inherit' }}
            >
              The Institution
            </Text>
            <Stack gap="sm">
              <Link
                href="/scholarcrafted/about"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Micah, PhD & Faculty
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/how-it-works"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Our Scholarly Tradition
                </Text>
              </Link>
              <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Research Ethics
                </Text>
              </Link>
              <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text
                  size="sm"
                  c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
                  className="footer-link"
                >
                  Governance
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Contact/Newsletter Column */}
          <Stack gap="xl">
            <Text
              fw={700}
              size="xs"
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase', color: 'inherit' }}
            >
              Official Inquiries
            </Text>
            <Stack gap="xs">
              <Text size="sm" fw={600} color={'inherit'}>
                admissions@scholarcrafted.com
              </Text>
              <Text size="sm" c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}>
                +1 (617) 555-0123
              </Text>
            </Stack>
            <Text
              size="xs"
              c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
              lh={1.6}
              fs="italic"
            >
              &quot;Guidance is not just advice; it is the transfer of structural authority.&quot;
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider mb="xl" style={{ opacity: 0.2 }} />

        <Group justify="space-between" align="center">
          <Group gap="xl">
            <Text size="xs" c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}>
              &copy; 2026 ScholarCrafted Academic Consultancy. All rights reserved.
            </Text>
          </Group>
          <Group gap="xl">
            <Text
              size="xs"
              c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
              style={{ cursor: 'pointer' }}
              className="footer-link"
            >
              Privacy & Ethics
            </Text>
            <Text
              size="xs"
              c={active.primary === '#A51C30' ? 'rgba(255,255,255,0.8)' : 'dimmed'}
              style={{ cursor: 'pointer' }}
              className="footer-link"
            >
              Honor Code
            </Text>
            <Text
              size="xs"
              fw={700}
              color={'inherit'}
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              Strictly Confidential
            </Text>
          </Group>
        </Group>
      </Container>

      <style jsx global>{`
        .footer-link:hover {
          color: ${active.primary === '#A51C30' ? '#FFFFFF' : active.primary} !important;
          text-decoration: underline !important;
        }
      `}</style>
    </Box>
  )
}
