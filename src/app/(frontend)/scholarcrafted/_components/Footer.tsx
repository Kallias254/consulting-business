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
import {
  IconBrandLinkedin,
  IconBrandInstagram,
} from '@tabler/icons-react'

export function Footer({ bg }: { bg?: string }) {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box
      component="footer"
      pt={rem(100)}
      pb={rem(40)}
      bg={active.primary}
      c="white"
      style={{
        borderTop: 'none',
        position: 'relative'
      }}
      className="scholarcrafted-footer academic-watermark dark-scholar-section"
    >
      <Container size={1200} style={{ position: 'relative', zIndex: 1 }}>
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

            {/* Social Channels */}
            <Stack gap="xs">
              <Text size="xs" fw={700} c="rgba(255,255,255,0.7)" style={{ letterSpacing: '0.05em' }}>
                CONNECT WITH OUR FACULTY
              </Text>
              <Group gap="md">
                <a 
                  href="https://www.linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-icon-link"
                >
                  <IconBrandLinkedin size={24} />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-icon-link"
                >
                  <IconBrandInstagram size={24} />
                </a>
              </Group>
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
                href="/scholarcrafted/request-review"
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
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          text-decoration: none !important;
          display: inline-block;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0px;
          left: 0;
          background-color: #fff;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-link:hover {
          color: #ffffff !important;
        }
        .footer-link:hover::after {
          width: 100%;
        }

        .social-icon-link {
          color: rgba(255,255,255,0.55) !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .social-icon-link:hover {
          color: #ffffff !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Box>
  )
}
