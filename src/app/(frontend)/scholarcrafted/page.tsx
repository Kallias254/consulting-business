'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Box,
  SimpleGrid,
  Image,
  Divider,
  rem,
  useMantineTheme,
  ThemeIcon,
  Center,
  Accordion,
  UnstyledButton,
  Badge,
  Transition,
} from '@mantine/core'
import { Navbar } from './_components/Navbar'
import { Footer } from './_components/Footer'
import { EditorialCard } from './_components/EditorialPrimitives'
import Link from 'next/link'
import {
  IconArrowRight,
  IconUsers,
  IconEdit,
  IconFileText,
  IconMessageChatbot,
  IconRocket,
  IconCertificate,
  IconChevronUp,
  IconUserExclamation,
  IconScale,
  IconBooks,
  IconBrain,
  IconQuote,
  IconStarFilled,
  IconAlignJustified,
  IconMicroscope,
  IconBriefcase,
  IconChevronRight,
  IconCheck,
  IconHeadset,
  IconWorldWww,
  IconCreditCard,
  IconAdjustmentsAlt,
  IconBuildingStore,
  IconRefresh,
  IconShieldCheck,
  IconClock24,
  IconTarget,
  IconSparkles,
} from '@tabler/icons-react'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

import { SECTION_SPACING, INNER_WIDTH, READING_WIDTH } from '@/layout'

const testimonials = [
  {
    quote:
      'Orchestrating a 22-author handbook for Routledge was an administrative nightmare. The Principia team handled all contributor compliance formatting and typeset the entire volume seamlessly. They saved our publication timeline.',
    author: 'DR. M. ROBERTS, ASSOCIATE PROFESSOR',
    institution: 'DEPARTMENT OF SOCIOLOGY (HANDBOOK EDITOR)',
  },
  {
    quote:
      'When my NSF grant was approved, I realized my lab lacked the data infrastructure to execute the quantitative tracking. Their custom database scripting and SPSS pipeline kept our milestones perfectly on track.',
    author: 'DR. S. PATEL, LAB DIRECTOR',
    institution: 'BEHAVIORAL SCIENCES RESEARCH LAB',
  },
  {
    quote:
      'The Correspondence Buffer is a game-changer. When the journal sent back major revisions, the team drafted the entire reply matrix and locked it to our submission draft. I approved it in 60 seconds.',
    author: 'DR. E. HAYES, TENURE-TRACK ASSISTANT PROFESSOR',
    institution: 'DEPARTMENT OF PUBLIC POLICY',
  },
]

const homeFaqs = [
  {
    q: 'Should I have my paper edited even if I already used an AI tool like ChatGPT or Paperpal?',
    a: 'Yes, we strongly recommend it. AI tools catch surface spelling and generic syntax, but cannot verify domain-specific nomenclature, deep methodological nuance, or whether your narrative fulfills the exact review criteria of high-impact journals. More critically, committees and journal editors actively screen for synthetic phrasing; our senior doctoral editors ensure your manuscript is 100% human-verified, authoritative, and committee-defensible.',
  },
  {
    q: 'Is using ScholarCrafted allowed by my university, graduate committee, and target publisher?',
    a: 'Yes, completely. Professional developmental editing, structural proofreading, and citation auditing are standard, celebrated academic practices endorsed by graduate schools and publishers worldwide (including Routledge, Oxford, Elsevier, and Springer). We operate under a strict non-ghostwriting policy: we refine your clarity, rhetoric, style manual adherence, and structure, while you remain the sole intellectual author.',
  },
  {
    q: 'How does your pricing and milestone proposal work?',
    a: 'Unlike transactional proofreading platforms that charge by micro-word increments, ScholarCrafted provides single integrated milestone proposals with transparent fixed pricing tailored to your manuscript. Terms are structured into a 50% deposit upfront and 50% upon final delivery of your publication-ready files.',
  },
  {
    q: 'How does the project scoping process work?',
    a: 'You submit your manuscript details (word count, target journal or press, and current draft). Within 24 hours, Dr. Micah Dobson delivers a comprehensive, itemized milestone proposal outlining exact deliverables, schedule, and pricing. You can also schedule an optional 15-minute scoping call to discuss your timeline before initiating work.',
  },
  {
    q: 'What is your turnaround time, and can you accommodate urgent defense or submission deadlines?',
    a: 'Standard article conversions typically range between 5 and 10 business days depending on document scope and word count. For urgent committee deadlines or journal R&R windows, expedited scheduling is available upon request.',
  },
  {
    q: 'Do you offer re-editing support if my committee or reviewers request revisions?',
    a: 'Yes. All full project engagements include 365-day revision coverage. When your advisor, committee, or journal reviewer issues comments, you can submit your updated sections for secondary passes at zero extra charge.',
  },
  {
    q: 'Can institutional funds, departmental budgets, or research grants cover the fee?',
    a: 'Yes. Most universities allow startup funds, departmental overhead, NSF/grant allocations, or graduate student development allowances to pay for external editorial services. We provide formal institutional itemized invoices and W-9 documentation.',
  },
  {
    q: 'How do you safeguard manuscript confidentiality and intellectual property?',
    a: 'We sign strict Non-Disclosure & Confidentiality Agreements (NDAs) prior to document ingestion. Your raw data, unpublished findings, and draft files are kept in secure, encrypted environments and are never stored for AI model training or shared with third parties.',
  },
]

