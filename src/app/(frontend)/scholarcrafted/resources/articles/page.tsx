'use client'

import React from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  SimpleGrid,
  Stack,
  Button,
  rem,
  useMantineTheme,
  Group,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import Link from 'next/link'
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react'

const INNER_WIDTH = 1100

const articles = [
  {
    title: 'What to do when your Dissertation Chair ghosts you.',
    slug: 'dissertation-chair-ghosting',
    category: 'COMMITTEE POLITICS',
    readTime: '6 min read',
    date: 'April 2026',
    excerpt:
      'Your Chair has gone dark. A week passes. Then two. Here is how to navigate a silent supervisor without derailing your timeline.',
  },
  {
    title: 'Why your qualitative thematic analysis was rejected (and how to fix it).',
    slug: 'qualitative-thematic-analysis-rejected',
    category: 'METHODOLOGY',
    readTime: '8 min read',
    date: 'March 2026',
    excerpt:
      'After months of interviews and coding, the rejection lands. It is almost certainly one of four fixable methodological failures.',
  },
  {
    title: "The 'ABD' Trap: How to restart your research after a 6-month break.",
    slug: 'abd-trap-restart-research',
    category: 'STRATEGY',
    readTime: '5 min read',
    date: 'February 2026',
    excerpt:
      'All But Dissertation. Returning feels impossible not because the work is harder, but because the psychological distance has made it feel like a monument.',
  },
  {
    title: 'How to properly align your Research Questions with your Paradigm.',
    slug: 'research-questions-paradigm-alignment',
    category: 'METHODOLOGY',
    readTime: '10 min read',
    date: 'January 2026',
    excerpt:
      'A researcher claims a constructivist position, then writes RQs that seek causal variables. The committee notices. The proposal stalls.',
  },
]

export default function ArticlesArchivePage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Group justify="space-between" align="flex-start">
            <Stack gap="sm" style={{ maxWidth: 600 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Library
              </Text>
              <Title
                order={1}
                style={{
                  fontSize: rem(56),
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                Strategic Insights
              </Title>
              <Text size="lg" c="dimmed" lh={1.6} style={{ fontSize: rem(18) }}>
                Deep dives into methodology, academic writing, committee politics, and the
                strategies that actually move stalled research forward.
              </Text>
            </Stack>

            <Link
              href="/scholarcrafted/resources"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: `${rem(8)} ${rem(16)}`,
                border: `1px solid ${active.primary}22`,
                borderRadius: rem(100),
                transition: 'all 0.2s ease',
              }}
              className="back-btn"
            >
              <IconArrowLeft size={14} color={active.primary} style={{ opacity: 0.7 }} />
              <Text size="xs" fw={600} c={active.primary} style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Back to Resources
              </Text>
            </Link>
          </Group>
        </Container>
      </Box>

      {/* Articles Grid */}
      <Box
        component="section"
        py={rem(80)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(2)}>
            {articles.map((item, i) => (
              <Link
                key={i}
                href={`/scholarcrafted/resources/articles/${item.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box
                  p={rem(40)}
                  bg={i % 2 === 0 ? active.surface : active.background}
                  style={{
                    borderLeft: `3px solid transparent`,
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                    cursor: 'pointer',
                  }}
                  className="archive-row"
                >
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Stack gap="sm" style={{ flex: 1, maxWidth: 760 }}>
                      <Group gap="xl">
                        <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                          {item.category}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {item.readTime}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {item.date}
                        </Text>
                      </Group>
                      <Title
                        order={3}
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontWeight: 400,
                          fontSize: rem(24),
                          lineHeight: 1.3,
                          color: active.primary,
                        }}
                      >
                        {item.title}
                      </Title>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        {item.excerpt}
                      </Text>
                    </Stack>
                    <Group gap="xs" style={{ flexShrink: 0, paddingTop: rem(4) }}>
                      <Text
                        fw={600}
                        size="sm"
                        c={active.action}
                        style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        Read
                      </Text>
                      <IconArrowRight size={16} color={active.action} />
                    </Group>
                  </Group>
                </Box>
              </Link>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box
        py={rem(80)}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}22`, textAlign: 'center' }}
      >
        <Container size={760}>
          <Stack gap="xl" align="center">
            <Title order={2} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: rem(36), color: active.primary }}>
              Still stuck after reading?
            </Title>
            <Text size="lg" c="dimmed" lh={1.7}>
              Articles give you the framework. A coaching call gives you the answer for your specific situation.
            </Text>
            <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
              <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                FREE INTRODUCTORY CALL
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>

      <Footer />

      <style jsx global>{`
        .archive-row:hover {
          border-left-color: ${active.action} !important;
        }
      `}</style>
    </Box>
  )
}
