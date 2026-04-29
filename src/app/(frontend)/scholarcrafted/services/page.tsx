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
  Group,
  useMantineTheme,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'

const SECTION_SPACING = rem(140)
const INNER_WIDTH = 1100

const offlineServices = [
  {
    title: 'Structural Editing & Proofreading',
    label: 'MANUSCRIPT REFINEMENT',
    desc: 'From macro-level argument flow to micro-level prose precision, we ensure your research is presented with the clarity, tone, and authority expected by your committee.',
    link: '/scholarcrafted/services/editing-proofreading',
    cta: 'View Editing Services',
  },
  {
    title: 'Custom Research & Data Support',
    label: 'TECHNICAL ASSISTANCE',
    desc: 'Prearranged offline support tailored to your exact needs, including literature mapping, survey construction, qualitative coding, and statistical analysis.',
    link: '/scholarcrafted/services/research-support',
    cta: 'Get Research Support',
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
              ScholarCrafted provides specialized advisory services designed to help
              researchers navigate the most challenging phases of the dissertation process.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* 1-on-1 Guidance */}
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
                1-on-1 Guidance
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
                Need strategic direction?
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                Are you stalled, overwhelmed, or struggling with committee feedback? 
                Our live academic coaching provides the strategic roadmap and expert sounding board you need to move forward.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              <Box
                p={rem(40)}
                bg={active.background}
                style={{
                  border: `1px solid ${active.primary}22`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Stack gap="xl" flex={1}>
                  <Stack gap="xs">
                    <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.1em' }}>
                      LIVE ACADEMIC COACHING
                    </Text>
                    <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                      Private Coaching Packages
                    </Title>
                  </Stack>
                  <Text size="sm" c="dimmed" lh={1.6}>
                    A strategic partnership to help you overcome roadblocks, manage your project, and finish with confidence. 
                    Choose from 5, 10, or 20-hour retainers tailored to your specific academic milestones.
                  </Text>
                  <Box mt="auto" pt="xl">
                    <Link href="/scholarcrafted/services/private-coaching" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="filled"
                        bg={active.primary}
                        fullWidth
                        radius={0}
                      >
                        View Coaching Packages
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Box>
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* Asynchronous Services */}
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
                Asynchronous Support
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
                Ready for expert intervention?
              </Title>
              <Text size="lg" c="dimmed" mt="md">
                For the scholar who needs expert intervention on a specific part of their work
                without the need for live coaching calls.
              </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
              {offlineServices.map((service, i) => (
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



      <Footer />
    </Box>
  )
}
