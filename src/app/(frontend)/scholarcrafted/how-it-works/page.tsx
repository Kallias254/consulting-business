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
    title: 'The First Conversation',
    desc: "A low-pressure, no-obligation deep dive into your research stage. We map out where you are and where you're stuck to see if we are the right partners for your journey.",
  },
  {
    step: '02',
    title: 'The Deep Dive',
    desc: 'We review your committee feedback and current manuscript together. We find the specific "knots" in your logic or methodology that are preventing progress.',
  },
  {
    step: '03',
    title: 'The Strategic Roadmap',
    desc: 'We define a customized path forward with clear milestones and a realistic timeline. You will never have to wonder "what do I do next?" ever again.',
  },
  {
    step: '04',
    title: 'The Refining Cycles',
    desc: 'Through structured feedback loops, we help you draft, refine, and polish your work until your argument is airtight and your authority is undeniable.',
  },
  {
    step: '05',
    title: 'Ready for Defense',
    desc: 'A final technical audit ensures every structural and stylistic requirement is met. You can now submit your work with the confidence that you are fully prepared.',
  },
]

export default function HowItWorksPage() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <Box component="section" pt={rem(100)} pb={rem(80)}>
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
        style={{ borderTop: `1px solid ${active.primary}11` }}
      >
        <Container size={1100}>
          <Stack gap={0}>
            {steps.map((item, i) => (
              <Box
                key={i}
                py={rem(32)}
                style={{ borderBottom: i === steps.length - 1 ? 'none' : `1px solid ${active.primary}11` }}
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

      <Footer bg={active.surface} />
    </Box>
  )
}
