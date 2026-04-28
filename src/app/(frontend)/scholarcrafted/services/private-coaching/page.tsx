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
  Center,
} from '@mantine/core'
import { Navbar } from '../../_components/Navbar'
import { Footer } from '../../_components/Footer'
import { IconCheck } from '@tabler/icons-react'
import Link from 'next/link'

const SECTION_SPACING = rem(140)
const INNER_WIDTH = 1100

const powerSessions = [
  {
    title: '30-Minute Power Session',
    price: '$70 USD',
    desc: 'Get quick, targeted advice for a specific question or challenge in a 30-minute power session.',
    link: '#', // Placeholder for Cal.com link
  },
  {
    title: '60-Minute Deep Dive',
    price: '$140 USD',
    desc: 'A comprehensive coaching experience, addressing any aspect of your project in a 60-minute deep dive.',
    link: '#', // Placeholder for Cal.com link
  },
]

export default function PrivateCoachingPage() {
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
              Faculty-Led Coaching
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
              A strategic partnership for your academic success.
            </Title>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}22` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(80)}>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(80)}>
              <Stack gap="xl">
                <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                  Our Premier Service
                </Title>
                <Text size="lg" lh={1.7} c="dimmed">
                  Our one-on-one coaching is a deep, strategic partnership designed to guide you
                  from conceptualization to final defense. This is our most intensive and
                  transformative offering, providing the structure and oversight of a senior faculty
                  member.
                </Text>
              </Stack>
              <Stack gap="xl">
                <Title order={3} style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                  Core Deliverables
                </Title>
                <Stack gap="lg">
                  {[
                    'Strategic Project Roadmap',
                    'Weekly Progress & Feedback Loops',
                    'Conceptual & Narrative Alignment',
                    'Defense & Submission Strategy',
                  ].map((item, i) => (
                    <Group key={i} align="center" gap="md" wrap="nowrap">
                      <IconCheck size={18} color={active.accent} />
                      <Text size="md" fw={500} c="dimmed">
                        {item}
                      </Text>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </SimpleGrid>

            <Center>
              <Link href="/scholarcrafted/consultation" style={{ textDecoration: 'none' }}>
                <Button size="lg" variant="filled" bg={active.primary} radius={0}>
                  BOOK A STRATEGIC REVIEW
                </Button>
              </Link>
            </Center>

            {/* Power Sessions */}
            <Box
              mt={rem(60)}
              style={{ borderTop: `1px solid ${active.primary}22`, paddingTop: rem(80) }}
            >
              <Title
                order={4}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  marginBottom: rem(24),
                  textAlign: 'center',
                }}
              >
                Targeted Power Sessions
              </Title>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                {powerSessions.map((session, i) => (
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
                        <Text
                          size="xs"
                          fw={700}
                          c={active.accent}
                          style={{ letterSpacing: '0.1em' }}
                        >
                          {session.title}
                        </Text>
                        <Title
                          order={3}
                          style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
                        >
                          {session.price}
                        </Title>
                      </Stack>
                      <Text size="sm" c="dimmed" lh={1.6}>
                        {session.desc}
                      </Text>
                      <Box mt="auto" pt="xl">
                        <Button
                          component="a"
                          href={session.link}
                          variant="outline"
                          color={active.primary}
                          fullWidth
                          radius={0}
                          style={{ borderColor: active.primary }}
                        >
                          BOOK NOW
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
