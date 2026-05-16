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

export function Footer({ bg }: { bg?: string }) {
  const theme = useMantineTheme()
  const active = theme.other

  const footerBg = bg || active.background

  return (
    <Box
      component="footer"
      pt={rem(100)}
      pb={rem(40)}
      bg={active.primary}
      c="white"
      style={{
        borderTop: 'none' }}
      className="scholarcrafted-footer"
    >
      <Container size={1100}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(60)} mb={rem(80)}>
          {/* Brand Column */}
          <Stack gap="xl">
            <Stack gap={0}>
              <Text
                fw={700}
                c="white"
                style={{
                  fontSize: rem(24),
                  lineHeight: 1 }}
              >
                SCHOLARCRAFTED
              </Text>
              <Text
                size="xs"
                c="rgba(255,255,255,0.6)"
                style={{ fontSize: rem(10) }}
              >
                ESTABLISHED 2016
              </Text>
            </Stack>
            <Text
              size="sm"
              lh={1.7}
              c="rgba(255,255,255,0.8)"
            >
              A prestigious advisory firm dedicated to the rigorous oversight and structural
              refinement of doctoral research across the global academic community.
            </Text>
            <Stack gap={4}>
              <Text size="xs" fw={700} c="white" style={{ letterSpacing: '0.05em' }}>
                FACULTY LOCATIONS
              </Text>
              <Text size="xs" c="rgba(255,255,255,0.6)">
                Boston &bull; New York &bull; Oxford &bull; Cambridge
              </Text>
            </Stack>
          </Stack>

          {/* Services Column */}
          <Stack gap="xl">
            <Text
              size="xs"
              c="white"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
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
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
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
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
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
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
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
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
                >
                  Strategic Review
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Firm Column */}
          <Stack gap="xl">
            <Text
              size="xs"
              c="white"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
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
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
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
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
                >
                  Our Scholarly Tradition
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/resources"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
                >
                  Downloadable Blueprints
                </Text>
              </Link>
              <Link
                href="/scholarcrafted/blog"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Text
                  size="sm"
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
                >
                  Strategic Library (Blog)
                </Text>
              </Link>
              <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text
                  size="sm"
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
                >
                  Research Ethics
                </Text>
              </Link>
              <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text
                  size="sm"
                  className="footer-link"
                  c="rgba(255,255,255,0.6)"
                >
                  Governance
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Contact/Newsletter Column */}
          <Stack gap="xl">
            <Text
              size="xs"
              c="white"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}
            >
              Official Inquiries
            </Text>
            <Stack gap="xs">
              <Text size="sm" fw={600} c="white">
                admissions@scholarcrafted.com
              </Text>
              <Text size="sm" c="rgba(255,255,255,0.6)">
                +1 (617) 555-0123
              </Text>
            </Stack>
            <Text
              size="xs"
              lh={1.6}
              fs="italic"
              c="rgba(255,255,255,0.5)"
            >
              &quot;Guidance is not just advice; it is the transfer of structural authority.&quot;
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider mb="xl" color="rgba(255,255,255,0.1)" />

        <Group justify="space-between" align="center">
          <Group gap="xl">
            <Text size="xs" c="rgba(255,255,255,0.5)">
              &copy; 2026 ScholarCrafted Academic Consultancy. All rights reserved.
            </Text>
          </Group>
          <Group gap="xl">
            <Text
              size="xs"
              c="rgba(255,255,255,0.6)"
              style={{ cursor: 'pointer' }}
              className="footer-link"
            >
              Privacy & Ethics
            </Text>
            <Link href="/scholarcrafted/terms" style={{ textDecoration: 'none' }}>
              <Text
                size="xs"
                c="rgba(255,255,255,0.6)"
                style={{ cursor: 'pointer' }}
                className="footer-link"
              >
                Terms & Conditions
              </Text>
            </Link>
            <Text
              size="xs"
              c="rgba(255,255,255,0.5)"
            >
              Strictly Confidential
            </Text>
          </Group>
        </Group>
      </Container>

      <style jsx global>{`
        .footer-link {
          color: rgba(255,255,255,0.6) !important;
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #ffffff !important;
          text-decoration: none !important;
        }
      `}</style>
    </Box>
  )
}
