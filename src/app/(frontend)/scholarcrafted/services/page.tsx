'use client'

import React, { useState } from 'react'
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
  UnstyledButton,
  Divider,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import {
  IconPencil,
  IconBook2,
  IconArrowRight,
  IconShieldCheck,
  IconFileCheck,
  IconChevronRight,
  IconCheck,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

// ─── Services ────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'editing',
    eyebrow: 'SERVICE 01 — PER WORD',
    icon: <IconPencil size={22} />,
    title: 'Editing & Compliance',
    tagline: 'Precision editing, language compliance, and style conformity — from grammar to argument structure.',
    desc: 'Line-by-line editing across three tiers. Every edit delivered in tracked changes. APA, Chicago, MLA, Harvard, Turabian, and institutional deposit compliance. Includes an Editorial Certificate accepted by ProQuest and most university repositories.',
    features: [
      'Advanced Editing — grammar, syntax & style conformity',
      'Premium Editing — substantive line editing, argument flow & 365-day re-editing',
      'Scientific Editing Pro — dual-pass peer reviewer assessment for Q1/Q2 journals',
      'Citation & reference cross-check (Premium and above)',
    ],
    pricing: 'From $0.032 / word',
    href: '/services/editing-proofreading',
    cta: 'View Tiers & Calculator',
  },
  {
    id: 'publication',
    eyebrow: 'SERVICE 02 — PACKAGES & STAGES',
    icon: <IconBook2 size={22} />,
    title: 'Publication Support',
    tagline: 'From submission to acceptance for journal articles. From proposal to press for book manuscripts.',
    desc: 'Two distinct pipelines under one service. Journal Articles: journal selection, cover letter, submission formatting, and response letters across three tiers (Essentials, Pro, Full). Book Manuscripts: publisher selection, book proposal, manuscript editing, galley proof review, and back-of-book indexing.',
    features: [
      'Journal selection — ranked target journals with scope & rejection rate analysis',
      'Cover letter written to the specific journal and paper contribution',
      'Response letters — point-by-point reply to every reviewer comment',
      'Book proposals, galley proof review & back-of-book indexing',
    ],
    pricing: 'Journal from $320 · Book from $280 / stage',
    href: '/services/publication-support',
    cta: 'View Journal & Book Options',
  },
  {
    id: 'ai-audit',
    eyebrow: 'SERVICE 03 — DIAGNOSTIC & RISK SCREENING',
    icon: <IconShieldCheck size={22} />,
    title: 'AI Manuscript Audit',
    tagline: 'Audit your AI-assisted research before journal submission — citation accuracy, literature gaps & peer-review risks.',
    desc: 'An independent pre-submission diagnostic scan evaluated against 200M+ academic papers. Identifies hallucinated or missing citations, section discontinuities, overstated claims, and journal match. Includes an executive Faculty Risk Memo and optional 15-minute debrief call with Dr. Micah Dobson. 100% of your audit fee is credited toward full editing if scoped.',
    features: [
      'Citation & reference gap analysis benchmarked against 200M+ research papers',
      'Structural consistency & argument alignment audit across all sections',
      'Journal scope matching & submission risk screening',
      '1-Page Executive Faculty Risk Memo + optional 15-min debrief call',
      '100% fee credited toward full editing or publication support',
    ],
    pricing: '$29 Single Review · $69 Revision Pack (3 Reviews)',
    href: '/order?service=ai-audit',
    cta: 'Order AI Manuscript Audit',
  },
]

// ─── Situation matcher ────────────────────────────────────────────────────────

