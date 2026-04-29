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
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'

const SECTION_SPACING = rem(120)

const steps = [
  {
    step: '01',
    title: 'Initial Consultation',
    desc: 'We begin with a strategic review of your project stage, committee requirements, and current manuscript. This helps us determine if our expertise aligns with your specific needs.',
  },
  {
    step: '02',
    title: 'Diagnostic Review',
    desc: 'Our faculty lead performs a deep-dive diagnostic of your work to identify structural gaps, logical inconsistencies, and potential roadblocks to submission.',
  },
  {
    step: '03',
    title: 'Strategic Roadmap',
    desc: 'We develop a customized pacing strategy and intervention plan. This includes specific milestones, feedback loops, and a clear timeline to completion.',
  },
  {
    step: '04',
    title: 'Iterative Implementation',
    desc: 'Work begins through a series of structured cycles. Each cycle involves drafting, review, and refinement, guided by our PhD-level advisory team.',
  },
  {
    step: '05',
    title: 'Final Submission Ready',
    desc: 'The project concludes with a final technical review, ensuring all structural, stylistic, and formatting requirements are met for a successful defense.',
  },
]

export default function HowItWorksPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <Box component="section" pt={rem(100)} pb={SECTION_SPACING}>
        <Container size={1100}>
          <Stack gap="xl">
            <Box style={{ maxWidth: 800 }}>
              <Text
                size="xs"
                fw={700}
                style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}
                c="dimmed"
              >
                The Client Journey
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
                A guided path from <br />
                stalled draft to submission.
              </Title>
              <Text size="lg" mt="xl" c="dimmed" lh={1.6} style={{ fontSize: rem(20) }}>
                Our process is designed to reduce the inherent uncertainty of independent research
                by providing clear structure, regular milestones, and expert oversight.
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: '1px solid #eee' }}
      >
        <Container size={1100}>
          <Stack gap={rem(40)}>
            {steps.map((item, i) => (
              <Box
                key={i}
                py={rem(60)}
                style={{ borderBottom: i === steps.length - 1 ? 'none' : '1px solid #eee' }}
              >
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                  <Text
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: rem(48),
                      opacity: 0.2,
                      lineHeight: 1,
                      color: active.primary,
                    }}
                  >
                    {item.step}
                  </Text>
                  <Box style={{ gridColumn: 'span 2' }}>
                    <Stack gap="md">
                      <Title
                        order={2}
                        style={{
                          fontSize: rem(32),
                          fontWeight: 400,
                          fontFamily: 'var(--font-serif)',
                          color: active.primary,
                        }}
                      >
                        {item.title}
                      </Title>
                      <Text size="lg" lh={1.7} c="dimmed" style={{ maxWidth: 600 }}>
                        {item.desc}
                      </Text>
                    </Stack>
                  </Box>
                </SimpleGrid>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box component="section" py={SECTION_SPACING}>
        <Container size={760}>
          <Stack gap="xl" align="center" style={{ textAlign: 'center' }}>
            <Title order={2} style={{ fontSize: rem(42), fontWeight: 400, color: active.primary }}>
              What happens next?
            </Title>
            <Text size="lg" c="dimmed" lh={1.6}>
              After you book a consultation, you will receive a brief intake questionnaire. During
              the call, we will discuss your project in detail and provide a preliminary assessment
              of how we can help.
            </Text>
            <Group gap="md">
              <Link href="/scholarcrafted/consultation?interest=other&metBefore=no" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  FREE INTRODUCTORY CALL
                </Button>
              </Link>
              <Link href="/scholarcrafted/about" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  color={active.primary}
                  radius={0}
                  style={{ borderColor: active.primary, color: active.primary }}
                >
                  LEARN ABOUT THE TEAM
                </Button>
              </Link>
            </Group>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
