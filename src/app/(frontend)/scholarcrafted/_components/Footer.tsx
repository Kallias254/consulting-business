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
  IconMail,
} from '@tabler/icons-react'
import { Logo } from './Logo'

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
        borderTop: `3px solid ${active.accent}`,
        position: 'relative'
      }}
      className="scholarcrafted-footer academic-watermark dark-scholar-section"
    >
      <Container size={1340} style={{ position: 'relative', zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={{ base: rem(40), md: rem(48) }} mb={rem(70)}>
          {/* Column 1: Brand, Inquiries & Faculty Bio */}
          <Stack gap="lg">
            <Link href="/scholarcrafted" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
              <Logo height={32} boxColor={active.accent} textColor="#ffffff" />
            </Link>
            <Text
              size="sm"
              lh={1.7}
              c="rgba(255,255,255,0.75)"
            >
              A faculty-led post-draft execution firm. We handle the technical production work — line editing, formatting, citation audits, and publisher preparation — that turns a finished manuscript into a published work.
            </Text>

            {/* Contact & Social */}
            <Group gap="md" align="center">
              <a
                href="mailto:contact@scholarcrafted.com"
                className="social-icon-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: rem(6), textDecoration: 'none' }}
              >
                <IconMail size={18} />
                <Text size="sm" c="rgba(255,255,255,0.65)" style={{ transition: 'color 0.2s ease' }}>
                  contact@scholarcrafted.com
                </Text>
              </a>
            </Group>
            <Group gap="md">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
              >
                <IconBrandLinkedin size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-link"
              >
                <IconBrandInstagram size={22} />
              </a>
            </Group>
          </Stack>

          {/* Column 2: Academic Editing (By paper & document type) */}
          <Stack gap="lg">
            <Text
              size="xs"
              c="white"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
            >
              Academic Editing
            </Text>
            <Stack gap={rem(10)}>
              <Link href="/scholarcrafted/order?focus=thesis" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Thesis editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=dissertation" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Dissertation editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=editing" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Research paper editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=journal-article" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Journal article editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=abstract" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Abstract editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=case-report" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Case report editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=systematic-review" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Systematic review editing
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=resubmission" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Resubmission support
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Column 3: Publication Support */}
          <Stack gap="lg">
            <Text
              size="xs"
              c="white"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
            >
              Publication Support
            </Text>
            <Stack gap={rem(10)}>
              <Link href="/scholarcrafted/order?service=ai-audit&single=true" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  AI manuscript audit
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=journal-formatting" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Manuscript formatting
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=journal&tier=essentials" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Journal selection
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=journal&tier=pro" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Journal submission
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=journal&tier=full" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  End-to-end publication pack
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=book&single=true" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Book publication
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=editing&tier=premium" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Citation & reference audit
                </Text>
              </Link>
              <Link href="/scholarcrafted/order" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link" style={{ color: `${active.accent} !important`, fontWeight: 600 }}>
                  Compare all plans →
                </Text>
              </Link>
            </Stack>
          </Stack>

          {/* Column 4: The Institution & Advisory */}
          <Stack gap="lg">
            <Text
              size="xs"
              c="white"
              style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
            >
              The Institution
            </Text>
            <Stack gap={rem(10)}>
              <Link href="/scholarcrafted/request-review?service=editing&tier=scientific" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Pre-submission peer review
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=resubmission" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Reviewer rebuttal crosscheck
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?service=book&single=true" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  University press monograph
                </Text>
              </Link>
              <Link href="/scholarcrafted/order?focus=dissertation" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Style manual compliance
                </Text>
              </Link>
              <Link href="/scholarcrafted/request-review" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Request a 24h project review
                </Text>
              </Link>
              <Link href="/scholarcrafted/how-it-works" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Our Scholarly Tradition
                </Text>
              </Link>
              <Link href="/scholarcrafted/resources" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Downloadable Blueprints
                </Text>
              </Link>
              <Link href="/scholarcrafted/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Text size="sm" className="footer-link">
                  Strategic Library (Blog)
                </Text>
              </Link>
            </Stack>
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
            <Link href="/scholarcrafted/privacy" style={{ textDecoration: 'none' }}>
              <Text
                size="xs"
                c="rgba(255,255,255,0.6)"
                style={{ cursor: 'pointer' }}
                className="footer-link"
              >
                Privacy & Ethics
              </Text>
            </Link>
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
            <Link href="/scholarcrafted/publication-ethics" style={{ textDecoration: 'none' }}>
              <Text
                size="xs"
                c="rgba(255,255,255,0.6)"
                style={{ cursor: 'pointer' }}
                className="footer-link"
              >
                Publication Ethics
              </Text>
            </Link>
            <Link href="/scholarcrafted/confidentiality" style={{ textDecoration: 'none' }}>
              <Text
                size="xs"
                c="rgba(255,255,255,0.6)"
                style={{ cursor: 'pointer' }}
                className="footer-link"
              >
                Strictly Confidential
              </Text>
            </Link>
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
