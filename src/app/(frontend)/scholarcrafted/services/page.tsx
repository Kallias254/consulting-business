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
  Badge,
  Group,
  useMantineTheme,
  UnstyledButton,
} from '@mantine/core'
import { Navbar } from '../_components/Navbar'
import { Footer } from '../_components/Footer'
import Link from 'next/link'
import {
  IconFileCheck,
  IconBook2,
  IconListCheck,
  IconFileText,
  IconArrowRight,
  IconShieldCheck,
  IconChevronRight,
} from '@tabler/icons-react'
import { SECTION_SPACING, INNER_WIDTH } from '@/layout'

// ─── Service Definitions ────────────────────────────────────────────────────

const services = {
  editing: {
    id: 'editing',
    label: 'PILLAR 1 — PER WORD',
    badge: '$0.032–$0.065 / word',
    icon: IconFileCheck,
    title: 'Manuscript Editing & Compliance',
    desc: 'Line-by-line editing across three tiers — from final proofreading to full structural and developmental polish. Every edit in tracked changes. APA, Chicago, MLA, Harvard, Turabian, and institutional deposit compliance.',
    features: [
      'Tier 1: Grammar, mechanics & style compliance',
      'Tier 2: Substantive line editing, flow & scholarly tone',
      'Tier 3: Structural sequencing & argument pacing',
      'ProQuest & institutional deposit readiness',
    ],
    link: '/scholarcrafted/services/editing-proofreading',
    cta: 'View Tiers & Rate Calculator',
  },
  citations: {
    id: 'citations',
    label: 'PILLAR 2 — HOURLY / PER CHAPTER',
    badge: '$90 / hour',
    icon: IconListCheck,
    title: 'Citation & Reference Audits',
    desc: 'Every inline citation matched against its reference entry. DOI verification, dead link repair, Zotero and EndNote export reconstruction, and full style conversion when journals require a switch.',
    features: [
      'Inline citation-to-reference cross-check',
      'DOI verification & dead link repair',
      'Zotero / EndNote export cleanup',
      'Reference list rebuilt to required style',
    ],
    link: '/scholarcrafted/services/citation-audits',
    cta: 'Enquire About an Audit',
  },
  preparation: {
    id: 'preparation',
    label: 'PILLAR 3 — CUSTOM SCOPE',
    badge: 'Flat Project Rate',
    icon: IconFileText,
    title: 'Book & Journal Preparation',
    desc: 'Thesis-to-article structural conversion, publisher proposal packaging for Routledge, Oxford, SAGE, and Cambridge, and journal submission formatting to the exact target journal template.',
    features: [
      'Thesis-to-article structural conversion',
      'Publisher proposal & prospectus packaging',
      'Journal submission formatting & word count compliance',
      'Section-by-section advisory memo (add-on)',
    ],
    link: '/scholarcrafted/services/manuscript-preparation',
    cta: 'Explore Preparation Tracks',
  },
  indexing: {
    id: 'indexing',
    label: 'PILLAR 4 — PER TYPESET PAGE',
    badge: 'From $3 / page',
    icon: IconBook2,
    title: 'Book Indexing & Page Proofs',
    desc: 'Professional back-of-book subject and author indexing to press specification. First- and second-pass galley proof review, typesetting error correction, and publisher copyeditor query resolution.',
    features: [
      'Subject & author index (Cindex spec)',
      'Galley proof review — all typesetting error types',
      'Publisher copyeditor query responses',
      'Artwork & figure review (add-on)',
    ],
    link: '/scholarcrafted/services/indexing-proofs',
    cta: 'Enquire About Indexing',
  },
}

// ─── Need → Service Mapping ──────────────────────────────────────────────────

