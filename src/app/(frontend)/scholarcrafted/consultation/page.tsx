'use client'

import React, { Suspense } from 'react'
import {
  Container,
  Title,
  Text,
  Box,
  rem,
  Stack,
  Group,
  Badge,
  Divider,
  ThemeIcon,
  Button,
  useMantineTheme,
} from '@mantine/core'
import {
  IconCheck,
  IconAward,
  IconCalendarEvent,
  IconClock,
  IconArrowRight,
} from '@tabler/icons-react'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import { INNER_WIDTH } from '@/layout'

// ─── SWAP THIS WHEN MICAH SENDS HIS CALENDLY LINK ───────────────────────────
const CALENDLY_URL = 'https://calendly.com/misedajoseph-30-minutes-call/discovery-session'
// ─────────────────────────────────────────────────────────────────────────────

// Colour params matched to midnight palette (no # prefix)
const CALENDLY_THEMED_URL = `${CALENDLY_URL}?background_color=F1F3F5&text_color=002147&primary_color=708090&hide_gdpr_banner=1`

function ConsultationPageContent() {
  const theme = useMantineTheme()
  const active = theme.other

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <Box component="section" pt={rem(120)} pb={rem(100)} bg={active.background}>
        <Container size={INNER_WIDTH}>

          {/* Page Header */}
          <Stack gap="xs" mb={rem(60)} style={{ maxWidth: 680 }}>
            <Badge variant="outline" color="dark" radius={0} size="sm" style={{ alignSelf: 'flex-start' }}>
              DIRECT FACULTY ADVISORY
            </Badge>
            <Title
              order={1}
              style={{
                fontSize: rem(44),
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Schedule a Consultation with Dr. Micah Dobson
            </Title>
            <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: '58ch' }}>
              A focused 20-minute session. Dr. Dobson reviews your project details beforehand and comes prepared — this is a working conversation, not a discovery call.
            </Text>
          </Stack>

          {/* Two-column layout */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: rem(48),
              alignItems: 'flex-start',
            }}
          >
            {/* LEFT: Credentials & what to expect */}
            <Box style={{ gridColumn: 'span 5' }}>
              <Stack gap="xl">

                {/* Dr. Dobson credentials */}
                <Box p={rem(28)} bg={active.surface} style={{ border: `1px solid ${active.primary}15` }}>
                  <Stack gap="md">
                    <Group gap="sm" align="center">
                      <ThemeIcon size={32} radius="xl" variant="light" color={active.accent}>
                        <IconAward size={18} />
                      </ThemeIcon>
                      <Text fw={700} size="sm" c={active.primary}>
                        College Board AP Research Reader
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed" lh={1.6}>
                      Certified evaluator of high-stakes academic research design and methodology. Your manuscript is reviewed with senior faculty standards — never an automated summary.
                    </Text>

                    <Divider color={`${active.primary}10`} />

                    <Stack gap="xs">
                      <Group gap="xs" align="center">
                        <IconCheck size={14} color={active.accent} />
                        <Text size="xs" c="dimmed">Strict Non-Disclosure & Confidentiality</Text>
                      </Group>
                      <Group gap="xs" align="center">
                        <IconCheck size={14} color={active.accent} />
                        <Text size="xs" c="dimmed">Zero Ghostwriting — Absolute Academic Ethics</Text>
                      </Group>
                      <Group gap="xs" align="center">
                        <IconCheck size={14} color={active.accent} />
                        <Text size="xs" c="dimmed">Direct Peer-to-Peer Consultation via Zoom</Text>
                      </Group>
                    </Stack>
                  </Stack>
                </Box>

                {/* What to expect */}
                <Box p={rem(28)} bg={active.surface} style={{ border: `1px solid ${active.primary}15` }}>
                  <Stack gap="lg">
                    <Text
                      fw={700}
                      size="xs"
                      c={active.primary}
                      style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      What to Expect
                    </Text>

                    <Stack gap="md">
                      <Group gap="sm" align="flex-start" wrap="nowrap">
                        <Box mt={3}>
                          <IconCalendarEvent size={16} color={active.accent} />
                        </Box>
                        <Stack gap={2}>
                          <Text size="sm" fw={600} c={active.primary}>20-Minute Working Session</Text>
                          <Text size="xs" c="dimmed" lh={1.5}>
                            Not a sales call. Come with your bottleneck clearly in mind — Dr. Dobson will give you a direct faculty perspective and a clear path forward.
                          </Text>
                        </Stack>
                      </Group>

                      <Group gap="sm" align="flex-start" wrap="nowrap">
                        <Box mt={3}>
                          <IconClock size={16} color={active.accent} />
                        </Box>
                        <Stack gap={2}>
                          <Text size="sm" fw={600} c={active.primary}>Zoom Link Generated on Booking</Text>
                          <Text size="xs" c="dimmed" lh={1.5}>
                            A private meeting room is created automatically and sent to your email the moment you confirm.
                          </Text>
                        </Stack>
                      </Group>
                    </Stack>
                  </Stack>
                </Box>

              </Stack>
            </Box>

            {/* RIGHT: CTA panel */}
            <Box style={{ gridColumn: 'span 7' }}>
              <Box
                p={{ base: rem(40), md: rem(60) }}
                bg={active.surface}
                style={{
                  border: `1px solid ${active.primary}15`,
                  textAlign: 'center',
                }}
              >
                <Stack align="center" gap="xl">
                  <Stack gap="sm" align="center">
                    <Title
                      order={2}
                      style={{
                        fontSize: rem(28),
                        fontFamily: 'var(--font-serif)',
                        color: active.primary,
                        lineHeight: 1.2,
                      }}
                    >
                      Bring your project wherever it is.
                    </Title>
                    <Text size="md" c="dimmed" lh={1.7} style={{ maxWidth: '48ch' }}>
                      A stalled chapter, a committee concern, a thesis you&apos;re converting to a journal article. There&apos;s no obligation afterward — if it&apos;s not the right fit, you&apos;ll still leave with a clear next step.
                    </Text>
                  </Stack>

                  <a
                    href={CALENDLY_THEMED_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button
                      size="xl"
                      radius={0}
                      bg={active.primary}
                      className="impeccable-button"
                      rightSection={<IconArrowRight size={20} />}
                      style={{ minWidth: rem(280) }}
                    >
                      SCHEDULE YOUR SESSION
                    </Button>
                  </a>

                  <Text size="xs" c="dimmed" style={{ letterSpacing: '0.04em' }}>
                    20 minutes · Zoom · No obligation
                  </Text>
                </Stack>
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default function ConsultationPage() {
  return (
    <Suspense fallback={
      <Box p="xl" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text c="dimmed">Loading scheduling portal...</Text>
      </Box>
    }>
      <ConsultationPageContent />
    </Suspense>
  )
}
