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
  IconFileText,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

// ─── Services ────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'track-a',
    eyebrow: 'TRACK A — JOURNAL PIPELINE',
    icon: <IconFileText size={22} />,
    title: 'Thesis-to-Journal Conversion',
    tagline: 'Transform dissertation chapters into publication-ready, peer-reviewed journal articles.',
    desc: 'Dissertation chapters are fundamentally different from journal articles in pacing, literature framing, and contribution claim. We extract, restructure, and developmentally edit your chapter into a standalone manuscript formatted precisely to your target Q1/Q2 journal specifications.',
    features: [
      'Core argument recentering & chapter extraction',
      'Target journal scope matching & author guidelines formatting',
      'Line-by-line developmental editing in Microsoft Word Track Changes',
      'Official Compliance Certification & reference verification audit',
    ],
    pricing: 'Milestone Advisory: $600 – $1,800 / article · 50/50 Terms',
    href: '/services/thesis-to-journal',
    cta: 'Explore Track A',
  },
  {
    id: 'track-b',
    eyebrow: 'TRACK B — BOOK PIPELINE',
    icon: <IconBook2 size={22} />,
    title: 'Monograph Architecture & Press Prep',
    tagline: 'From dissertation manuscript to acquisition-ready university press proposal & chapters.',
    desc: 'Transitioning a dissertation into an academic book requires de-dissertationizing the narrative voice, constructing a compelling prospectus, and aligning with acquisition guidelines of top university presses (Oxford, Cambridge, Routledge, Harvard, etc.).',
    features: [
      'Comprehensive book prospectus narrative & market positioning',
      'Competing works matrix & target press acquisitions alignment',
      'Sample chapter developmental overhaul & structural sequencing',
      'Author bio, table of contents alignment & acquisitions checklist',
    ],
    pricing: 'Milestone Advisory: $1,500 – $3,500+ / project · 50/50 Terms',
    href: '/services/monograph-architecture',
    cta: 'Explore Track B',
  },
  {
    id: 'track-custom',
    eyebrow: 'BESPOKE SCOPE — TAILORED ADVISORY',
    icon: <IconShieldCheck size={22} />,
    title: 'Custom Scoping & High-Stakes Advisory',
    tagline: 'Targeted faculty engagement for R&R response matrices, citation forensics, and urgent defense deadlines.',
    desc: 'When your manuscript faces a Revise & Resubmit ultimatum, complex multi-author formatting, or strict institutional defense cutoffs, we build a tailored milestone plan with guaranteed turnaround and direct faculty review.',
    features: [
      'Point-by-point Revise & Resubmit (R&R) response matrix preparation',
      'Comprehensive citation forensics, broken DOI repair & style manual conformity',
      'Multi-author volume synchronization & institutional defense formatting',
      'Itemized milestone scope issued within 24 hours · Optional 15-min discovery call',
    ],
    pricing: 'Custom Milestone Scope · Guaranteed in 24 Hours',
    href: '/order?track=custom',
    cta: 'Request Custom Scope',
  },
]

// ─── Situation matcher ────────────────────────────────────────────────────────

const situations = [
  {
    id: 'thesis-to-article',
    label: 'I want to convert my dissertation or thesis chapter into a journal article',
    subLabel: 'Chapter extraction, journal scope matching & manuscript restructuring',
    serviceId: 'track-a',
  },
  {
    id: 'committee-revision',
    label: 'My committee returned my draft with extensive structural revision demands',
    subLabel: 'Developmental reorganization and argument refinement under tracked changes',
    serviceId: 'track-a',
  },
  {
    id: 'book-proposal',
    label: "I'm writing a book proposal for Oxford, Routledge, or a university press",
    subLabel: 'Publisher selection, prospectus narrative & acquisition-ready proposal',
    serviceId: 'track-b',
  },
  {
    id: 'monograph-prep',
    label: 'I need to de-dissertationize my full manuscript for a book press',
    subLabel: 'Monograph pacing, chapter architecture & sample chapter preparation',
    serviceId: 'track-b',
  },
  {
    id: 'rnr',
    label: 'I received a Revise & Resubmit (R&R) and need a reviewer response matrix',
    subLabel: 'Point-by-point rebuttal strategy, diplomacy review & revised manuscript',
    serviceId: 'track-custom',
  },
  {
    id: 'defense',
    label: 'My defense or submission cutoff is within weeks and needs immediate polish',
    subLabel: 'High-stakes compliance, citation audit & formatting guarantee',
    serviceId: 'track-custom',
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
              Two outcome pathways. One faculty-led practice.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.75} style={{ maxWidth: '60ch' }}>
              Whether adapting doctoral research into peer-reviewed journal articles or preparing an acquisition-ready monograph for an academic press, our faculty provide defined milestones, transparent terms, and consultative execution.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* ── Three Pathway Cards ─────────────────────────────────────────── */}
      <Box component="section" py={SECTION_SPACING} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
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

                {/* Bespoke assessment nudge */}
                <Box
                  p={rem(24)}
                  bg={active.background}
                  style={{ border: `1px solid ${active.primary}12` }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap" gap="lg">
                    <Stack gap={rem(3)}>
                      <Text fw={600} size="sm">Have a unique manuscript or multi-part project?</Text>
                      <Text size="xs" c="dimmed">
                        Submit your research files. Our faculty review the scope and return a formal proposal within 24 hours.
                      </Text>
                    </Stack>
                    <Link href="/order" style={{ textDecoration: 'none', flexShrink: 0 }}>
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
                        Request Scope
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