const needs = [
  {
    id: 'defense-coming',
    label: 'My defense is in weeks and my manuscript needs to be clean',
    subLabel: 'Time-sensitive polish before submission or deposit',
    serviceIds: ['editing', 'citations'],
    recommended: 'editing',
  },
  {
    id: 'committee-feedback',
    label: 'My committee sent the draft back with major revision comments',
    subLabel: 'Structural and developmental overhaul after committee review',
    serviceIds: ['editing', 'preparation'],
    recommended: 'editing',
  },
  {
    id: 'citations-mess',
    label: 'My citations are a mess — Zotero broke, references don\'t match',
    subLabel: 'Reference audit and reconstruction from scratch',
    serviceIds: ['citations'],
    recommended: 'citations',
  },
  {
    id: 'thesis-to-article',
    label: 'I want to turn my dissertation into a journal article',
    subLabel: 'Structural conversion and journal formatting',
    serviceIds: ['preparation', 'editing'],
    recommended: 'preparation',
  },
  {
    id: 'book-proposal',
    label: 'I\'m writing a book proposal for Oxford, Routledge, or a university press',
    subLabel: 'Proposal packaging to publisher template',
    serviceIds: ['preparation'],
    recommended: 'preparation',
  },
  {
    id: 'journal-format',
    label: 'I\'m submitting to a journal and need their exact format followed',
    subLabel: 'Target journal submission formatting',
    serviceIds: ['preparation', 'editing'],
    recommended: 'preparation',
  },
  {
    id: 'galley-proofs',
    label: 'My press sent galley proofs and I need an index built',
    subLabel: 'Back-of-book indexing and proof review',
    serviceIds: ['indexing'],
    recommended: 'indexing',
  },
]

// ─── Service Card Component ──────────────────────────────────────────────────

