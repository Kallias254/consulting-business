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
  Divider,
  rem,
  Group,
  useMantineTheme,
  ThemeIcon,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { IconArrowRight, IconUsers, IconEdit, IconFileText, IconGoGame } from '@tabler/icons-react'
import Link from 'next/link'

const SECTION_SPACING = rem(140)
const INNER_WIDTH = 1100

const offlineServices = [
  {
    title: 'Structural Editing',
    label: 'MANUSCRIPT REFINEMENT',
    desc: 'A macro-level review of your manuscript for argument, structure, and narrative cohesion.',
    link: '/scholarcrafted/consultation',
    cta: 'Request an Edit',
  },
  {
    title: 'Methodology Review',
    label: 'RESEARCH DESIGN',
    desc: 'A deep-dive assessment of your research design, sampling, and data analysis strategy.',
    link: '/scholarcrafted/consultation',
    cta: 'Request a Review',
  },
  {
    title: 'Data & Coding Support',
    label: 'TECHNICAL ASSISTANCE',
    desc: 'Expert support for qualitative coding (NVivo, ATLAS.ti) or statistical analysis (SPSS, R).',
    link: '/scholarcrafted/consultation',
    cta: 'Request Support',
  },
]

export default function ServicesPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* Hero Section */}
      <Box component="section" pt={rem(100)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 800 }}>
            <Text
              size="xs"
              fw={700}
              style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
              c="dimmed"
            >
              Our Services
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
              Rigorous support for <br />
              the academic journey.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
              ScholarCrafted provides a range of specialized advisory services designed to help
              researchers navigate the most challenging phases of the dissertation process.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Tier 1: Faculty-Led Coaching */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
            <Stack gap="xl" justify="center">
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                  c={active.accent}
                >
                  Tier 1: Direct Faculty Oversight
                </Text>
                <Title
                  order={2}
                  mt="md"
                  style={{
                    fontSize: rem(48),
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: active.primary,
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  Faculty-Led Coaching
                </Title>
              </Box>
              <Text size="lg" lh={1.7} c="dimmed">
                Our premier service. A deep, one-on-one strategic partnership with a senior faculty
                member to guide you from conceptualization to final defense. This is our most
                intensive and transformative offering.
              </Text>
              <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="filled"
                  bg={active.primary}
                  radius={0}
                  style={{ maxWidth: 300 }}
                >
                  BOOK A STRATEGIC REVIEW
                </Button>
              </Link>
            </Stack>
            <Box
              p={rem(60)}
              bg={active.background}
              style={{ border: `1px solid ${active.primary}22` }}
            >
              <Stack gap="xl">
                <Title
                  order={3}
                  style={{
                    fontWeight: 400,
                    fontSize: rem(28),
                    fontFamily: 'var(--font-serif)',
                    color: active.primary,
                  }}
                >
                  Core Deliverables
                </Title>
                <Stack gap="lg">
                  {[
                    'Strategic Project Roadmap',
                    'Weekly Progress & Feedback Loops',
                    'Conceptual & Narrative Alignment',
                    'Defense & Submission Strategy',
                  ].map((item, i) => (
                    <Group key={i} align="flex-start" gap="md" wrap="nowrap">
                      <Box
                        w={6}
                        h={6}
                        mt={8}
                        bg={active.accent}
                        style={{ borderRadius: '50%', flexShrink: 0 }}
                      />
                      <Text size="md" fw={500} c="dimmed">
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Tier 2: Manuscript & Data Services */}
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
                Tier 2: Asynchronous Support
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
                Manuscript & Data Services
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                For the scholar who needs expert intervention on a specific part of their work
                without the need for live calls.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
              {offlineServices.map((service, i) => (
                <Box
                  key={i}
                  p={rem(40)}
                  bg={active.background}
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
                        {service.label}
                      </Text>
                      <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                        {service.title}
                      </Title>
                    </Stack>
                    <Text size="sm" c="dimmed" lh={1.6}>
                      {service.desc}
                    </Text>
                    <Box mt="auto" pt="xl">
                      <Link href={service.link} style={{ textDecoration: 'none' }}>
                        <Button
                          variant="outline"
                          color={active.primary}
                          fullWidth
                          radius={0}
                          style={{ borderColor: active.primary }}
                        >
                          {service.cta}
                        </Button>
                      </Link>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Tier 3: Self-Guided Resources */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Box>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c={active.accent}
              >
                Tier 3: Self-Guided
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
                The ScholarCrafted Archives
              </Title>
              <Text size="lg" c="dimmed" mt="md" style={{ maxWidth: 600, margin: 'auto' }}>
                A curated collection of resources for the independent scholar, from methodology
                guides to our signature Research Blueprints.
              </Text>
            </Box>
            <Button
              size="lg"
              variant="outline"
              color={active.primary}
              radius={0}
              style={{ borderColor: active.primary }}
            >
              ACCESS THE ARCHIVES
            </Button>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