const situations = [
  {
    id: 'ai-check',
    label: 'I used AI tools to draft or synthesize my paper and need to verify its integrity',
    subLabel: 'Citation verification, literature gap analysis & pre-submission risk audit',
    serviceId: 'ai-audit',
  },
  {
    id: 'defense',
    label: 'My defense is in weeks and the manuscript needs to be clean',
    subLabel: 'Time-sensitive polish before submission or deposit',
    serviceId: 'editing',
  },
  {
    id: 'committee',
    label: 'My committee sent the draft back with major revision comments',
    subLabel: 'Structural and developmental overhaul after committee review',
    serviceId: 'editing',
  },
  {
    id: 'journal-submit',
    label: 'I have an edited manuscript and want to submit it to a journal',
    subLabel: 'Journal selection, cover letter & submission formatting',
    serviceId: 'publication',
  },
  {
    id: 'rnr',
    label: 'I got a Revise & Resubmit — I need to respond to the reviewers',
    subLabel: 'Point-by-point response letter with diplomacy check',
    serviceId: 'publication',
  },
  {
    id: 'rejected',
    label: 'My paper was rejected and I need to reformat for another journal',
    subLabel: 'Resubmission formatting to new target journal',
    serviceId: 'publication',
  },
  {
    id: 'book-proposal',
    label: "I'm writing a book proposal for Oxford, Routledge, or a university press",
    subLabel: 'Publisher selection & acquisition-ready proposal',
    serviceId: 'publication',
  },
  {
    id: 'galley',
    label: 'My press sent galley proofs and needs an index built',
    subLabel: 'Galley proof review & back-of-book indexing',
    serviceId: 'publication',
  },
  {
    id: 'q1',
    label: "I'm targeting a high-impact Q1 journal and need a full review",
    subLabel: 'Scientific Editing Pro — peer reviewer developmental critique',
    serviceId: 'editing',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [selectedId, setSelectedId] = useState(situations[0].id)

  const selected = situations.find((s) => s.id === selectedId) ?? situations[0]
  const matchedService = services.find((s) => s.id === selected.serviceId) ?? services[0]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Box
        component="section"
        pt={{ base: rem(120), md: rem(150) }}
        pb={{ base: rem(60), md: rem(80) }}
        bg={active.background}
        style={{ borderBottom: `1px solid ${active.primary}10` }}
      >
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 760 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              ScholarCrafted Services
            </Text>
            <Title
              order={1}
              mt="sm"
              style={{
                fontSize: 'clamp(2.2rem, 4.8vw, 3.6rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: active.primary,
                fontFamily: 'var(--font-display), var(--font-serif)',
                fontWeight: 600,
              }}
            >
              Two services. Every stage of the publication pipeline.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.75} style={{ maxWidth: '60ch' }}>
              Editing & Compliance gets your manuscript to publication standard.
              Publication Support gets it accepted — at a journal or with a press.
              One team, defined deliverables, transparent pricing.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* ── Two Service Cards ─────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(2)}>
            {services.map((svc) => (
              <Box
                key={svc.id}
                p={{ base: rem(32), md: rem(44) }}
                bg={active.surface}
                style={{
                  border: `1px solid ${active.primary}12`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack gap="lg" flex={1}>
                  {/* Top row: icon + eyebrow */}
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Box
                      style={{
                        width: rem(48),
                        height: rem(48),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${active.accent}12`,
                        color: active.accent,
                        flexShrink: 0,
                      }}
                    >
                      {svc.icon}
                    </Box>
                    <Text
                      size="xs"
                      fw={700}
                      style={{
                        letterSpacing: '0.1em',
                        color: '#999',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        textAlign: 'right',
                        lineHeight: 1.5,
                      }}
                    >
                      {svc.eyebrow}
                    </Text>
                  </Group>

                  {/* Title + tagline */}
                  <Box>
                    <Title
                      order={2}
                      style={{
                        fontSize: 'clamp(1.6rem, 2.8vw, 2rem)',
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 600,
                        color: active.primary,
                        lineHeight: 1.15,
                        letterSpacing: '-0.015em',
                      }}
                    >
                      {svc.title}
                    </Title>
                    <Text size="md" c={active.accent} mt={rem(6)} fw={500} lh={1.5}>
                      {svc.tagline}
                    </Text>
                  </Box>

                  {/* Description */}
                  <Text size="sm" c="dimmed" lh={1.7}>
                    {svc.desc}
                  </Text>

                  {/* Features */}
                  <Stack gap={rem(8)}>
                    {svc.features.map((f, i) => (
                      <Group key={i} gap={rem(10)} align="flex-start" wrap="nowrap">
                        <IconCheck size={14} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                        <Text size="sm" c="dimmed" lh={1.6}>{f}</Text>
                      </Group>
                    ))}
                  </Stack>

                  {/* Pricing + CTA */}
                  <Box mt="auto" pt="lg">
                    <Text
                      size="xs"
                      fw={700}
                      mb={rem(12)}
                      style={{
                        color: '#999',
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      {svc.pricing}
                    </Text>
                    <Link href={svc.href} style={{ textDecoration: 'none' }}>
                      <Button
                        fullWidth
                        radius={0}
                        rightSection={<IconArrowRight size={16} />}
                        style={{
                          backgroundColor: active.accent,
                          color: '#fff',
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                          letterSpacing: '0.04em',
                          fontWeight: 600,
                        }}
                      >
                        {svc.cta}
                      </Button>
                    </Link>
                  </Box>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Divider color={`${active.primary}08`} />

      {/* ── Situation Matcher ─────────────────────────────────────────── */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.surface}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 640 }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                }}
              >
                Find Your Starting Point
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                }}
              >
                Select the situation that matches where you are.
              </Title>
            </Box>

            {/* Two-column selector */}
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: rem(2),
                alignItems: 'start',
              }}
              className="situation-grid"
            >
              {/* Left: situation list */}
              <Box
                style={{
                  border: `1px solid ${active.primary}12`,
                  backgroundColor: active.background,
                }}
              >
                {situations.map((sit, i) => {
                  const isSelected = sit.id === selectedId
                  return (
                    <UnstyledButton
                      key={sit.id}
                      onClick={() => setSelectedId(sit.id)}
                      style={{ width: '100%', display: 'block' }}
                    >
                      <Box
                        px={rem(24)}
                        py={rem(18)}
                        style={{
                          borderBottom:
                            i < situations.length - 1
                              ? `1px solid ${active.primary}08`
                              : undefined,
                          borderLeft: isSelected
                            ? `3px solid ${active.accent}`
                            : '3px solid transparent',
                          backgroundColor: isSelected ? active.surface : 'transparent',
                          transition: 'background-color 0.15s ease, border-color 0.15s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <Group justify="space-between" align="center" wrap="nowrap" gap="md">
                          <Stack gap={rem(3)}>
                            <Text
                              fw={isSelected ? 700 : 500}
                              size="sm"
                              lh={1.4}
                              style={{ color: isSelected ? active.primary : `${active.primary}bb` }}
                            >
                              {sit.label}
                            </Text>
                            <Text size="xs" c="dimmed" lh={1.4}>
                              {sit.subLabel}
                            </Text>
                          </Stack>
                          <IconChevronRight
                            size={15}
                            color={isSelected ? active.accent : `${active.primary}30`}
                            style={{ flexShrink: 0, transition: 'color 0.15s ease' }}
                          />
                        </Group>
                      </Box>
                    </UnstyledButton>
                  )
                })}
              </Box>

              {/* Right: matched service */}
              <Stack gap={rem(12)}>
                <Box
                  p={rem(32)}
                  bg={active.background}
                  style={{ border: `1px solid ${active.accent}` }}
                >
                  <Box
                    px={rem(10)}
                    py={rem(4)}
                    mb="md"
                    style={{
                      backgroundColor: active.accent,
                      display: 'inline-flex',
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Text size="xs" fw={700} c="#fff" style={{ letterSpacing: '0.1em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}>
                      RECOMMENDED FOR THIS
                    </Text>
                  </Box>

                  <Group gap={rem(12)} mb={rem(12)} align="center">
                    <Box
                      style={{
                        width: rem(40),
                        height: rem(40),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${active.accent}12`,
                        color: active.accent,
                        flexShrink: 0,
                      }}
                    >
                      {matchedService.icon}
                    </Box>
                    <Title
                      order={3}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: rem(22),
                        fontWeight: 600,
                        color: active.primary,
                        lineHeight: 1.2,
                      }}
                    >
                      {matchedService.title}
                    </Title>
                  </Group>

                  <Text size="sm" c="dimmed" lh={1.7} mb={rem(20)}>
                    {matchedService.tagline}
                  </Text>

                  <Link href={matchedService.href} style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      radius={0}
                      rightSection={<IconArrowRight size={16} />}
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {matchedService.cta}
                    </Button>
                  </Link>
                </Box>

                {/* Free assessment nudge */}
                <Box
                  p={rem(24)}
                  bg={active.background}
                  style={{ border: `1px solid ${active.primary}12` }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap" gap="lg">
                    <Stack gap={rem(3)}>
                      <Text fw={600} size="sm">Not sure which tier fits?</Text>
                      <Text size="xs" c="dimmed">
                        Submit your manuscript. We assess scope and respond within 24 hours.
                      </Text>
                    </Stack>
                    <Link href="/request-review" style={{ textDecoration: 'none', flexShrink: 0 }}>
                      <Button
                        variant="outline"
                        radius={0}
                        size="sm"
                        style={{
                          borderColor: `${active.primary}30`,
                          color: active.primary,
                          fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        }}
                        rightSection={<IconArrowRight size={16} />}
                      >
                        Free Assessment
                      </Button>
                    </Link>
                  </Group>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Divider color={`${active.primary}08`} />

      {/* ── Trust Bar ────────────────────────────────────────────────── */}
      <Box py={rem(60)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Group align="flex-start" gap="md">
              <IconShieldCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Zero Ghostwriting Guarantee</Text>
                <Text size="xs" c="dimmed">
                  We refine, format, and structure your own manuscript. Your intellectual content is always yours.
                </Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconFileCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Track-Changes Delivery</Text>
                <Text size="xs" c="dimmed">
                  Every edit delivered in tracked-changes mode. You approve or reject each change. Nothing is silent.
                </Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconBook2 size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">Certified Academic Faculty</Text>
                <Text size="xs" c="dimmed">
                  Led by a College Board AP Research Reader. We understand what your press and committee expect.
                </Text>
              </Stack>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer bg={active.surface} />

      <style>{`
        @media (max-width: 768px) {
          .situation-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Box>
  )
}