function ServiceCard({
  serviceId,
  isRecommended,
  active,
}: {
  serviceId: string
  isRecommended: boolean
  active: Record<string, string>
}) {
  const service = services[serviceId as keyof typeof services]
  if (!service) return null
  const Icon = service.icon

  return (
    <Box
      p={rem(28)}
      bg={active.background}
      style={{
        border: `1px solid ${isRecommended ? active.accent : active.primary + '18'}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {isRecommended && (
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
          <Text size="xs" fw={700} c={active.background} style={{ letterSpacing: '0.1em' }}>
            RECOMMENDED FOR YOU
          </Text>
        </Box>
      )}

      <Stack gap="md" flex={1}>
        <Group justify="space-between" align="center">
          <Box
            p={rem(10)}
            style={{
              border: `1px solid ${active.primary}20`,
              backgroundColor: active.surface,
            }}
          >
            <Icon size={22} color={active.primary} stroke={1.5} />
          </Box>
          <Badge variant="outline" color="dark" radius={0} size="sm">
            {service.badge}
          </Badge>
        </Group>

        <Stack gap={rem(4)}>
          <Text size="xs" fw={700} c={active.accent} style={{ letterSpacing: '0.08em' }}>
            {service.label}
          </Text>
          <Title order={3} style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}>
            {service.title}
          </Title>
        </Stack>

        <Text size="sm" c="dimmed" lh={1.65}>
          {service.desc}
        </Text>

        <Stack gap="xs">
          {service.features.map((feat, idx) => (
            <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
              <Text size="xs" c={active.accent} fw={700} mt={rem(1)}>
                —
              </Text>
              <Text size="xs" c="dimmed" lh={1.5}>
                {feat}
              </Text>
            </Group>
          ))}
        </Stack>

        <Box mt="auto" pt="lg">
          <Link href={service.link} style={{ textDecoration: 'none' }}>
            <Button
              variant="outline"
              color={active.primary}
              fullWidth
              radius={0}
              style={{ borderColor: isRecommended ? active.accent : active.primary }}
              rightSection={<IconArrowRight size={16} />}
            >
              {service.cta}
            </Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const theme = useMantineTheme()
  const active = theme.other
  const [selectedNeedId, setSelectedNeedId] = useState(needs[0].id)

  const selectedNeed = needs.find((n) => n.id === selectedNeedId) ?? needs[0]

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <Box component="section" pt={rem(140)} pb={rem(80)} bg={active.background}>
        <Container size={INNER_WIDTH}>
          <Box style={{ maxWidth: 820 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
            >
              Where Are You Right Now?
            </Text>
            <Title
              order={1}
              mt="md"
              style={{
                fontSize: rem(54),
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
              }}
            >
              Tell us where your manuscript is stuck. We handle what comes next.
            </Title>
            <Text size="lg" mt="xl" c="dimmed" lh={1.7} style={{ fontSize: rem(19) }}>
              ScholarCrafted provides the technical execution work between your completed draft
              and publication — editing, citation audits, journal formatting, book proposals,
              and press-ready indexing. No coaching. No scope creep. Defined deliverables,
              transparent pricing, faculty-level execution.
            </Text>
          </Box>
        </Container>
      </Box>

      {/* ── Select Your Need ────────────────────────────────────────── */}
      <Box
        component="section"
        className="academic-watermark"
        py={SECTION_SPACING}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(48)}>
            {/* Section header */}
            <Box style={{ maxWidth: 720 }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Find Your Starting Point
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: rem(38),
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.2,
                }}
              >
                Select the situation that matches where you are right now.
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
              className="need-selector-grid"
            >
              {/* Left: Need options */}
              <Box
                style={{
                  border: `1px solid ${active.primary}14`,
                  backgroundColor: active.background,
                }}
              >
                {needs.map((need, i) => {
                  const isActive = need.id === selectedNeedId
                  return (
                    <UnstyledButton
                      key={need.id}
                      onClick={() => setSelectedNeedId(need.id)}
                      style={{ width: '100%', display: 'block' }}
                    >
                      <Box
                        px={rem(28)}
                        py={rem(22)}
                        style={{
                          borderBottom:
                            i < needs.length - 1
                              ? `1px solid ${active.primary}10`
                              : undefined,
                          borderLeft: isActive
                            ? `3px solid ${active.accent}`
                            : `3px solid transparent`,
                          backgroundColor: isActive ? active.surface : 'transparent',
                          transition: 'background-color 0.15s ease, border-color 0.15s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <Group justify="space-between" align="center" wrap="nowrap" gap="md">
                          <Stack gap={rem(4)}>
                            <Text
                              fw={isActive ? 700 : 500}
                              size="sm"
                              lh={1.4}
                              style={{
                                color: isActive ? active.primary : active.primary + 'cc',
                              }}
                            >
                              {need.label}
                            </Text>
                            <Text size="xs" c="dimmed" lh={1.4}>
                              {need.subLabel}
                            </Text>
                          </Stack>
                          <IconChevronRight
                            size={16}
                            color={isActive ? active.accent : active.primary + '40'}
                            style={{ flexShrink: 0, transition: 'color 0.15s ease' }}
                          />
                        </Group>
                      </Box>
                    </UnstyledButton>
                  )
                })}
              </Box>

              {/* Right: Recommended service cards */}
              <Box>
                <Stack gap={rem(12)}>
                  {selectedNeed.serviceIds.map((sid) => (
                    <ServiceCard
                      key={sid}
                      serviceId={sid}
                      isRecommended={sid === selectedNeed.recommended}
                      active={active}
                    />
                  ))}

                  {/* Bottom CTA */}
                  <Box
                    p={rem(24)}
                    bg={active.background}
                    style={{ border: `1px solid ${active.primary}14` }}
                  >
                    <Group justify="space-between" align="center" wrap="nowrap">
                      <Stack gap={rem(4)}>
                        <Text fw={600} size="sm">
                          Not sure which tier or service fits?
                        </Text>
                        <Text size="xs" c="dimmed">
                          Submit your manuscript for a free scope assessment. We respond within 24 hours.
                        </Text>
                      </Stack>
                      <Link
                        href="/scholarcrafted/request-review"
                        style={{ textDecoration: 'none', flexShrink: 0 }}
                      >
                        <Button
                          variant="filled"
                          radius={0}
                          size="sm"
                          style={{ backgroundColor: active.primary, color: active.background }}
                          rightSection={<IconArrowRight size={14} />}
                        >
                          Get a Free Assessment
                        </Button>
                      </Link>
                    </Group>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* ── All Services Overview (for non-interactive browse) ───────── */}
      <Box
        component="section"
        py={SECTION_SPACING}
        bg={active.background}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <Stack gap={rem(48)}>
            <Box style={{ maxWidth: 640 }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                All Four Pillars
              </Text>
              <Title
                order={2}
                mt="xs"
                style={{
                  fontSize: rem(36),
                  color: active.primary,
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.25,
                }}
              >
                Browse all services by type.
              </Title>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={rem(2)}>
              {Object.values(services).map((service) => {
                const Icon = service.icon
                return (
                  <Box
                    key={service.id}
                    p={rem(32)}
                    bg={active.surface}
                    style={{
                      border: `1px solid ${active.primary}14`,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack gap="md" flex={1}>
                      <Group justify="space-between" align="center">
                        <Box
                          p={rem(10)}
                          style={{
                            border: `1px solid ${active.primary}20`,
                            backgroundColor: active.background,
                          }}
                        >
                          <Icon size={22} color={active.primary} stroke={1.5} />
                        </Box>
                        <Badge variant="outline" color="dark" radius={0} size="sm">
                          {service.badge}
                        </Badge>
                      </Group>

                      <Stack gap={rem(4)}>
                        <Text
                          size="xs"
                          fw={700}
                          c={active.accent}
                          style={{ letterSpacing: '0.08em' }}
                        >
                          {service.label}
                        </Text>
                        <Title
                          order={3}
                          style={{ fontSize: rem(20), fontFamily: 'var(--font-serif)' }}
                        >
                          {service.title}
                        </Title>
                      </Stack>

                      <Text size="sm" c="dimmed" lh={1.65}>
                        {service.desc}
                      </Text>

                      <Box mt="auto" pt="md">
                        <Link href={service.link} style={{ textDecoration: 'none' }}>
                          <Button
                            variant="outline"
                            color={active.primary}
                            fullWidth
                            radius={0}
                            style={{ borderColor: active.primary }}
                            rightSection={<IconArrowRight size={16} />}
                          >
                            {service.cta}
                          </Button>
                        </Link>
                      </Box>
                    </Stack>
                  </Box>
                )
              })}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ── Trust Bar ────────────────────────────────────────────────── */}
      <Box
        py={rem(60)}
        bg={active.surface}
        style={{ borderTop: `1px solid ${active.primary}12` }}
      >
        <Container size={INNER_WIDTH}>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <Group align="flex-start" gap="md">
              <IconShieldCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">
                  Zero Ghostwriting Guarantee
                </Text>
                <Text size="xs" c="dimmed">
                  We refine, format, and structure your own manuscript. Your intellectual
                  content is always yours.
                </Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconFileCheck size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">
                  Track-Changes Delivery
                </Text>
                <Text size="xs" c="dimmed">
                  Every edit delivered in tracked-changes mode. You approve or reject each
                  change. Nothing is silent.
                </Text>
              </Stack>
            </Group>
            <Group align="flex-start" gap="md">
              <IconBook2 size={28} color={active.accent} stroke={1.5} />
              <Stack gap={rem(4)}>
                <Text fw={700} size="sm">
                  Certified Academic Faculty
                </Text>
                <Text size="xs" c="dimmed">
                  Led by a College Board AP Research Reader. We understand what your press
                  and committee expect.
                </Text>
              </Stack>
            </Group>
          </SimpleGrid>
        </Container>
      </Box>

      <Footer bg={active.surface} />

      {/* Responsive override for need-selector on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .need-selector-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </Box>
  )
}
