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
  ThemeIcon,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import { IconDownload, IconArrowRight, IconFileText } from '@tabler/icons-react'

const SECTION_SPACING = rem(140)
const INNER_WIDTH = 1100

const blueprints = [
  {
    title: 'The Chapter 1 Proposal Framework',
    desc: 'A comprehensive, fill-in-the-blank structure for writing a proposal that aligns your problem statement, purpose, and research questions flawlessly.',
    category: 'TEMPLATE',
  },
  {
    title: 'The Literature Review Synthesis Matrix',
    desc: 'Stop summarizing and start synthesizing. This Excel matrix helps you organize hundreds of sources by theme, methodology, and theoretical gap.',
    category: 'TOOL',
  },
  {
    title: 'The Qualitative Codebook Template',
    desc: 'A foundational structure for establishing a priori codes and documenting emergent themes during your qualitative data analysis phase.',
    category: 'BLUEPRINT',
  },
]

const articles = [
  {
    title: 'What to do when your Dissertation Chair ghosts you.',
    category: 'COMMITTEE POLITICS',
    readTime: '6 min read',
  },
  {
    title: 'Why your qualitative thematic analysis was rejected (and how to fix it).',
    category: 'METHODOLOGY',
    readTime: '8 min read',
  },
  {
    title: "The 'ABD' Trap: How to restart your research after a 6-month break.",
    category: 'STRATEGY',
    readTime: '5 min read',
  },
  {
    title: 'How to properly align your Research Questions with your Paradigm.',
    category: 'METHODOLOGY',
    readTime: '10 min read',
  },
]

export default function ResourcesPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
      <Box bg={active.surface} style={{ minHeight: '100vh', color: active.primary }}>
        <Navbar />

        {/* Hero Section */}
        <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.surface}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 800 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Resources & Insights
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(56),
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: active.primary,
              }}
            >
              Strategic insights and <br />
              structured frameworks.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              Actionable blueprints, tools, and expert advice designed specifically to help
              independent researchers overcome their toughest academic roadblocks.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Blueprints Section */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <Box style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                Lead Magnets
              </Text>
              <Title
                order={2}
                mt="md"
                style={{
                  fontSize: rem(48),
                  fontWeight: 400,
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                Downloadable Blueprints
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Proprietary templates and matrices we use internally to structure our clients'
                research. Available for instant download.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {blueprints.map((item, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.surface}
                  style={{
                    border: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Stack gap="xl" flex={1}>
                    <Stack gap="xs">
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                        {item.category}
                      </Text>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                        {item.title}
                      </Title>
                    </Stack>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {item.desc}
                    </Text>
                    <Box mt="auto" pt="xl">
                      <Button
                        variant="outline"
                        color={active.primary}
                        fullWidth
                        radius={0}
                        leftSection={<IconDownload size={16} />}
                        style={{ borderColor: active.primary }}
                      >
                        Download Free
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Strategic Articles */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <Box style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                The Library
              </Text>
              <Title
                order={2}
                mt="md"
                style={{
                  fontSize: rem(48),
                  fontWeight: 400,
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                Strategic Insights
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Deep dives into methodology, academic writing, and navigating committee politics.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {articles.map((item, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.background}
                  style={{
                    border: `1px solid ${active.primary}22`,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  className="article-card"
                >
                  <Stack gap="xl" flex={1}>
                    <Group justify="space-between">
                      <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                        {item.category}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {item.readTime}
                      </Text>
                    </Group>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, lineHeight: 1.3 }}>
                      {item.title}
                    </Title>
                    <Box mt="auto" pt="md">
                      <Group gap="xs" style={{ cursor: 'pointer' }}>
                        <Text
                          fw={600}
                          size="sm"
                          c={active.action}
                          style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        >
                          Read Article
                        </Text>
                        <IconArrowRight size={16} color={active.action} />
                      </Group>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box py={SECTION_SPACING} bg={active.background} style={{ borderTop: `1px solid ${active.primary}22` }}>
        <Container size={760}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title order={2} style={{ fontSize: rem(42), fontWeight: 400, color: active.primary }}>
              Still stuck? We can help.
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              Reading articles will only get you so far. If you need a structural intervention or strategic 
              direction for your specific research, book a quick call with our faculty.
            </Text>
            <Group gap="md">
              <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  FREE INTRODUCTORY CALL
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Footer />
      
      <style jsx global>{`
        .article-card {
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .article-card:hover {
          transform: translateY(-4px);
          border-color: ${active.action} !important;
        }
      `}</style>
    </Box>
  )
}