const universities = [
  { name: 'Yale', logo: '/logos/Yale_University_logo.svg' },
  { name: 'Stanford', logo: '/logos/stanford-university-logo-svgrepo-com.svg' },
  { name: 'Oxford', logo: '/logos/university-of-oxford-logo-1.svg' },
  { name: 'MIT', logo: '/logos/Massachusetts_Institute_of_Technology-Logo.wine.svg' },
  { name: 'Columbia', logo: '/logos/cu-header.svg' },
  { name: 'Duke', logo: '/logos/duke-wordmark-white.svg' },
  { name: 'Michigan', logo: '/logos/University_of_Michigan-Logo.wine.svg' },
  { name: 'Johns Hopkins', logo: '/logos/Johns_Hopkins_University-Logo.wine.svg' },
  { name: 'ANU', logo: '/logos/Australian_National_University-Logo.wine.svg' },
  { name: 'K-State', logo: '/logos/Kansas_State_University-Logo.wine.svg' },
]

// ─── Homepage Need & Situation Selectors ─────────────────────────────────────

const homeNeeds = [
  {
    id: 'thesis-to-article',
    label: 'I want to turn my dissertation into a journal article',
    subLabel: 'Article Conversion · Structural extraction & theoretical reframing',
    serviceIds: ['track_a'],
    recommended: 'track_a',
    targetTrack: 'Journal Article Pipeline',
  },
  {
    id: 'committee-feedback',
    label: 'My committee sent my draft back with major revision comments',
    subLabel: 'Committee Revision · Substantive restructuring & argument repair',
    serviceIds: ['track_a', 'track_b'],
    recommended: 'track_a',
    targetTrack: 'Developmental Revision',
  },
  {
    id: 'revise-resubmit',
    label: 'I received a Revise & Resubmit (R&R) and need help with the reply matrix',
    subLabel: 'R&R Strategy · Rebuttal matrix & diplomatic developmental overhaul',
    serviceIds: ['track_a'],
    recommended: 'track_a',
    targetTrack: 'R&R Response Protocol',
  },
  {
    id: 'rejected-resubmit',
    label: 'My paper was rejected and I need to target a different journal',
    subLabel: 'Journal Resubmission · Target scope matching & author compliance',
    serviceIds: ['track_a'],
    recommended: 'track_a',
    targetTrack: 'Journal Article Pipeline',
  },
  {
    id: 'book-proposal',
    label: "I'm writing a book proposal for Oxford, Routledge, or a major press",
    subLabel: 'University Press · Prospectus narrative & acquisition pitch',
    serviceIds: ['track_b'],
    recommended: 'track_b',
    targetTrack: 'Academic Book Pipeline',
  },
  {
    id: 'galley-proofs',
    label: 'My press sent galley proofs and I need an index or LaTeX fix',
    subLabel: 'Production & Press · Back-of-book indexing & galley proof review',
    serviceIds: ['track_b'],
    recommended: 'track_b',
    targetTrack: 'Academic Book Pipeline',
  },
  {
    id: 'citations-mess',
    label: 'I need to check citations, DOIs, and style compliance before submission',
    subLabel: 'Pre-Submission Audit · Reference cross-checks & style conformity',
    serviceIds: ['track_a'],
    recommended: 'track_a',
    targetTrack: 'Compliance & Verification',
  },
  {
    id: 'defense-coming',
    label: 'My defense is in weeks and my draft needs rapid structural triage',
    subLabel: 'Defense Polish · Priority developmental triage & deposit compliance',
    serviceIds: ['track_a', 'track_b'],
    recommended: 'track_a',
    targetTrack: 'Pre-Defense Polish',
  },
]

const homeServices: Record<string, {
  badge: string; title: string; desc: string; link: string; cta: string
}> = {
  track_a: {
    badge: 'JOURNAL ARTICLES & R&Rs',
    title: 'Journal Articles & R&R Strategy',
    desc: 'Move past editor desk-rejection and demanding peer-review cycles. We re-architect dissertation chapters into sharp Q1/Q2 arguments, build point-by-point R&R response matrices, and verify full journal compliance.',
    link: '/order?track=a',
    cta: 'Scope Your Submission',
  },
  track_b: {
    badge: 'BOOKS, PROPOSALS & HANDBOOKS',
    title: 'Books, Press Proposals & Edited Handbooks',
    desc: 'From rough concept or multi-author call to signed contract and press-ready volume. Acquisition proposals (Routledge, Cognella, Oxford), 15–25+ contributor coordination, indexing, and 5-stage production.',
    link: '/order?track=b',
    cta: 'Scope Your Book Project',
  },
}

// ─── SECTION: Two Core Outcome Tracks ──────────────────────────────────────

