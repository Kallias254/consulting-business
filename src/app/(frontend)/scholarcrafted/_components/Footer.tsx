'use client'

import React from 'react'
import { Container, SimpleGrid, Stack, Text, Group, Divider, rem, Box, List } from '@mantine/core'
import Link from 'next/link'

export function Footer() {
  return (
    <Box
      component="footer"
      pt={rem(100)}
      pb={rem(40)}
      bg="#F9F8F6"
      style={{ borderTop: '1px solid #eee' }}
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
                }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                fw={500}
                c="dimmed"
                style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: rem(10) }}
              >
                Academic Consultancy
              </Text>
            </Stack>
            <Text size="sm" c="dimmed" lh={1.6}>
              Providing rigorous editorial support and strategic guidance for doctoral candidates at
              leading institutions worldwide.
            </Text>
            <Stack gap={4}>
              <Text size="xs" fw={700} style={{ letterSpacing: '0.05em' }}>
                OFFICES
              </Text>
              <Text size="xs" c="dimmed">
                Boston &bull; New York &bull; Oxford
              </Text>
            </Stack>
          </Stack>

          {/* Services Column */}
          <Stack gap="xl">
            <Text fw={700} size="xs" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Services
            </Text>
            <Stack gap="sm">
              <Link
                href="/scholarcrafted/services/dissertation-coaching"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text size="sm" c="dimmed" className="footer-link">
                  Dissertation Coaching
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/services/editing-proofreading"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text size="sm" c="dimmed" className="footer-link">
                  Editing & Proofreading
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/services/research-support"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text size="sm" c="dimmed" className="footer-link">
                  Research Support
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/consultation"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text size="sm" c="dimmed" className="footer-link">
                  Strategic Review
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Firm Column */}
          <Stack gap="xl">
            <Text fw={700} size="xs" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              The Firm
            </Text>
            <Stack gap="sm">
              <Link
                href="/scholarcrafted/about"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text size="sm" c="dimmed" className="footer-link">
                  About Micah, PhD
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/how-it-works"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text size="sm" c="dimmed" className="footer-link">
                  Our Methodology
                </Text>
              </Link>
              <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" c="dimmed" className="footer-link">
                  Academic Integrity
                </Text>
              </Link>
              <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" c="dimmed" className="footer-link">
                  Contact
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Contact/Newsletter Column */}
          <Stack gap="xl">
            <Text fw={700} size="xs" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Inquiries
            </Text>
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                admissions@scholarcrafted.com
              </Text>
              <Text size="sm" c="dimmed">
                +1 (617) 555-0123
              </Text>
            </Stack>
            <Text size="xs" c="dimmed" lh={1.5}>
              For urgent manuscript reviews, please include "URGENT" in your inquiry subject line.
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider mb="xl" style={{ opacity: 0.5 }} />

        <Group justify="space-between" align="center">
          <Group gap="xl">
            <Text size="xs" c="dimmed">
              &copy; 2026 ScholarCrafted Academic Consultancy. All rights reserved.
            </Text>
          </Group>
          <Group gap="xl">
            <Text size="xs" c="dimmed" style={{ cursor: 'pointer' }}>
              Privacy Policy
            </Text>
            <Text size="xs" c="dimmed" style={{ cursor: 'pointer' }}>
              Terms of Service
            </Text>
            <Text
              size="xs"
              fw={600}
              style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}
            >
              Strictly Confidential
            </Text>
          </Group>
        </Group>
      </Container>

      <style jsx global>{`
        .footer-link:hover {
          color: var(--mantine-color-dark-9) !important;
          transition: color 0.2s ease;
        }
      `}</style>
    </Box>
  )
}