function TwoOutcomeTracksSection({ active }: { active: Record<string, string> }) {
  return (
    <Box
      id="outcome-tracks"
      component="section"
      py={SECTION_SPACING}
      bg={active.background}
    >
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(48)}>
          {/* Section Header — urgency-driven copy */}
          <Box style={{ maxWidth: 740 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              CHOOSE YOUR PUBLICATION PATH
            </Text>
            <Title
              order={2}
              mt="xs"
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Every stalled manuscript has an exit route. Pick yours.
            </Title>
            <Text size="md" mt="md" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              We don't sell generic proofreading. We build you an end-to-end publication engine — journal or book — with a doctoral specialist assigned to your discipline.
            </Text>
          </Box>

          {/* 2 Core Track Cards */}
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={rem(24)}>
            {/* Track A */}
            <EditorialCard
              p={{ base: rem(28), sm: rem(36), md: rem(40) }}
              bg={active.surface}
              featured
              style={{ height: '100%' }}
            >
              <Box style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <Box>
                  <Title
                    order={3}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: rem(24),
                      color: active.primary,
                      fontWeight: 700,
                      lineHeight: 1.25,
                    }}
                  >
                    Journal Articles &amp; R&amp;R Strategy
                  </Title>
                  <Text size="sm" c="dimmed" mt={rem(10)} lh={1.65}>
                    For faculty, postdocs, and doctoral researchers targeting Q1/Q2 journals. We reframe chapters into publishable interventions and build point-by-point Revise &amp; Resubmit response matrices.
                  </Text>

                  <Divider color={`${active.primary}10`} my={rem(20)} />

                  <Stack gap={rem(10)} mb={rem(24)}>
                    {[
                      'Contribution framing from dissertation chapter to sharp journal argument',
                      'Target journal scope matching & editorial board alignment',
                      'Desk-rejection proofing: house style, anonymization & DOI forensics',
                      'Point-by-point R&R Reviewer Response Matrices & editor cover memos',
                      '365-day secondary revision coverage for subsequent review rounds',
                    ].map((feat, idx) => (
                      <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
                        <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                        <Text size="xs" c={active.primary} lh={1.55}>
                          {feat}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Box>

                <Box mt="auto">
                  <Link href="/order?track=a" style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      size="md"
                      radius={0}
                      rightSection={<IconArrowRight size={16} />}
                      style={{
                        backgroundColor: active.accent,
                        color: '#ffffff',
                        fontWeight: 600,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                        height: rem(48),
                      }}
                    >
                      Scope Journal Submission
                    </Button>
                  </Link>
                </Box>
              </Box>
            </EditorialCard>

            {/* Track B */}
            <EditorialCard
              p={{ base: rem(28), sm: rem(36), md: rem(40) }}
              bg={active.surface}
              style={{ height: '100%' }}
            >
              <Box style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                <Box>
                  <Title
                    order={3}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: rem(24),
                      color: active.primary,
                      fontWeight: 700,
                      lineHeight: 1.25,
                    }}
                  >
                    Books, Press Proposals &amp; Edited Handbooks
                  </Title>
                  <Text size="sm" c="dimmed" mt={rem(10)} lh={1.65}>
                    For faculty authors and volume editors targeting Routledge, Cognella, Oxford, or Cambridge. Acquisition prospectuses, 15–25+ contributor coordination, indexing, and 5-stage production.
                  </Text>

                  <Divider color={`${active.primary}10`} my={rem(20)} />

                  <Stack gap={rem(10)} mb={rem(24)}>
                    {[
                      'Acquisition book proposals, competitor matrices & sample chapters',
                      'Multi-contributor handbook coordination (abstracts, style & deadlines)',
                      'Dissertation-to-monograph restructuring & cumulative chapter pacing',
                      '5-Stage Book Production from architecture through galley proofs',
                      'Press-grade back-of-book indexing (Cindex/SKY Index) & grant invoicing',
                    ].map((feat, idx) => (
                      <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
                        <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                        <Text size="xs" c={active.primary} lh={1.55}>
                          {feat}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Box>

                <Box mt="auto">
                  <Link href="/order?track=b" style={{ textDecoration: 'none' }}>
                    <Button
                      fullWidth
                      size="md"
                      radius={0}
                      variant="outline"
                      rightSection={<IconArrowRight size={16} />}
                      style={{
                        borderColor: active.primary,
                        color: active.primary,
                        fontWeight: 600,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                        height: rem(48),
                      }}
                    >
                      Scope Book or Handbook
                    </Button>
                  </Link>
                </Box>
              </Box>
            </EditorialCard>
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

// ─── SECTION: Consultative Scoping Callout ───────────────────────────────

function FacultyScopingBanner({ active }: { active: Record<string, string> }) {
  return (
    <Box
      id="project-scoping"
      component="section"
      py={{ base: rem(60), md: rem(80) }}
      bg={active.primary}
      style={{ position: 'relative', overflow: 'hidden' }}
      data-dark-bg="true"
    >
      {/* Subtle radial glow */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 80% 50%, ${active.accent}18, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Container size={1240} px={{ base: 'md', sm: 'xl' }} style={{ position: 'relative', zIndex: 1 }}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(32), md: rem(60) }} style={{ alignItems: 'center' }}>
          <Stack gap="lg">


            <Title
              order={2}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.3rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Clarity on scope, deliverables, and schedule—within 24 hours.
            </Title>

            <Text size="sm" style={{ color: 'rgba(255,255,255,0.78)' }} lh={1.7}>
              Share your manuscript draft, book prospectus, or contributor count. Our faculty-directed production team returns an itemized milestone roadmap tailored to your target press, journal, or grant deadline.
            </Text>

            <Stack gap={rem(8)}>
              {[
                'Itemized milestone roadmap with confirmed delivery dates',
                'Aligned with Routledge, Cognella, Oxford & Q1/Q2 specifications',
                '365-day revision coverage for committee, advisor & peer-review memos',
                'Institutional invoicing compatible with startup & grant budgets',
                'Optional 15-minute scoping consultation before kickoff',
              ].map((item, idx) => (
                <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
                  <IconCheck size={15} color={active.accent} style={{ flexShrink: 0, marginTop: rem(3) }} />
                  <Text size="xs" lh={1.5} style={{ color: 'rgba(255,255,255,0.85)' }}>
                    {item}
                  </Text>
                </Group>
              ))}
            </Stack>
          </Stack>

          {/* CTA Card — floating panel feel */}
          <Box
            p={{ base: rem(28), sm: rem(36) }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: rem(20),
            }}
          >
            <Box
              style={{
                width: rem(64),
                height: rem(64),
                borderRadius: '50%',
                backgroundColor: `${active.accent}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconClock24 size={28} color={active.accent} />
            </Box>
            <Text
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: rem(28),
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              Fixed Milestone Pricing
            </Text>
            <Text size="xs" lh={1.6} style={{ maxWidth: 300, color: 'rgba(255,255,255,0.65)' }}>
              Transparent fixed fees tailored to your project scope. No unpredictable per-word sliders.
            </Text>
            <Stack gap="xs" style={{ width: '100%' }}>
              <Link href="/order" style={{ textDecoration: 'none', width: '100%' }}>
                <Button
                  fullWidth
                  size="md"
                  radius={0}
                  rightSection={<IconArrowRight size={16} />}
                  style={{
                    backgroundColor: active.accent,
                    color: '#ffffff',
                    fontWeight: 700,
                    height: rem(48),
                    fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    letterSpacing: '0.04em',
                  }}
                >
                  Request Project Scope
                </Button>
              </Link>
              <a
                href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Button
                  fullWidth
                  size="md"
                  radius={0}
                  variant="outline"
                  style={{
                    borderColor: 'rgba(255,255,255,0.3)',
                    color: '#ffffff',
                    fontWeight: 600,
                    height: rem(44),
                  }}
                >
                  Book 15-Min Call
                </Button>
              </a>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

// ─── SECTION: 6-Step Publication Execution Flow ─────────────────────────

function PublicationExecutionFlowSection({ active }: { active: Record<string, string> }) {
  const steps = [
    {
      num: '01',
      title: 'Scoping & Diagnostic',
      desc: 'Identify core empirical contributions, evaluate theoretical hook, and isolate narrative bloat.',
    },
    {
      num: '02',
      title: 'Argument Extraction',
      desc: 'Condense sprawling 15k+ dissertation chapters into sharp, defensible 7k–9k journal logic.',
    },
    {
      num: '03',
      title: 'Substantive Edit',
      desc: 'Line-by-line academic prose polish, tone calibration, and 100% Word Track Changes.',
    },
    {
      num: '04',
      title: 'Journal & Press Fit',
      desc: 'Target journal Aims & Scope audit, author guidelines formatting, and custom cover letters.',
    },
    {
      num: '05',
      title: 'R&R Strategy',
      desc: 'Construct structured reviewer response matrices and align revisions to overcome objections.',
    },
    {
      num: '06',
      title: 'Layout & Indexing',
      desc: 'LaTeX/Typst typesetting, equation checking, and university press-grade back-of-book indexing.',
    },
  ]

  return (
    <Box
      id="execution-flow"
      component="section"
      py={SECTION_SPACING}
      bg={active.background}
    >
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(36)}>
          <Box style={{ maxWidth: 780 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
              }}
            >
              EXECUTION BLUEPRINT
            </Text>
            <Title
              order={2}
              mt="xs"
              style={{
                fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              The 6-step journey from draft to published manuscript.
            </Title>
            <Text size="md" mt="md" c="dimmed" lh={1.75} style={{ maxWidth: '64ch' }}>
              We do not treat scholarship as transactional proofreading. Every paper moves through a systematic architectural workflow overseen by doctoral specialists.
            </Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={rem(16)}>
            {steps.map((stg, i) => (
              <Box
                key={i}
                p={rem(20)}
                bg={active.surface}
                style={{
                  border: `1px solid ${active.primary}12`,
                  borderTop: `3px solid ${i === 0 ? active.accent : `${active.primary}20`}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: rem(8),
                  transition: 'transform 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderTopColor = active.accent; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderTopColor = i === 0 ? active.accent : `${active.primary}20`; }}
              >
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{ letterSpacing: '0.12em', fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                >
                  {stg.num}
                </Text>
                <Text
                  fw={700}
                  size="sm"
                  c={active.primary}
                  style={{ lineHeight: 1.3, minHeight: rem(36) }}
                >
                  {stg.title}
                </Text>
                <Text size="xs" c="dimmed" lh={1.55} style={{ flex: 1 }}>
                  {stg.desc}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

// ─── SECTION: Academic Trust Bar ────────────────────────────

function AcademicTrustBar({ active }: { active: Record<string, string> }) {
  return (
    <Box
      py={rem(36)}
      bg={active.primary}
      style={{ color: '#ffffff', borderTop: `1px solid ${active.primary}20` }}
      data-dark-bg="true"
    >
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={{ base: 'lg', md: 'xl' }}>
          {[
            { val: '500+', label: 'Scholars & PhDs Guided' },
            { val: '100%', label: 'Human Doctoral Review' },
            { val: '24h', label: 'Milestone Proposal Turnaround' },
            { val: 'Top Presses', label: 'Oxford · Cambridge · Routledge' },
          ].map((stat, i) => (
            <Box
              key={i}
              className={`trust-bar-item trust-bar-item-${i}`}
              style={{
                borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.14)` : undefined,
                paddingLeft: i > 0 ? rem(24) : 0,
              }}
            >
              <Text
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  fontWeight: 700,
                  color: '#ffffff !important',
                  lineHeight: 1.1,
                }}
              >
                {stat.val}
              </Text>
              <Text
                size="xs"
                fw={700}
                mt={rem(6)}
                style={{
                  fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                  letterSpacing: '0.04em',
                  color: '#ffffff !important',
                }}
              >
                {stat.label}
              </Text>

            </Box>
          ))}
        </SimpleGrid>
        <style>{`
          @media (max-width: 768px) {
            .trust-bar-item-2 {
              border-left: none !important;
              padding-left: 0 !important;
            }
          }
        `}</style>
      </Container>
    </Box>
  )
}

// ─── SECTION: Find Your Starting Point (By Situation) ──────────────────────

function ManuscriptSituationSection({ active }: { active: Record<string, string> }) {
  const [selectedId, setSelectedId] = useState(homeNeeds[0].id)
  const [isAutoCyclingNeeds, setIsAutoCyclingNeeds] = useState(true)
  const [animateKey, setAnimateKey] = useState(0)
  const selectedNeed = homeNeeds.find((n) => n.id === selectedId) ?? homeNeeds[0]

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id)
    setAnimateKey(prev => prev + 1)
    setIsAutoCyclingNeeds(false)
  }, [])

  useEffect(() => {
    if (!isAutoCyclingNeeds) return
    const timer = setInterval(() => {
      setSelectedId((prevId) => {
        const currentIndex = homeNeeds.findIndex((n) => n.id === prevId)
        const nextIndex = (currentIndex + 1) % homeNeeds.length
        return homeNeeds[nextIndex].id
      })
      setAnimateKey(prev => prev + 1)
    }, 4500)
    return () => clearInterval(timer)
  }, [isAutoCyclingNeeds])

  return (
    <Box
      id="starting-point"
      component="section"
      py={SECTION_SPACING}
      bg={active.surface}
      style={{
        borderTop: `1px solid ${active.primary}12`,
        borderBottom: `1px solid ${active.primary}12`,
      }}
    >
      <Container size={1340} px={{ base: 'md', sm: 'xl' }}>
        <Stack gap={rem(48)}>
          {/* Section Header */}
          <Box style={{ maxWidth: 840 }}>
            <Text
              size="xs"
              fw={700}
              c={active.accent}
              style={{
                letterSpacing: '0.18em',
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
                fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
                color: active.primary,
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Where is your manuscript right now?
            </Title>
            <Text size="md" mt="md" c="dimmed" lh={1.75} style={{ maxWidth: '68ch' }}>
              Select the situation that matches where your draft stands right now. We will map you directly to the exact editorial or compliance protocol you need.
            </Text>
          </Box>

          {/* Interactive Situations — MOBILE: cards immediately below, DESKTOP: side by side */}
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: '1.05fr 1.15fr',
              gap: rem(28),
              alignItems: 'start',
            }}
            className="home-need-grid"
          >
            {/* Left Column: Situations List */}
            <Box style={{ border: `1px solid ${active.primary}14`, backgroundColor: active.background }}>
              {homeNeeds.map((need, i) => {
                const isActive = need.id === selectedId
                return (
                  <UnstyledButton
                    key={need.id}
                    onClick={() => handleSelect(need.id)}
                    style={{ width: '100%', display: 'block' }}
                  >
                    <Box
                      px={{ base: rem(16), md: rem(24) }}
                      py={{ base: rem(14), md: rem(18) }}
                      style={{
                        borderBottom: i < homeNeeds.length - 1 ? `1px solid ${active.primary}10` : undefined,
                        backgroundColor: isActive ? active.surface : 'transparent',
                        borderLeft: isActive ? `3px solid ${active.accent}` : '3px solid transparent',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <Group justify="space-between" align="center" wrap="nowrap" gap="sm">
                        <Stack gap={rem(2)}>
                          <Text
                            fw={isActive ? 700 : 500}
                            size="sm"
                            lh={1.4}
                            style={{
                              color: isActive ? active.primary : `${active.primary}cc`,
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            }}
                          >
                            {need.label}
                          </Text>
                          <Text size="xs" c="dimmed" lh={1.4}>{need.subLabel}</Text>
                        </Stack>
                        <IconChevronRight
                          size={16}
                          color={isActive ? active.accent : `${active.primary}40`}
                          style={{ flexShrink: 0, transition: 'color 0.15s ease, transform 0.15s ease', transform: isActive ? 'translateX(2px)' : 'none' }}
                        />
                      </Group>
                    </Box>
                  </UnstyledButton>
                )
              })}
            </Box>

            {/* Right Column: Matched Service Cards — with animation */}
            <Box
              key={animateKey}
              style={{
                animation: 'fadeSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <Stack gap={rem(18)}>
                {selectedNeed.serviceIds.map((sid) => {
                  const svc = homeServices[sid]
                  if (!svc) return null
                  const isRecommended = sid === selectedNeed.recommended
                  return (
                    <Box
                      key={sid}
                      p={{ base: rem(24), md: rem(32) }}
                      bg={active.background}
                      style={{
                        border: `1px solid ${isRecommended ? active.accent : `${active.primary}18`}`,
                        boxShadow: isRecommended ? `0 8px 32px ${active.accent}14` : 'none',
                      }}
                    >
                      <Stack gap="md">

                        <Group justify="space-between" align="flex-start">
                          <Title
                            order={3}
                            style={{
                              fontSize: 'clamp(1.25rem, 2vw, 1.45rem)',
                              fontFamily: 'var(--font-serif)',
                              fontWeight: 700,
                              color: active.primary,
                              flex: 1,
                            }}
                          >
                            {svc.title}
                          </Title>
                          <Text
                            size="xs"
                            fw={700}
                            c={active.accent}
                            style={{
                              border: `1px solid ${active.accent}`,
                              padding: `${rem(3)} ${rem(8)}`,
                              whiteSpace: 'nowrap',
                              flexShrink: 0,
                              marginLeft: rem(12),
                              fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                            }}
                          >
                            {svc.badge}
                          </Text>
                        </Group>
                        <Text size="sm" c="dimmed" lh={1.7}>{svc.desc}</Text>
                        <Box mt={rem(8)}>
                          <Link href={svc.link} style={{ textDecoration: 'none', display: 'inline-block' }}>
                            <Button
                              variant="filled"
                              radius={0}
                              size="sm"
                              style={{
                                backgroundColor: isRecommended ? active.accent : active.primary,
                                color: '#ffffff',
                                fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                                fontWeight: 700,
                                letterSpacing: '0.04em',
                                height: rem(42),
                                paddingLeft: rem(20),
                                paddingRight: rem(20),
                              }}
                              rightSection={<IconArrowRight size={16} />}
                            >
                              {svc.cta}
                            </Button>
                          </Link>
                        </Box>
                      </Stack>
                    </Box>
                  )
                })}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>

      {/* Mobile: stack columns + card animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 820px) {
          .home-need-grid {
            grid-template-columns: 1fr !important;
            gap: ${rem(16)} !important;
          }
        }
      `}</style>
    </Box>
  )
}

export default function ScholarCraftedLanding() {
  const theme = useMantineTheme()
  const active = theme.other
  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Box bg={active.background} style={{ minHeight: '100vh', color: active.primary }}>
      <Navbar />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .home-accordion-item[data-active] {
              border-color: ${active.primary} !important;
            }

            .home-accordion-control:hover {
              background-color: transparent !important;
            }

            /* Hero overlays: mobile = flat dark, desktop = directional */
            .hero-overlay-mobile { display: block; }
            .hero-overlay-desktop { display: none; }

            /* Hero buttons: side-by-side */
            .hero-btn-group { display: flex; flex-wrap: wrap; gap: ${rem(12)}; }
            .hero-btn-link { display: inline-block; }
            .hero-btn-link > button { width: auto !important; }

            /* Back-to-top: smaller on mobile */
            .back-to-top-btn {
              bottom: 20px !important;
              right: 20px !important;
              width: 42px !important;
              height: 42px !important;
            }

            @media (max-width: 480px) {
              .hero-btn-link { display: block; width: 100%; }
              .hero-btn-link > button { width: 100% !important; }
            }

            @media (min-width: 640px) {
              /* Desktop: directional gradient */
              .hero-overlay-mobile { display: none; }
              .hero-overlay-desktop { display: block; }

              .back-to-top-btn {
                bottom: 40px !important;
                right: 40px !important;
                width: 50px !important;
                height: 50px !important;
              }
            }
          `,
        }}
      />

      {/* ═════════════════════════════════════════════════════════════════
          HERO — Cinematic left-anchored editorial layout
       ═════════════════════════════════════════════════════════════════ */}
      <Box
        component="section"
        style={{
          position: 'relative',
          minHeight: 'clamp(480px, 85vh, 800px)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            zIndex: 0,
          }}
        />
        {/* Overlays */}
        <Box style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.88)', zIndex: 1 }} className="hero-overlay-mobile" />
        <Box style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.92) 45%, rgba(10,10,10,0.70) 75%, rgba(10,10,10,0.30) 100%)', zIndex: 2 }} className="hero-overlay-desktop" />
        <Box style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: rem(100), background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)', zIndex: 1 }} />

        {/* Content */}
        <Box style={{ position: 'relative', zIndex: 3, width: '100%', paddingTop: 'clamp(88px, 14vw, 140px)', paddingBottom: 'clamp(48px, 8vw, 100px)' }}>
          <Container size={1200} px={{ base: 'md', sm: 'xl' }}>
            <Box style={{ maxWidth: rem(620) }}>
              <Stack gap="lg" align="flex-start">



                <Title
                  order={1}
                  style={{
                    fontSize: 'clamp(2.2rem, 4.8vw, 3rem)',
                    lineHeight: 1.08,
                    letterSpacing: '-0.025em',
                    color: '#ffffff',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                  }}
                >
                  Your research<br />deserves to be published.<br />We make it happen.
                </Title>

                <p style={{ margin: 0, fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', maxWidth: '56ch' }}>
                  Substantive manuscript architecture, thesis-to-journal conversion, and publisher compliance — delivered with 100% Track Changes by doctoral specialists in your discipline.
                </p>

                {/* Buttons — side-by-side with shorter labels */}
                <Group gap={rem(12)} className="hero-btn-group">
                  <Link href="/order" style={{ textDecoration: 'none' }} className="hero-btn-link">
                    <Button
                      size="lg"
                      radius={0}
                      rightSection={<IconArrowRight size={18} />}
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        height: rem(50),
                        paddingLeft: rem(24),
                        paddingRight: rem(24),
                        border: 'none',
                        fontWeight: 700,
                        fontSize: rem(14),
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Get a Scope
                    </Button>
                  </Link>
                  <a
                    href="https://calendly.com/misedajoseph-30-minutes-call/discovery-session"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                    className="hero-btn-link"
                  >
                    <Button
                      size="lg"
                      radius={0}
                      style={{
                        borderColor: 'rgba(255,255,255,0.4)',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        color: '#ffffff',
                        background: 'rgba(255,255,255,0.08)',
                        height: rem(50),
                        paddingLeft: rem(24),
                        paddingRight: rem(24),
                        fontSize: rem(14),
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                      }}
                    >
                      Book a Call
                    </Button>
                  </a>
                </Group>

              </Stack>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ── Proof Metrics Bar ── */}
      <AcademicTrustBar active={active} />

      {/* ── Interactive Section: Find Your Starting Point ── */}
      <ManuscriptSituationSection active={active} />

      {/* ── Two Core Outcome Tracks ── */}
      <TwoOutcomeTracksSection active={active} />

      {/* ── Consultative Scoping Banner ── */}
      <FacultyScopingBanner active={active} />

      {/* ── The 6-Step Publication Execution Flow ── */}
      <PublicationExecutionFlowSection active={active} />

      {/* Testimonials Carousel */}
      <Box component="section" py={{ base: rem(60), md: rem(100) }} bg={active.background}>
        <Container size={1240} px={{ base: "md", sm: "xl" }}>
          <Carousel
            withIndicators
            emblaOptions={{ loop: true }}
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            styles={{
              root: { paddingBottom: rem(60) },
              indicators: { bottom: rem(-20) }
            }}
            classNames={{
              indicator: 'carousel-indicator' }}
          >
            {testimonials.map((item, index) => (
              <Carousel.Slide key={index}>
                <Container size={960}>
                  <Stack align="center" style={{ textAlign: 'center' }} gap={rem(40)}>
                    <Text
                      style={{
                        fontSize: 'clamp(60px, 12vw, 100px)',
                        lineHeight: 0,
                        opacity: 0.1,
                        marginBottom: 'clamp(-24px, -4vw, -40px)',
                        color: active.primary }}
                    >
                      &ldquo;
                    </Text>
                    <Text
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 2.1rem)",
                        fontStyle: "italic",
                        lineHeight: 1.45,
                        letterSpacing: '-0.01em',
                        color: active.primary }}
                    >
                      {item.quote}
                    </Text>
                    <Stack gap="xs" align="center">
                     <Group gap={rem(4)}>
                       {[...Array(5)].map((_, i) => (
                         <IconStarFilled key={i} size={14} color="#FFD700" style={{ opacity: 0.85 }} />
                       ))}
                     </Group>
                     <Stack gap={4}>
                       <Text
                         size="xs"
                         c={active.primary}
                       >
                         {item.author}
                       </Text>
                       <Text size="xs" c="dimmed" style={{ letterSpacing: '0.05em' }}>
                         {item.institution}
                       </Text>
                     </Stack>
                    </Stack>                  </Stack>
                </Container>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Box>

      {/* University Logo Marquee */}
      <Box component="section" className="dark-scholar-section" py={rem(48)} bg={active.primary}>
        
        {/* Full-width marquee outside container */}
        <Box style={{ width: '100%', overflow: 'hidden' }}>
          <div className="marquee-container">
            <div className="marquee-content">
              {universities.map((uni, idx) => (
                <img
                  key={`uni-1-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  className="university-logo-img"
                />
              ))}
              {/* Repeat for seamless loop */}
              {universities.map((uni, idx) => (
                <img
                  key={`uni-2-${idx}`}
                  src={uni.logo}
                  alt={uni.name}
                  className="university-logo-img"
                />
              ))}
            </div>
          </div>
        </Box>
      </Box>

      {/* Specialist Team on the Painful Parts */}
      <Box component="section" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.background}>
        <Container size={1240} px={{ base: 'md', sm: 'xl' }}>
          <Stack gap="xl">
            
            {/* Header + Intro */}
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: rem(24), md: rem(60) }} style={{ alignItems: 'flex-start' }}>
              <Stack gap="sm">

                <Title
                  order={2}
                  style={{
                    fontSize: 'clamp(1.85rem, 3.8vw, 2.6rem)',
                    color: active.primary,
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                  }}
                >
                  A specialist team, on the painful parts.
                </Title>
              </Stack>

              <Stack gap="md">
                <Text size="md" c="dimmed" lh={1.75}>
                  Your focus belongs on the scholarship. We handle the structural architecture, multi-author coordination, citation forensics, and publisher compliance with precision.
                </Text>

                <Link href="/order" style={{ textDecoration: 'none' }}>
                    <Button
                      size="md"
                      radius={0}
                      className="impeccable-button"
                      rightSection={<IconArrowRight size={16} />}
                      style={{
                        backgroundColor: active.accent,
                        color: '#fff',
                        border: 'none',
                        fontWeight: 600,
                        fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                      }}
                    >
                      Get a Scope
                    </Button>
                  </Link>
              </Stack>
            </SimpleGrid>

            {/* Specialist Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={rem(16)}>
              {[
                {
                  name: 'Dr. Elena Rostova',
                  degree: 'PhD · Oxford',
                  role: 'Lead Manuscript & Developmental Editor',
                },
                {
                  name: 'Dr. Marcus Vance',
                  degree: 'EdD · Vanderbilt',
                  role: 'Style Guides & Publisher Compliance (APA/Chicago)',
                },
                {
                  name: 'Sarah Lin',
                  degree: 'MPhil · Cambridge',
                  role: 'Reference Archiving, CrossRef & BibTeX',
                },
                {
                  name: 'Dr. Tariq Al-Mansoor',
                  degree: 'PhD · Michigan',
                  role: 'Quantitative & Logic Structure Validation',
                },
              ].map((member, i) => (
                <Box
                  key={i}
                  p={{ base: rem(20), sm: rem(24) }}
                  bg={active.surface}
                  style={{
                    borderTop: `3px solid ${i === 0 ? active.accent : `${active.primary}18`}`,
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = `0 10px 24px ${active.accent}14`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <Stack gap="xs">
                    <p style={{
                      margin: 0,
                      fontSize: rem(16),
                      fontWeight: 700,
                      color: active.primary,
                      lineHeight: 1.2,
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}>
                      {member.name}
                    </p>
                    <p style={{
                      margin: 0,
                      fontSize: rem(11),
                      fontWeight: 700,
                      color: active.accent,
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-heading-sans), var(--font-sans)',
                    }}>
                      {member.degree}
                    </p>
                    <p style={{ margin: 0, fontSize: rem(13), color: '#666', lineHeight: 1.5, marginTop: rem(4) }}>
                      {member.role}
                    </p>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>

            {/* Testimonial Quote Card */}
            <Box
              p={{ base: rem(24), md: rem(32) }}
              style={{
                backgroundColor: active.surface,
                borderLeft: `3px solid ${active.accent}`,
              }}
            >
              <Text size="md" fs="italic" c={active.primary} lh={1.7}>
                &ldquo;Working with the ScholarCrafted specialist team was the single best decision I made for my book volume. They caught structural citation anomalies three reviewers missed, and delivered a flawless volume ahead of deadline.&rdquo;
              </Text>
              <Group gap="xs" mt="sm">
                <Text
                  size="xs"
                  fw={700}
                  c={active.accent}
                  style={{ fontFamily: 'var(--font-heading-sans), var(--font-sans)' }}
                >
                  Dr. Claire Robinson
                </Text>
                <Text size="xs" c="dimmed">
                  &bull; Associate Professor &middot; United Kingdom
                </Text>
              </Group>
            </Box>

          </Stack>
        </Container>
      </Box>



      {/* Frequently Asked Questions */}
      <Box component="section" className="academic-watermark" py={{ base: rem(60), md: SECTION_SPACING }} bg={active.surface}>
        <Container size={850} px={{ base: "md", sm: "xl" }}>
          <Stack gap="xl">
            <Box style={{ textAlign: 'center' }}>
              <Text
                size="xs"
                fw={700}
                c={active.accent}
                style={{ letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                Frequently Asked Questions
              </Text>
              <Title order={2} mt="xs" style={{ fontSize: "clamp(1.85rem, 3.5vw, 2.6rem)", color: active.primary, fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Questions Scholars Actually Ask
              </Title>
              <Text size="md" c="dimmed" mt="md" lh={1.7} style={{ maxWidth: 640, margin: '0 auto' }}>
                Transparent answers on editorial integrity, AI screening, committee compliance, and turnaround timelines.
              </Text>
            </Box>

            <Accordion>
              {homeFaqs.map((faq, i) => (
                <Accordion.Item key={i} value={`faq-${i}`}>
                  <Accordion.Control>
                    {faq.q}
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Text size="md" lh={1.7} c="dimmed">
                      {faq.a}
                    </Text>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
        </Container>
      </Box>

      <Footer />

      <Box
        onClick={scrollToTop}
        className="back-to-top-btn"
        style={{
          position: 'fixed',
          bottom: rem(40),
          right: rem(40),
          width: rem(50),
          height: rem(50),
          borderRadius: '50%',
          backgroundColor: active.surface,
          border: `1px solid ${active.primary}33`,
          color: active.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          opacity: showBackToTop ? 1 : 0,
          pointerEvents: showBackToTop ? 'all' : 'none',
          transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.1)'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <IconChevronUp size={24} stroke={1.5} />
      </Box>

      <style>{`
        /* Carousel dot indicators — always circular, no oval stretching */
        button.carousel-indicator {
          width: 7px !important;
          height: 7px !important;
          border-radius: 50% !important;
          background-color: rgba(0,0,0,0.15) !important;
          transform: none !important;
          transition: background-color 300ms ease, width 300ms ease, height 300ms ease !important;
        }
        button.carousel-indicator[data-active="true"] {
          width: 10px !important;
          height: 10px !important;
          background-color: ${active.accent} !important;
        }
      `}</style>
    </Box>
  )
}
